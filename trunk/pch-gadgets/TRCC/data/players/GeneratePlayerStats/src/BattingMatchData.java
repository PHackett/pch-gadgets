import org.w3c.dom.Element;
import org.w3c.dom.NodeList;


public class BattingMatchData
{
	MatchID				mMatchID;
	BatterGameSummary	mGameData;
	
	public BattingMatchData ()
	{
	}
	
	
	public BattingMatchData (MatchID aMatchID, BatterGameSummary aGameData)
	{
		mMatchID	= aMatchID;
		mGameData	= aGameData;		
	}

	public MatchID				MatchID()	{ return (mMatchID);		}
	public BatterGameSummary	GetBGS()	{ return (mGameData);		}
	
	/**
	 * 
	 * @param aBattingElement
	 * @param aKey
	 * @return
	 */
	public boolean ParseFromXML (Element aBattingElement)
	{
		boolean 	lRet=false;
		
    	//
    	// First matchID - "<MatchId date="Sun Aug 1 00:00:00 UTC+0100 2010" oppo="Theale and Tilehurst"/>"
    	//
    	NodeList	lMID=aBattingElement.getElementsByTagName("MatchId");
    	
        if (lMID.getLength() != 1)
        {
        	System.out.println ("ERROR: We have " + lMID.getLength() + " 'MatchId' records");
        	lRet = false;	        	
        }
        else
        {
        	Element lMIDElement = (Element)lMID.item(0);
        	mMatchID 			= new MatchID();
        	
        	if (!mMatchID.parseFromYearStatsXML (lMIDElement))
        	{
        		System.out.println ("ERROR: Failed to parse MatchID");
            	lRet = false;	        	
        	}
        }
        
        //
        // Batting data - "<BattingData runs="7" notouts="0"/>"
        //
    	NodeList	lBD=aBattingElement.getElementsByTagName("BattingData");
    	
        if (lBD.getLength() != 1)
        {
        	System.out.println ("ERROR: We have " + lMID.getLength() + " 'BattingData' records");
        	lRet = false;	        	
        }
        else
        {
        	Element lMIDElement = (Element)lBD.item(0);
        	mGameData			= new BatterGameSummary();
        	
        	if (!mGameData.LoadFromYearStatsXML(lMIDElement))
        	{
        		System.out.println ("ERROR: Failed to parse BattingData");
            	lRet = false;	        	
        	}
        }
		
		return (lRet);
	}
}
