import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.NavigableMap;
import java.util.TreeMap;

import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;


public class PlayerLifetimeStats 
{
	static Map<String, PlayerLifetimeStats> sPlayerDB = new TreeMap<String, PlayerLifetimeStats>();
	
	public static PlayerLifetimeStats Get (String aName)
	{
		PlayerLifetimeStats lRet = sPlayerDB.get(aName);
		
		if (null == lRet)
		{
			lRet = new PlayerLifetimeStats(aName);
			
			sPlayerDB.put(aName, lRet);
		}
		
		return (lRet);
	}

	
	//
	// Members
	//
	String								mName;
	MatchID								mFirstRecordedGame;
	TreeMap<Integer, PlayerYearStats>	mPlayerStatsDB;

	
	/**
	 * Ctor
	 * 
	 * @param aName
	 */
	public PlayerLifetimeStats (String aName)
	{
		mName = aName;
		mPlayerStatsDB = new TreeMap<Integer, PlayerYearStats>();
	}

	
	/**
	 * Load the Player Year Stats from the XML online
	 * 
	 * @return
	 */
	public boolean LoadFromURL ()
	{
		boolean lRet = false;
		String	lURL = GetURLFragment ();
		
		try 
		{
			Document lDoc = GeneratePlayerStats.LoadXMLFromURL(lURL);
			
			if (!ParsePlayerYearStats (lDoc))
			{
				System.out.println ("ERROR: Failed to parse lifetime stats for player = '" + mName + "'");				
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
		catch (FileNotFoundException e)
		{
			//
			// There is no data for this player on the web
			//
			System.out.println ("INFO: No PlayerLifetimeStats on web for player = '" + mName + "'");
		}
		catch (IOException e) 
		{
			e.printStackTrace();
		}
		
		return (lRet);
	}


	/**
	 * Parse the year stats XML 
	 * @param aDoc
	 * @return
	 */
	public boolean ParsePlayerYearStats (Document aDoc)
	{
		boolean 	lRet = true;
        NodeList	lPS	= aDoc.getElementsByTagName("PlayerStats");

        if (1 != lPS.getLength())
        {
        	System.out.println ("ERROR: Cant find <PlayerStats>in XML");
        	lRet = false;
        }
        else
        {
        	Element lPSElement = (Element)lPS.item(0);

        	//
        	// Load the first recorded data
        	//
        	if (!LoadFirstRecordedGame (lPSElement))
        	{
        		System.out.println ("ERROR: Failed loading 'First Recorded Game' for player = '" + mName + "'");
            	lRet = false;
        	}
        	
			//
			// Now load the year data
			//
	        NodeList	lYearList	= lPSElement.getElementsByTagName("YearData");
	        
	        for (int i=0 ; i<lYearList.getLength() ; ++i)
	        {
            	Element 		lYearElement = (Element)lYearList.item(i);
            	int				lYear=Integer.parseInt(lYearElement.getAttribute("year"));
            	
            	PlayerYearStats	lPYS = new PlayerYearStats(mName, lYear);
            	
            	if (!lPYS.ParseFromXML (lYearElement))
            	{
                	System.out.println ("ERROR: Failed parsing the year stats from XML for player = '" + mName + "'");
                	lRet = false;
            	}
            	
            	mPlayerStatsDB.put (lYear, lPYS);
	        }
	        
	        //
	        // Load the old, incomplete data. This relates to statistics kept by 
	        // D Downes, but for which the match data is not available
	        //
	        if (!LoadBattingStats1969to1997 (lPSElement))
	        {
	        	System.out.println ("ERROR: Failed loading 'BattingStats1969to1997' for player = '" + mName + "'");
	        	lRet = false;
	        }
	        
	        if (!LoadBowlingStats1969to1997 (lPSElement))
	        {
	        	System.out.println ("ERROR: Failed loading 'BowlingStats1969to1997' for player = '" + mName + "'");
	        	lRet = false;
	        }
        }
		
		return (lRet);
	}
	
	
	/**
	 * The URL of this player data on the web
	 * 
	 * @param aBaseURL
	 * @return
	 */
	public String GetURLFragment ()
	{
		String	lRet = "players/";
		int		lIndex=mName.indexOf(" ");
		
		if (-1 == lIndex)
		{
			System.out.println ("ERROR: Can parse player name " + mName);
		}
		else
		{
			String lFirstName	= mName.substring(0, lIndex);
			String lSurName		= mName.substring(lIndex+1);
			
			// System.out.println ("DEBUG: Player: FirstName='" + lFirstName + "' SurName='" + lSurName + "'");
			
			String lName = lSurName + "_" + lFirstName;
			
			lName = lName.toLowerCase().replace(" ", "_") + ".xml";
			
			lRet = lRet + lName;
		}
		
		return (lRet);
	}
	
	
	/**
	 * 
	 */
	public String toXML ()
	{
		String 				lRet  = "";
		Date				lDate = new Date();
		SimpleDateFormat	lDF   = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss zzz");
		
		lRet += "<PlayerStats name=\"" + mName + "\" generated=\"" + lDF.format(lDate) + "\">"	+ "\n";

		if (null == mFirstRecordedGame)
		{
			System.out.println ("ERROR: No FirstRecordedGame data for player '" + mName + "'");			
		}
		else
		{
			lRet += "    <FirstRecordedGame>"														+ "\n";
			lRet += "        " + mFirstRecordedGame.toXML()											+ "\n";
			lRet += "    </FirstRecordedGame>"														+ "\n";
			lRet += ""																				+ "\n";
		}
		
		boolean									lF   = true;
		NavigableMap<Integer, PlayerYearStats>	lROM = mPlayerStatsDB.descendingMap();
		Collection<PlayerYearStats>				lCol = lROM.values();
		Iterator<PlayerYearStats>				lItr = lCol.iterator();
		
		while (lItr.hasNext())
		{
			if (lF)
			{
				lF = false;
			}
			else
			{
				lRet += "\n";
			}
			
			lRet += lItr.next().toXML("    ");
		}
		
		
		
		lRet += "</PlayerStats>";

		
		return (lRet);
	}
	

	/**
	 * Load the first recorded game from the player liftime stats XML
	 * 
	 * @return
	 */
	public boolean LoadFirstRecordedGame (Element aPSElement)
	{
		boolean lRet = true;

        NodeList	lFRGList	= aPSElement.getElementsByTagName("FirstRecordedGame");
        
        if (lFRGList.getLength() != 1)
        {
			System.out.println ("ERROR: FirstRecordedGame elements for player '" + mName + "' has " + lFRGList.getLength() + " entries");
			lRet = false;
        }
        else
        {
        	Element 	lFRGElement = (Element)lFRGList.item(0);
        	
        	NodeList	lMID=lFRGElement.getElementsByTagName("MatchId");
        	
            if (lMID.getLength() != 1)
            {
            	System.out.println ("ERROR: We have " + lMID.getLength() + " 'MatchId' records for FirstRecordedGame");
            	lRet = false;	        	
            }
            else
            {
            	Element lMIDElement = (Element)lMID.item(0);

            	mFirstRecordedGame = new MatchID();

            	mFirstRecordedGame.parseFromYearStatsXML(lMIDElement);
            }

        }
		
		return (lRet);
	}

	
    public boolean LoadBattingStats1969to1997 (Element aPSElement)
    {
		boolean lRet = true;

        NodeList	lOldBatStatsList	= aPSElement.getElementsByTagName("BattingStats1969to1997");
        
        if (lOldBatStatsList.getLength() > 1)
        {
        	System.out.println ("ERROR: We have " + lOldBatStatsList.getLength() + " 'BattingStats1969to1997' records for player '" + mName + "'");
        	lRet = false;
        }
        else if (1 == lOldBatStatsList.getLength())
        {
        	
        }

		return (lRet);
    }
    
    public boolean LoadBowlingStats1969to1997 (Element aPSElement)
    {
		boolean lRet = true;

        NodeList	lOldBowlStatsList	= aPSElement.getElementsByTagName("BowlingStats1969to1997");
        
        if (lOldBowlStatsList.getLength() > 1)
        {
        	System.out.println ("ERROR: We have " + lOldBowlStatsList.getLength() + " 'BowlingStats1969to1997' records for player '" + mName + "'");
        	lRet = false;
        }
        else if (1 == lOldBowlStatsList.getLength())
        {
        	
        }

		return (lRet);
    }
}
