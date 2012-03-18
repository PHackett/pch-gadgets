import org.w3c.dom.Element;


public class BowlerGameSummary
{
	String		mName;
	BowlerStats	mBS;
	
	public BowlerGameSummary()
	{
		
	}
	
	public String		GetName()	{ return (mName);		}
	public BowlerStats	GetBS()		{ return (mBS);			}
	
	public boolean LoadFromXML (Element aBGSXML)
	{
		boolean lRet = true;
		
		mName = aBGSXML.getAttribute("name");
		
		// System.out.println ("  DEBUG: Bowler name " + mName);

		Overs	lO 			= new Overs(aBGSXML.getAttribute("overs"));
		int		lMaidens	= Integer.parseInt (aBGSXML.getAttribute("maidens"));
		int		lRuns		= Integer.parseInt (aBGSXML.getAttribute("runs"));
		int		lWickets	= Integer.parseInt (aBGSXML.getAttribute("wickets"));

		mBS = new BowlerStats (lO, lMaidens, lRuns, lWickets);
		
		return (lRet);
	}

}
