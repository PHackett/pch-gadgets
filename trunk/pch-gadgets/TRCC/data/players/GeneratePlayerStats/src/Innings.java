import java.util.ArrayList;

import org.w3c.dom.Element;
import org.w3c.dom.NodeList;


public class Innings
{
	String 							mBattingTeam;
	ArrayList<BatterGameSummary>	mBatterData;
	ArrayList<BowlerGameSummary>	mBowlerData;
	

	public Innings()
	{
		mBatterData = new ArrayList<BatterGameSummary> ();
		mBowlerData = new ArrayList<BowlerGameSummary> ();
	}

	public String							GetBattingTeamName ()		{ return (mBattingTeam);								}
	public boolean 							IsTrccBatting ()			{ return (mBattingTeam.equalsIgnoreCase("Twyford"));	}
	public ArrayList<BatterGameSummary>		GetBatterGameSummaryA ()	{ return (mBatterData);									}
	public ArrayList<BowlerGameSummary>	GetBowlerGameSummaryA ()	{ return (mBowlerData);									}

	public boolean LoadFromXML (Element aInningsXML)
	{
		boolean lRet = true;
		
		mBattingTeam = aInningsXML.getAttribute("batting");

		if (IsTrccBatting())
		{
	        NodeList	lBatterList	= aInningsXML.getElementsByTagName("Batsman");
	        
	        // System.out.println ("DEBUG:     Discovered " + lBatterList.getLength() + " batsmen in this game for team " + mBattingTeam);
	        
	        for (int i=0 ; i<lBatterList.getLength() ; ++i)
	        {
            	Element 			lBatterElement	= (Element)lBatterList.item(i);
            	BatterGameSummary	lBGS			= new BatterGameSummary();
            	
            	if (!lBGS.LoadFromXML (lBatterElement))
            	{
            		System.out.println("ERROR: Failed to parse BatterSummarry");
            		lRet = false;
            	}
            	else
            	{
            		mBatterData.add(lBGS);
            	}
	        }
		}
		else
		{
	        NodeList	lBowlerList	= aInningsXML.getElementsByTagName("BowlerSummary");

	        // System.out.println ("DEBUG:     Discovered " + lBowlerList.getLength() + " bowlers in this game: Batting is " + mBattingTeam);

	        for (int i=0 ; i<lBowlerList.getLength() ; ++i)
	        {
            	Element 			lBowlerSummaryElement	= (Element)lBowlerList.item(i);
            	BowlerGameSummary	lBGS					= new BowlerGameSummary();
            	
            	if (!lBGS.LoadFromXML (lBowlerSummaryElement))
            	{
            		System.out.println("ERROR: Failed to parse BowlerGameSummarry");
            		lRet = false;
            	}
            	else
            	{
            		mBowlerData.add(lBGS);
            	}
	        }
		}
		
		return (lRet);
	}

}
