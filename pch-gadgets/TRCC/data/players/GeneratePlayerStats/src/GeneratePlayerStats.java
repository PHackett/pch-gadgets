import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 * This & it's associated files are for the generation of the lifetime player 
 * statistics. There is quite a bit here, but hopefully the object names will
 * be self-explanatory for those who choose to maintain this code!
 * 
 * The process is a follows:
 * 		Input is the year e.g. 2011
 * 		Determine all the teams active in that year by reading http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/data/fixtures/fixtureYearsDB.xml
 * 		Load the list of the games for each team. For example from http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/data/fixtures/2011/Saturday_Fixtures_Data.xml
 * 		Load each of games for the entire year into objects
 * 		Traverse all the MatchReport objects to generate the statistics for the individual players
 * 		For each player for which we have statistics load the existing player stats for that person. For example from http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/data/players/hackett_paul.xml
 * 		Add the newly generated statistics to the all-time player stats
 * 		Write out the new stats to a fresh XML file
 * 
 */

/**
 * @author paul
 *
 */
public class GeneratePlayerStats 
{
	public static final String	sRootURL = "http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/data/";

	private static int 			sYear = 2010;
	
	/**
	 * @param args
	 */
	public static void main(String[] args) 
	{
		ArrayList<String>	lRetA;
		ArrayList<MatchReport> lMRA;

		{
			PlayerLifetimeStats lPLS = PlayerLifetimeStats.Get("Paul Hackett");
			
			lPLS.LoadFromURL();
			
			System.out.println ("TEST: This is the XML ...");
			System.out.println (lPLS.toXML());
		}
		
		if (0 == (lRetA = ReadFixtureYearData(sYear)).size())
		{
			System.out.println ("ERROR: Discovered no teams for year " + sYear);
		}
		else if (0 == (lRetA = ReadAllFixtureURLs (sYear, lRetA.toArray())).size())
		{
			System.out.println ("ERROR: Discovered no fixtures for year " + sYear);
		}
		else if (0 == (lMRA = LoadAllMatches (lRetA, sYear)).size())
		{
			System.out.println ("ERROR: Failed to load any fixtures for year " + sYear);
		}
		else if (!LogMatchesLoadedname (lMRA))
		{
			System.out.println ("FATAL: Should not get here!");
		}
		else if (!ProcessAllMatchData(lMRA))
		{
			System.out.println ("ERROR: Failed processing match data for year " + sYear);
		}
		else if (!LogPlayersProcessed ())
		{
			System.out.println ("ERROR: Failed logging number of players processed");
		}
		else if (!LoadOnlinePlayerLifetimeData())
		{
			System.out.println ("ERROR: Failed logging number of players processed");			
		}
		
		System.out.println ("INFO: Processing complete");
	}
	
	private static boolean ProcessAllMatchData (ArrayList<MatchReport> aMDA)
	{
		boolean lRet=true;
		
		for (int i=0 ; i<aMDA.size() ; ++i)
		{
			if (!ProcessOneMatchData (aMDA.get(i)))
			{
				lRet = false;
				break;
			}
		}
		
		return (lRet);
	}
	
	
	private static boolean ProcessOneMatchData (MatchReport aMD)
	{
		boolean							lRet = true;
		ArrayList<BatterGameSummary>	lBatGS=aMD.TrccBatterGameSummary();	
		ArrayList<BowlerGameSummary>	lBowlGS=aMD.TrccBowlerGameSummary();	

		// System.out.println ("DEBUG: Processing match data for " + aMD.MatchID().toXML());
		
		if (null == lBatGS)
		{
			System.out.println ("DEBUG:   No TRCC batting data for " + aMD.MatchID().toXML());
		}
		else if (!ProcessTrccGameBatting (aMD.MatchID(), lBatGS))
		{
			System.out.println ("ERROR: Failed loading batting data for " + aMD.MatchID().toXML());
			lRet = false;
		}

		if (null == lBowlGS)
		{
			System.out.println ("DEBUG:   No TRCC bowling data for " + aMD.MatchID().toXML());
		}
		else if (!ProcessTrccGameBowling (aMD.MatchID(), lBowlGS))
		{
			System.out.println ("ERROR: Failed loading bowling data for " + aMD.MatchID().toXML());
			lRet = false;
		}

		return (lRet);
	}

	private static boolean ProcessTrccGameBatting (MatchID aMID, ArrayList<BatterGameSummary> aBGS)
	{
		boolean lRet=true;
		
		for (int i=0 ; i<aBGS.size() ; ++i)
		{
			if (!ProcessTrccBatterSummary (aMID, aBGS.get(i)))
			{
				lRet = false;
			}
		}
		
		return (lRet);
	}

	
	private static boolean ProcessTrccBatterSummary (MatchID aMID, BatterGameSummary aBGS)
	{
		boolean 	lRet=false;
		PlayerYearStats lPS=PlayerYearStats.GetPlayerStats (aBGS.GetName(), sYear);

		lRet = lPS.AddBattingSummary (aMID, aBGS);
				
		return (lRet);
	}
	
	
	private static boolean ProcessTrccGameBowling (MatchID aMID, ArrayList<BowlerGameSummary> aBGS)
	{
		boolean lRet=true;
		
		for (int i=0 ; i<aBGS.size() ; ++i)
		{
			if (!ProcessTrccBowlerSummary (aMID, aBGS.get(i)))
			{
				lRet = false;
			}
		}
		
		return (lRet);
	}

	
	private static boolean ProcessTrccBowlerSummary (MatchID aMID, BowlerGameSummary aBGS)
	{
		boolean 	lRet=false;
		PlayerYearStats lPS=PlayerYearStats.GetPlayerStats (aBGS.GetName(), sYear);

		lRet = lPS.AddBowlingSummary (aMID, aBGS);
				
		return (lRet);
	}
	
	
	/**
	 * Load all the player lifetime statistics for the players we have found
	 * @return
	 */
	private static boolean LoadOnlinePlayerLifetimeData ()
	{
		boolean lRet = true;
		
		for (PlayerYearStats lPS : PlayerYearStats.GetStats().values())
		{
			PlayerLifetimeStats lPLS = PlayerLifetimeStats.Get(lPS.Name());
			
			if (!lPLS.LoadFromURL())
			{
				System.out.println ("ERROR: Failed to load PlayerLifetimeStats for player = '" + lPS.Name() + "'");									
			}
		}
		
		return (lRet);
	}
	

	private static ArrayList<MatchReport> LoadAllMatches (ArrayList<String>	aMatchFilesA, int aYear)
	{
		ArrayList<MatchReport>	lRetA = new ArrayList<MatchReport> ();
		
		for (int i=0 ; i<aMatchFilesA.size() ; ++i)
		{
			String		lURL = "fixtures/" + aYear + "/" + aMatchFilesA.get(i);

			System.out.println ("DEBUG: Attempt to load fixture from " + aMatchFilesA.get(i));					

			try
			{
				Document	lDoc = LoadXMLFromURL (lURL);
				
				MatchReport lMR = new MatchReport();
				
				if (!lMR.LoadFromXML (lDoc))
				{
					System.out.println ("ERROR: Failed to load fixture from " + lURL);					
				}
				else if (lMR.NotForStats())
				{
					System.out.println ("INFO: Fixture " + lURL + " does not count towards stats");
				}
				else
				{
					lRetA.add(lMR);
				}
			} 
			catch (ParserConfigurationException e)
			{
				e.printStackTrace();
			} 
			catch (SAXException e)
			{
				e.printStackTrace();
			} 
			catch (IOException e)
			{
				e.printStackTrace();
			}
		}
		
		// System.out.println ("INFO: Loaded data for " + lRetA.size() + " matches");
		
		return (lRetA);
	}
	
	
	private static ArrayList<String> ReadFixtureYearData (int aYear)
	{
		ArrayList<String>	lRetA = new ArrayList<String> ();
		
		try
		{
			Document 	lDoc = LoadXMLFromURL ("fixtures/fixtureYearsDB.xml");
			
            NodeList	lYearList	= lDoc.getElementsByTagName("TeamsInYear");
            int 	 	lTotal		= lYearList.getLength();
            System.out.println("Total no of years : " + lTotal);
            
            for (int lIn=0 ; lIn<lTotal ; ++lIn)
            {
            	Node lNode = lYearList.item(lIn);
            	
            	if( lNode.getNodeType() == Node.ELEMENT_NODE)
            	{
            		Element lElement = (Element)lNode;
            		int		lYear = Integer.parseInt(lElement.getAttribute("year"));
            		
            		if (lYear == aYear)
            		{
            			System.out.println("Found year " + lYear);
            			
                        NodeList	lTeamList	= lElement.getElementsByTagName("Team");
                        
                        for (int lT=0 ; lT<lTeamList.getLength() ; ++lT)
                        {
                        	Node lTeamNode = lTeamList.item(lT);
                        	
                        	if( lTeamNode.getNodeType() == Node.ELEMENT_NODE)
                        	{
                        		Element lTeamElement = (Element)lTeamNode;
                        		
                        		System.out.println ("  team = " + lTeamElement.getChildNodes().item(0).getNodeValue().trim());
                        		
                        		lRetA.add(lTeamElement.getChildNodes().item(0).getNodeValue().trim());
                        	}
                        }
            			
                        break;
            		}
            	}
            }
            
            System.out.println ("Found a total of " + lRetA.size() + " teamms in the year " + aYear);
		} 
		catch (MalformedURLException e)
		{
			e.printStackTrace();
		} 
		catch (ParserConfigurationException e)
		{
			e.printStackTrace();
		} 
		catch (IOException e)
		{
			e.printStackTrace();
		} 
		catch (SAXException e)
		{
			e.printStackTrace();
		}
		
		return (lRetA);
	}

	private static ArrayList<String> ReadAllFixtureURLs (int aYear, Object[] objects)
	{
		ArrayList<String>	lRetA = new ArrayList<String> ();

		for (int i=0 ; i<objects.length ; ++i)
		{
			String lX = (String)objects[i];
			lRetA.addAll(ReadTeamYearFixtures (aYear, lX));
		}
		
		System.out.println ("INFO: Discovered " + lRetA.size() + " fixtures with match data for year " + sYear);
		// System.out.println ("DEBUG: Example: " + lRetA.get(0));

		return (lRetA);
	}
	
	private static ArrayList<String> ReadTeamYearFixtures (int aYear, String aTeam)
	{
		ArrayList<String>	lRetA = new ArrayList<String> ();
		
		try
		{
			Document 	lDoc = LoadXMLFromURL ("fixtures/"+ aYear +"/" + aTeam + "_Fixtures_Data.xml");
			
            NodeList	lFixtureList	= lDoc.getElementsByTagName("Fixture");
            int 	 	lTotal			= lFixtureList.getLength();
            
            // System.out.println("Total no of fixtures = " + lTotal + " for " + aTeam + " " + aYear);
            
            for (int lIn=0 ; lIn<lTotal ; ++lIn)
            {
            	Node lNode = lFixtureList.item(lIn);
            	
            	if( lNode.getNodeType() == Node.ELEMENT_NODE)
            	{
            		Element lElement = (Element)lNode;
            		
            		//
            		// Do we have match information for this game?
            		//
            		if (0 == lElement.getElementsByTagName("HasLink").getLength())
            		{
            			// No match data
            		}
            		else
            		{
            			String lDate = lElement.getElementsByTagName("Date").item(0).getChildNodes().item(0).getNodeValue();
            			String lOppo = lElement.getElementsByTagName("Opposition").item(0).getChildNodes().item(0).getNodeValue();
            			
            			// System.out.println ("Fixture XML: " + GetXmlFileName (lDate, lOppo));
            			
            			lRetA.add(GetXmlFileName (lDate, lOppo));
            		}
            	}

            }
		} 
		catch (ParserConfigurationException e)
		{
			e.printStackTrace();
		} 
		catch (SAXException e)
		{
			e.printStackTrace();
		} 
		catch (IOException e)
		{
			e.printStackTrace();
		}

		return (lRetA);
	}

	public static Document LoadXMLFromURL (String aUrlFragment) throws ParserConfigurationException, SAXException, IOException
	{
		DocumentBuilderFactory	lDocBuilderFactory = DocumentBuilderFactory.newInstance();
	    DocumentBuilder 		lDocBuilder = lDocBuilderFactory.newDocumentBuilder();
		URL						lURL = new URL (sRootURL + aUrlFragment);
		InputStream				lStream = lURL.openStream();
		
	    Document 				lDoc = lDocBuilder.parse(lStream);
	    
	    lDoc.getDocumentElement ().normalize ();
	    
	    // System.out.println ("Root element of the doc is " + lDoc.getDocumentElement().getNodeName());
	    
	    return (lDoc);
	}

	private static String GetXmlFileName (String aDate, String aOppo)
	{
		String lRet = "";
		
		try
		{
			String[] lMonths = {	"January", "February", "March", "April", 
								"May", "June", "July", "August", 
								"September", "October", "November", "December"};
			DateFormat	lDF = new SimpleDateFormat ("EEE, d MMM yyyy HH:mm:ss Z");
			Date		lMyDate = (Date)lDF.parse (aDate);
			Calendar	lCal = Calendar.getInstance();
			
			lCal.setTime(lMyDate);
			String lMonth = lMonths[lCal.get(Calendar.MONTH)];
			
			lRet = lMonth + "_" + lCal.get(Calendar.DATE) + ordinalSuffix(lCal.get(Calendar.DATE)) + "_" + aOppo;
			lRet = lRet.replaceAll(" ", "_") + ".xml";
			lRet = lRet.toLowerCase();
			
		} 
		catch (ParseException e)
		{
			e.printStackTrace();
		}
		
		return (lRet);
	}
	
	private static String ordinalSuffix  (  int value )
	{
		value = Math.abs( value );
		final int lastDigit = value % 10;
		final int last2Digits = value % 100;
		switch ( lastDigit )
		{
			case 1 :
				return  last2Digits == 11 ? "th" : "st";

			case 2:
				return  last2Digits == 12 ? "th" : "nd";

			case 3:
				return  last2Digits == 13 ? "th" : "rd";

			default:
				return "th";
		}
	}
	
	private static boolean LogMatchesLoadedname (ArrayList<MatchReport> aMRA)
	{
		System.out.println ("INFO: Successfully loaded data from " + aMRA.size() + " matches");
		return (true);
	}

	private static boolean LogPlayersProcessed ()
	{
		boolean lRet=true;

		System.out.println ("INFO: Processed a total of " + PlayerYearStats.GetStats().size() + " players for year " + sYear);
		
		for (PlayerYearStats lPS : PlayerYearStats.GetStats().values())
		{
			System.out.println (lPS.toXML("    "));
		}
		
		return (lRet);
	}
}
