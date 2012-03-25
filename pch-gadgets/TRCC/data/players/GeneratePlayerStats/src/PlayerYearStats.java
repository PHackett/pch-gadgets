import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.w3c.dom.Element;
import org.w3c.dom.NodeList;


public class PlayerYearStats
{

	static Map<String, PlayerYearStats> sPlayerDB = new HashMap<String, PlayerYearStats>();
	
	public static PlayerYearStats GetPlayerStats (String aPlayerName, int aYear)
	{
		PlayerYearStats lRet;
		
		if (sPlayerDB.containsKey(aPlayerName))
		{
			lRet = sPlayerDB.get(aPlayerName);
		}
		else
		{
			lRet = new PlayerYearStats(aPlayerName, aYear);
			
			sPlayerDB.put(aPlayerName, lRet);
		}
		
		return (lRet);
	}
	

	public static Map<String, PlayerYearStats> GetStats()	{ return (sPlayerDB);	}

	
	//
	//
	//
	int 						mYear;
	String						mName;
	MatchID						mFirstRecordedGame;
	
	BowlerStats					mBowlerSummary;
	int							mBowlerGames;
	int							mBowlerFivePlus;
	BowlingMatchData			mBowlingBest;
	ArrayList<BowlingMatchData>	mBowlingHighlights;
	
	BatterSummary				mBatterSummary;
	BattingMatchData			mBattingBest;
	ArrayList<BattingMatchData>	mBattingHighlights;


	public PlayerYearStats (String aName, int aYear)
	{
		mName					= aName;
		mYear					= aYear;
		mFirstRecordedGame		= null;
		mBowlerSummary			= new BowlerStats();
		mBowlerGames			= 0;
		mBowlerFivePlus			= 0;
		mBowlingBest			= null;
		mBowlingHighlights		= new ArrayList<BowlingMatchData> ();
		
		mBatterSummary			= new BatterSummary();
		mBattingBest			= null;
		mBattingHighlights		= new ArrayList<BattingMatchData> ();
	}

	String	Name ()			{ return (mName);		}

	
	public boolean AddBowlingSummary (MatchID aMID, BowlerGameSummary aBGS)
	{
		boolean lRet=true;
		
		// if (aBGS.GetName().equalsIgnoreCase("Steve Walkland"))
		// {
		// 	System.out.println ("DEBUG: Steve Walkland bowling: aMID=" + aMID.toXML());
		// }
		
		mBowlerSummary.Add(aBGS.GetBS());
		mBowlerGames++;
		
		//
		// IS this a bowling highlight?
		//
		if (aBGS.GetBS().Wickets() >= 5)
		{
			mBowlerFivePlus++;
			
			BowlingMatchData lBMD = new BowlingMatchData(aMID, aBGS.GetBS());
			mBowlingHighlights.add(lBMD);
		}
		
		//
		// Is this the earliest game recorded in this year for this player?
		//
		if ((null == mFirstRecordedGame) || (aMID.Date().before(mFirstRecordedGame.Date())))
		{
			mFirstRecordedGame = aMID;
		}
		
		//
		// Are these the best bowling figures we have seen?
		//
		if ((null == mBowlingBest) || aBGS.GetBS().BetterThan(mBowlingBest.BowlerStats()))
		{
			mBowlingBest = new BowlingMatchData (aMID, aBGS.GetBS());
		}
		
		return (lRet);
	}
	
	public boolean AddBattingSummary (MatchID aMID, BatterGameSummary aBGS)
	{
		boolean lRet=true;
		
		//
		// Is this the earliest game recorded in this year for this player?
		//
		if ((null == mFirstRecordedGame) || (aMID.Date().before(mFirstRecordedGame.Date())))
		{
			mFirstRecordedGame = aMID;
		}

		if (aBGS.DidNotBat())
		{
			// Nothing to record
		}
		else
		{
			mBatterSummary.IncInnings();
			mBatterSummary.IncRuns(aBGS.Runs());
			
			if (aBGS.NotOut())
			{
				mBatterSummary.IncNotouts();
			}
			
			if (aBGS.Runs() >= 100)
			{
				mBatterSummary.IncHundreds();
			}
			else if (aBGS.Runs() >= 50)
			{
				mBatterSummary.IncFifties();
			}
			else if (0 == aBGS.Runs())
			{
				mBatterSummary.IncDucks();
			}
			
			if (null == mBattingBest)
			{
				mBattingBest = new BattingMatchData (aMID, aBGS);
			}
			else if (aBGS.BetterThan(mBattingBest.GetBGS()))
			{
				mBattingBest = new BattingMatchData (aMID, aBGS);				
			}
			
			if (aBGS.Runs() >= 50)
			{
				//
				// Its a batting highlight
				//
				mBattingHighlights.add (new BattingMatchData (aMID, aBGS));
			}
		}
		
		return (lRet);
	}


	/**
	 * Parse the year stats from XML
	 * 
	 * @param aEle
	 * @return
	 */
	public boolean ParseFromXML (Element aEle)
	{
		boolean 	lRet = true;
		
		System.out.println ("DEBUG: Parsing lifetime stats data for year " + mYear);
		
		//
		// Process the Batting data
		//
        NodeList	lBattingList	= aEle.getElementsByTagName("Batting");

        if (lBattingList.getLength() > 1)
        {
        	System.out.println ("ERROR: We have " + lBattingList.getLength() + " Batting data for '" + mName + "' in year " + mYear);
        	lRet = false;	        	
        }
        else if (0 == lBattingList.getLength())
        {
        	//
        	// No batting information
        	//
        }
        else if (!ParseBattingYearStats((Element)lBattingList.item(0)))
        {
        	System.out.println ("ERROR: Failed parsing lifetime batting data for '" + mName + "' in year " + mYear);
        	lRet = false;	        	
        }
        
		//
		// Process the Bowling data
		//
        NodeList	lBowlingList	= aEle.getElementsByTagName("Bowling");

        if (lBowlingList.getLength() > 1)
        {
        	System.out.println ("ERROR: We have " + lBowlingList.getLength() + " Bowling data for '" + mName + "' in year " + mYear);
        	lRet = false;	        	
        }
        else if (0 == lBowlingList.getLength())
        {
        	//
        	// No bowling information
        	//
        }
        else if (!ParseBowlingYearStats((Element)lBowlingList.item(0)))
        {
        	System.out.println ("ERROR: Failed parsing lifetime bowling data for '" + mName + "' in year " + mYear);
        	lRet = false;	        	
        }
		
		return (lRet);
	}

	
	private boolean ParseBowlingYearStats (Element aBowlingElement)
	{
		boolean lRet = true;
		
		//
		// TODO
		//
		
		mBowlerGames			= Integer.parseInt(aBowlingElement.getAttribute("games"));
		mBowlerFivePlus			= Integer.parseInt(aBowlingElement.getAttribute("fiveplus"));
		
		//
		// Parse the bowling data
		//
		{
			NodeList	lBD = aBowlingElement.getElementsByTagName("BowlingData");
			
	        if (lBD.getLength() == 1)
	        {
	        	System.out.println ("ERROR: We have " + lBD.getLength() + " 'BowlingData' records for '" + mName + "' in year " + mYear);
	        	lRet = false;	        	
	        }
	        else
	        {
	        	Element lBBElement = (Element)lBD.item(0);

	        	
	        	mBowlerSummary = new BowlerStats();
	        	mBowlerSummary.LoadFromYearStatsXML(lBBElement);
	        }
		}
		
		//
		// Parse the 'BowlingBest
		//
        NodeList	lBMD = aBowlingElement.getElementsByTagName("BowlingBest");

        if (lBMD.getLength() != 1)
        {
        	System.out.println ("ERROR: We have " + lBMD.getLength() + " 'BowlingBest' records");
        	lRet = false;	        	
        }
        else
        {
        	Element lBBElement = (Element)lBMD.item(0);

        	mBowlingBest = new BowlingMatchData();
    		mBowlingBest.ParseFromXML (lBBElement);
        }
        
		//
		// Parse the 'BowlingHighlights'
		//
        NodeList	lBMH = aBowlingElement.getElementsByTagName("BowlingHighlight");

        if (lBMH.getLength() == 0)
        {
        	System.out.println ("DEBUG: We have " + lBMH.getLength() + " 'BowlingHightlight' records for '" + mName + "' in year " + mYear);
        }
        else
        {
        	for (int i=0 ; i<lBMH.getLength() ; ++i)
        	{
	        	Element 			lBHElement = (Element)lBMH.item(i);
	        	BowlingMatchData	lBmData = new BowlingMatchData();
	        	
	        	lBmData.ParseFromXML (lBHElement);
	        	
	        	mBowlingHighlights.add(lBmData);
        	}
        }

		return (lRet);
	}
	
	
	private boolean ParseBattingYearStats (Element aBattingElement)
	{
		boolean lRet = true;
		
		mBatterSummary.parseFromXML(aBattingElement);

    	//
    	// Parse the 'BattingBest'
    	//
        NodeList	lBMD = aBattingElement.getElementsByTagName("BattingBest");
        
        if (lBMD.getLength() != 1)
        {
        	System.out.println ("ERROR: We have " + lBMD.getLength() + " 'BattingBest' records");
        	lRet = false;	        	
        }
        else
        {
        	Element lBBElement = (Element)lBMD.item(0);

    		mBattingBest = new BattingMatchData();
    		mBattingBest.ParseFromXML (lBBElement);
        }

		//
		// All the batting highlights TODO
		//
        NodeList	lBBList	= aBattingElement.getElementsByTagName("BattingHighlight");
        
        if (0 == lBBList.getLength())
        {
        	//
        	// No highlights to process
        	//
        }
        else
        {
        	for (int i=0 ; i<lBBList.getLength() ; ++i)
        	{
            	Element 			lBBElement = (Element)lBBList.item(i);
            	BattingMatchData	lBMH = new BattingMatchData();
        	
            	lBMH.ParseFromXML(lBBElement);
            	
            	mBattingHighlights.add(lBMH);
        	}
        }
		
		return (lRet);
	}

	public String toXML (String aINdent)
	{
		StringBuffer lRet = new StringBuffer();
		
		lRet.append (aINdent + "<YearData year=\"" + mYear + "\">"														+ "\n");
		
		if (0 < mBowlerGames)
		{
			lRet.append (aINdent + "    <Bowling games=\"" + mBowlerGames + "\" fiveplus=\"" + mBowlerFivePlus + "\">"	+ "\n");
			lRet.append (aINdent + "        " + mBowlerSummary.toXML()													+ "\n");
			lRet.append (aINdent + "        <BowlingBest>"																+ "\n");
			lRet.append (aINdent + "            " + mBowlingBest.MatchID().toXML()										+ "\n");
			lRet.append (aINdent + "            " + mBowlingBest.BowlerStats().toXML()									+ "\n");
			lRet.append (aINdent + "        </BowlingBest>"																+ "\n");
			
			if (0 < mBowlingHighlights.size())
			{
				for (int i=0 ; i<mBowlingHighlights.size() ; ++i)
				{
					lRet.append (aINdent + "        <BowlingHighlight>"													+ "\n");
					lRet.append (aINdent + "            " + mBowlingHighlights.get(i).MatchID().toXML()					+ "\n");
					lRet.append (aINdent + "            " + mBowlingHighlights.get(i).BowlerStats().toXML()				+ "\n");
					lRet.append (aINdent + "        </BowlingHighlight>"												+ "\n");
				}
			}
			
			lRet.append (aINdent + "    </Bowling>"																		+ "\n");
		}
		
		if ((0 < mBowlerGames) && (0 < mBatterSummary.Innings()))
		{
			lRet.append (aINdent  																						+ "\n");			
		}

		if (0 < mBatterSummary.Innings())
		{
			lRet.append (aINdent + "    " + mBatterSummary.toXML(false)); 
		
			lRet.append (aINdent + "        <BattingBest>"																+ "\n");
			lRet.append (aINdent + "            " + mBattingBest.MatchID().toXML()										+ "\n");
			lRet.append (aINdent + "            " + mBattingBest.GetBGS().toXML()										+ "\n");
			lRet.append (aINdent + "        </BattingBest>"																+ "\n");
			
			if (0 < mBattingHighlights.size())
			{
				for (int i=0 ; i<mBattingHighlights.size() ; ++i)
				{
					lRet.append (aINdent + "        <BattingHighlight>"													+ "\n");
					
					lRet.append (aINdent + "            " + mBattingHighlights.get(i).MatchID().toXML()					+ "\n");
					lRet.append (aINdent + "            " + mBattingHighlights.get(i).GetBGS().toXML()					+ "\n");

					lRet.append (aINdent + "        </BattingHighlight>"												+ "\n");
				}
			}
			
			lRet.append (aINdent + "    </Batting>"																		+ "\n");
		}
		
		lRet.append (aINdent + "</YearData>"																			+ "\n");
		
		return (lRet.toString());
	}
}
