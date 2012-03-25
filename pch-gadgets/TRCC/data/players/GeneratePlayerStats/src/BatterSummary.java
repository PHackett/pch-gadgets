import org.w3c.dom.Element;


public class BatterSummary 
{

	int		mInnings;
	int		mRuns;
	int		mNotOuts;
	int		mHundreds;
	int		mFifties;
	int		mDucks;
	
	public BatterSummary ()
	{
		mInnings	= 0;
		mRuns		= 0;
		mNotOuts	= 0;
		mHundreds	= 0;
		mFifties	= 0;
		mDucks		= 0;
	}

	public int		Innings()	{ return (mInnings);	}
	public int		Runs()		{ return (mRuns);		}
	public int		NotOuts()	{ return (mNotOuts);	}
	public int		Hundreds()	{ return (mHundreds);	}
	public int		Fifties()	{ return (mFifties);	}
	public int		Ducks()		{ return (mDucks);		}

	
	public void IncInnings ()		{ mInnings++;		}
	public void IncRuns (int aR)	{ mRuns += aR;		}
	public void IncNotouts ()		{ mNotOuts++;		}
	public void IncHundreds ()		{ mHundreds++;		}
	public void IncFifties ()		{ mFifties++;		}
	public void IncDucks ()			{ mDucks++;			}
	
	public boolean parseFromXML (Element aBattingElement)
	{
		boolean lRet = true;
		
    	mInnings	= Integer.parseInt(aBattingElement.getAttribute("innings"));
    	mRuns		= Integer.parseInt(aBattingElement.getAttribute("runs"));
    	mNotOuts	= Integer.parseInt(aBattingElement.getAttribute("notouts"));
    	mHundreds	= Integer.parseInt(aBattingElement.getAttribute("hundreds"));
    	mFifties	= Integer.parseInt(aBattingElement.getAttribute("fifties"));
    	mDucks		= Integer.parseInt(aBattingElement.getAttribute("ducks"));

		return (lRet);
	}
	
	public String toXML (boolean aClose)
	{
		String lRet = "<Batting " 							+
						"innings=\"" 	+ mInnings	+ "\" "	+ 
						"runs=\""		+ mRuns		+ "\" "	+
						"notouts=\""	+ mNotOuts	+ "\" "	+	
						"hundreds=\""	+ mHundreds	+ "\" "	+
						"fifties=\""	+ mFifties	+ "\" "	+
						"ducks=\""		+ mDucks	+ "\"";
						
		if (aClose)
		{
			lRet += "/>\n";
		}
		else
		{
			lRet += ">\n";
		}
						
		return (lRet);
	}
}
