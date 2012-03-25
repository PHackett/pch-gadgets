import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;


public class BatterGameSummary
{
	String	mName;
	int		mRuns;
	boolean	mNotOut;
	int		mNotOuts;
	boolean	mDidNotBat;
	
	public BatterGameSummary ()
	{
		mRuns 		= 0;
		mNotOut		= false;
		mDidNotBat	= false;
	}
	
	public BatterGameSummary (int aRuns, boolean aNO)
	{
		mRuns 		= aRuns;
		mNotOut		= aNO;
		mDidNotBat	= false;
	}

	public String	GetName()	{ return (mName);		}
	public int		Runs()		{ return (mRuns);		}
	public boolean	NotOut()	{ return (mNotOut);		}
	public boolean	DidNotBat()	{ return (mDidNotBat);	}

	public boolean BetterThan (BatterGameSummary aBGS)
	{
		boolean lRet=false;
		
		if (mRuns != aBGS.Runs())
		{
			lRet = mRuns > aBGS.Runs();
		}
		else if (mNotOut && !aBGS.NotOut())
		{
			lRet = true;
		}
		
		return (lRet);
	}
	
	
	public String toXML()
	{
		String lRet = "<BattingData runs=\"" + mRuns + "\" notouts=\"";

		if (mNotOut)
		{
			lRet = lRet + "1";
		}
		else
		{
			lRet = lRet + "0";
		}
		
		lRet = lRet + "\"/>";
		
		return (lRet);
	}
	
	public boolean LoadFromXML (Element aBGSXML)
	{
		boolean lRet = true;
		
		mName	= aBGSXML.getAttribute("name");
		
		// System.out.println ("  DEBUG: Batsman name " + mName);

		//
		// Read Runs
		//
        NodeList	lRunsList	= aBGSXML.getElementsByTagName("Runs");
        
        if (lRunsList.getLength() != 1)
        {
        	// System.out.println ("INFO: No runs for batsman " + mName);
    		mDidNotBat	= true;
        }
        else
        {
        	Node 	lNode = lRunsList.item(0);
    		Element lElement = (Element)lNode;
    		
    		mRuns		= Integer.parseInt (lElement.getAttribute("value"));
        }

		//
		// Read HowOut
		//
        NodeList	lHOList	= aBGSXML.getElementsByTagName("HowOut");
        
        if (lHOList.getLength() != 1)
        {
        	// System.out.println ("INFO: No HowOut for batsman " + mName);
    		mDidNotBat	= true;
        }
        else
        {
        	Node 	lNode = lHOList.item(0);
    		Element lElement = (Element)lNode;
    		
    		if (lElement.getAttribute("how").equalsIgnoreCase("Not Out"))
    		{
    			mNotOut = true;
    		}
    		else
    		{
    			mNotOut = false;
    		}
        }

		return (lRet);
	}
	
	public boolean LoadFromYearStatsXML (Element aBatYS)
	{
		boolean lRet = true;

    	mNotOuts	= 0;
		mNotOut		= (1 == Integer.parseInt(aBatYS.getAttribute("notouts")));
		mDidNotBat	= false;
    	mRuns		= Integer.parseInt(aBatYS.getAttribute("runs"));
		
		return (lRet);
	}
}
