import org.w3c.dom.Element;
import org.w3c.dom.NodeList;


public class BowlingMatchData
{
	MatchID		mMatchID;
	BowlerStats	mBowlerStats;
	
	public BowlingMatchData ()
	{
		mMatchID		= new MatchID();
		mBowlerStats	= new BowlerStats();
	}


	public BowlingMatchData (MatchID aMatchID, BowlerStats	aBowlerStats)
	{
		mMatchID		= aMatchID;
		mBowlerStats	= aBowlerStats;
	}
	
	
	/**
	 * Parse bowl data from the year stats XML
	 * @param aBowlingElement
	 * @return
	 */
	public boolean ParseFromXML (Element aBowlingElement)
	{
		boolean lRet = true;
		
    	//
    	// First matchID - "<MatchId date="Sun Aug 1 00:00:00 UTC+0100 2010" oppo="Theale and Tilehurst"/>"
    	//
    	NodeList	lMID=aBowlingElement.getElementsByTagName("MatchId");
    	
        if (lMID.getLength() != 1)
        {
        	System.out.println ("ERROR: We have " + lMID.getLength() + " 'MatchId' records");
        	lRet = false;	        	
        }
        else
        {
        	Element lMIDElement = (Element)lMID.item(0);
        	
        	mMatchID.parseFromYearStatsXML(lMIDElement);
        }

        //
        // Bowling data - "<BowlingData overs="4.0" maidens="1" runs="12" wickets="0"/>"
        //
    	NodeList	lBD=aBowlingElement.getElementsByTagName("BowlingData");
    	
        if (lBD.getLength() != 1)
        {
        	System.out.println ("ERROR: We have " + lMID.getLength() + " 'BowlingData' records");
        	lRet = false;	        	
        }
        else
        {
        	Element lMIDElement = (Element)lBD.item(0);
        	
        	if (!mBowlerStats.LoadFromYearStatsXML(lMIDElement))
        	{
        		System.out.println ("ERROR: Failed to parse BowlingData");
            	lRet = false;	        	
        	}
        }
		
		return (lRet);
	}

	public MatchID		MatchID()		{ return (mMatchID);		}
	public BowlerStats	BowlerStats()	{ return (mBowlerStats);	}
}
