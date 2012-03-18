import java.util.ArrayList;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;


public class MatchReport
{
	MatchID					mMatchID;
	ArrayList<Innings>		mInnings;

	
	public MatchReport ()
	{
		mInnings 			= new ArrayList<Innings> ();
		mMatchID			= new MatchID();
	}
	
	public boolean 				NotForStats ()	{ return (mMatchID.NotForStats());	}
	public MatchID 				MatchID ()			{ return (mMatchID);				}
	
	public ArrayList<BatterGameSummary>	TrccBatterGameSummary()	
	{
		ArrayList<BatterGameSummary>	lRet=null;
		Innings 						lIN=GetInnings(true);
		
		if (null != lIN)
		{
			lRet = lIN.GetBatterGameSummaryA();
		}
		
		return (lRet);
	}

	public ArrayList<BowlerGameSummary>	TrccBowlerGameSummary()	
	{
		ArrayList<BowlerGameSummary>	lRet=null;
		Innings 						lIN=GetInnings(false);
		
		if (null != lIN)
		{
			lRet = lIN.GetBowlerGameSummaryA();
		}
		
		return (lRet);
	}

	private Innings GetInnings (boolean aTRCCBatting)
	{
		Innings lRet=null;
		
		for (int i=0 ; i< mInnings.size() ; ++i)
		{
			if (mInnings.get(i).IsTrccBatting() && aTRCCBatting)
			{
				lRet = mInnings.get(i);
				break;
			}
			else if (!mInnings.get(i).IsTrccBatting() && !aTRCCBatting)
			{
				lRet = mInnings.get(i);
				break;
			}
		}
		
		return (lRet);
	}
	
	public boolean LoadFromXML (Document aDoc)
	{
		boolean 	lRet = true;
        NodeList	lCricketMatch	= aDoc.getElementsByTagName("CricketMatch");

        if (1 != lCricketMatch.getLength())
        {
        	System.out.println ("ERROR: Cant find <CricketMatch>in XML");
        	lRet = false;
        }
        else
        {
        	Element lCricketMatchElement = (Element)lCricketMatch.item(0);
        	
        	mMatchID.LoadFromMatchXML(lCricketMatchElement);

			//
			// Now load the innings
			//
	        NodeList	lInningsList	= lCricketMatchElement.getElementsByTagName("Innings");

	        if (lInningsList.getLength() > 2)
	        {
	        	System.out.println ("ERROR: We have " + lInningsList.getLength() + " innings in this game!");
	        	lRet = false;	        	
	        }
	        
	        // System.out.println ("DEBUG: We have " + lInningsList.getLength() + " innings in this game!");
	        
	        for (int i=0 ; i<lInningsList.getLength() ; ++i)
	        {
            	Element lInningsElement = (Element)lInningsList.item(i);

				Innings lIN = new Innings();
				
				if (!lIN.LoadFromXML (lInningsElement))
				{
		        	System.out.println ("ERROR: Failed loading Innings in XML");
		        	lRet = false;
				}
				else
				{
					// Save away the loaded data
					mInnings.add(lIN);
				}
	        }
        }
		
		
		return (lRet);
	}
}
