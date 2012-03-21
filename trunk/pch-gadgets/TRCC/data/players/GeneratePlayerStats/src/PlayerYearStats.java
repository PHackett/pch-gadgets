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
	
	int							mBattingInnings;
	int							mBattingTotalRuns;
	int							mBattingTotalNotOuts;
	int							mBatting50s;
	int							mBatting100s;
	int							mBattingDucks;
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
		
		mBattingInnings			= 0;
		mBattingTotalRuns		= 0;
		mBattingTotalNotOuts	= 0;
		mBatting50s				= 0;
		mBatting100s			= 0;
		mBattingDucks			= 0;
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
			mBattingInnings++;
			mBattingTotalRuns		+= aBGS.Runs();
			
			if (aBGS.NotOut())
			{
				mBattingTotalNotOuts++;				
			}
			
			if (aBGS.Runs() >= 100)
			{
				mBatting100s++;
			}
			else if (aBGS.Runs() >= 50)
			{
				mBatting50s++;
			}
			else if (0 == aBGS.Runs())
			{
				mBattingDucks++;
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
	 * Parse the yesr stats from XML
	 * 
	 * @param aEle
	 * @return
	 */
	public boolean ParseFromXML (Element aEle)
	{
		boolean 	lRet = true;
		
		//
		// Process the Batting data
		//
        NodeList	lBattingList	= aEle.getElementsByTagName("Batting");

        if (lBattingList.getLength() > 1)
        {
        	System.out.println ("ERROR: We have " + lBattingList.getLength() + " Bowling data for '" + mName + "' in year " + mYear);
        	lRet = false;	        	
        }
        else if (lBattingList.getLength() == 1)
        {
        	Element lBattingElement = (Element)lBattingList.item(0);

        	mBattingInnings			= Integer.parseInt(lBattingElement.getAttribute("innings"));
        	mBattingTotalRuns		= Integer.parseInt(lBattingElement.getAttribute("runs"));
        	mBattingTotalNotOuts	= Integer.parseInt(lBattingElement.getAttribute("notouts"));
        	mBatting100s			= Integer.parseInt(lBattingElement.getAttribute("hundreds"));
        	mBatting50s				= Integer.parseInt(lBattingElement.getAttribute("fifties"));
        	mBattingDucks			= Integer.parseInt(lBattingElement.getAttribute("ducks"));
        	
    		mBattingBest = new BattingMatchData();
    		mBattingBest.ParseFromXML(lBattingElement, "BattingBest");

        }
        else
        {
        	//
        	// No batting information
        	//
        }
        
		//
		// Process the Bowling data
		//
        // TODO

		
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
		
		if ((0 < mBowlerGames) && (0 < mBattingInnings))
		{
			lRet.append (aINdent  																						+ "\n");			
		}

		if (0 < mBattingInnings)
		{
			lRet.append (aINdent + "    <Batting "																		+ 
											"innings=\""	+ mBattingInnings		+ "\" " 							+ 
											"runs=\""		+ mBattingTotalRuns		+ "\" "								+ 
											"notouts=\""	+ mBattingTotalNotOuts	+ "\" "								+ 
											"hundreds=\""	+ mBatting100s			+ "\" "								+ 
											"fifties=\""	+ mBatting50s			+ "\" "								+ 
											"ducks=\""		+ mBattingDucks			+ "\""								+ 
											">"																			+ "\n");
			lRet.append (aINdent + "        <BattingBest>"																+ "\n");
			lRet.append (aINdent + "            " + mBattingBest.MatchID().toXML()										+ "\n");
			lRet.append (aINdent + "            " + mBattingBest.GetBGS().toXML()										+ "\n");
			lRet.append (aINdent + "        <BattingBest>"																+ "\n");
			
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
