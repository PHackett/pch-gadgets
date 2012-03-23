import org.w3c.dom.Element;


public class BowlerStats
{
	Overs	mOvers;
	int		mMaidens;
	int		mRuns;
	int		mWickets;
	
	
	public BowlerStats ()
	{
		mOvers		= new Overs();
		mMaidens	= 0;
		mRuns		= 0;
		mWickets	= 0;
	}
	
	public BowlerStats (Overs aO, int aM, int aR, int aW)
	{
		mOvers 		= aO;
		mMaidens	= aM;
		mRuns		= aR;
		mWickets	= aW;
	}

	public Overs	Overs()		{ return (mOvers);		}
	public int		Maidens()	{ return (mMaidens);	}
	public int		Runs()		{ return (mRuns);		}
	public int		Wickets()	{ return (mWickets);	}

	
	public void Add (BowlerStats aBS)
	{
		mOvers.add(aBS.Overs());
		mMaidens	+= aBS.Maidens();
		mRuns		+= aBS.Runs();
		mWickets	+= aBS.Wickets();		
	}
	
	public boolean BetterThan (BowlerStats aBS)
	{
		boolean lRet=false;
		
		if (mWickets != aBS.Wickets())
		{
			lRet = mWickets > aBS.Wickets();
		}
		else if (mRuns != aBS.Runs())
		{
			lRet = mRuns < aBS.Runs();
		}
		else if (mMaidens != aBS.Maidens())
		{
			lRet = mMaidens > aBS.Maidens();
		}
		else if (mOvers.getBalls() != aBS.Overs().getBalls())
		{
			lRet = mOvers.getBalls() > aBS.Overs().getBalls();
		}
		else
		{
			lRet = false;
		}
		
		return (lRet);
	}

	
	public boolean LoadFromYearStatsXML (Element aBSElement)
	{
		boolean lRet = true;

		mOvers		= new Overs (aBSElement.getAttribute("overs"));
		mMaidens	= Integer.parseInt(aBSElement.getAttribute("maidens"));
		mRuns		= Integer.parseInt(aBSElement.getAttribute("runs"));
		mWickets	= Integer.parseInt(aBSElement.getAttribute("wickets"));

		return (lRet);
	}

	
	public String toXML()
	{
		String lRet = "<BowlingData ";
		
		lRet = lRet + "overs=\"" 	+ mOvers.toString() + "\" ";
		lRet = lRet + "maidens=\""	+ mMaidens			+ "\" ";
		lRet = lRet + "runs=\""		+ mRuns				+ "\" ";
		lRet = lRet + "wickets=\""	+ mWickets			+ "\"";
		
		lRet = lRet + "/>";
		
		return (lRet);
	}
}
