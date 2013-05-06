import org.w3c.dom.Element;


public class BatterSummary 
{

	int		mInnings;
	int		mRuns;
	int		mNotOuts;
	int		mHundreds;
	int		mFifties;
	int		mDucks;
	int		mYear;			// This is used during the production of the all-time
							//  spreadsheets to hold the last year for which we have
							//  data for this player
	
	public BatterSummary ()
	{
		mInnings	= 0;
		mRuns		= 0;
		mNotOuts	= 0;
		mHundreds	= 0;
		mFifties	= 0;
		mDucks		= 0;
		mYear		= 1970;
	}

	public int		Innings()	{ return (mInnings);	}
	public int		Runs()		{ return (mRuns);		}
	public int		NotOuts()	{ return (mNotOuts);	}
	public int		Hundreds()	{ return (mHundreds);	}
	public int		Fifties()	{ return (mFifties);	}
	public int		Ducks()		{ return (mDucks);		}
	public int		Year()		{ return (mYear);		}

	
	public void IncInnings ()			{ mInnings++;		}
	public void IncInnings (int aI)	{ mInnings += aI;	}
	public void IncRuns (int aR)		{ mRuns += aR;		}
	public void IncNotouts ()			{ mNotOuts++;		}
	public void IncNotouts (int aN)	{ mNotOuts += aN;	}
	public void IncHundreds ()			{ mHundreds++;		}
	public void IncHundreds (int aH)	{ mHundreds += aH;	}
	public void IncFifties ()			{ mFifties++;		}
	public void IncFifties (int aF)	{ mFifties += aF;	}
	public void IncDucks ()			{ mDucks++;			}
	public void IncDucks (int aD)		{ mDucks += aD;		}
	public void SetYear (int aY)		{ mYear = aY;		}
	
	
	public void Add (BatterSummary aBS)
	{
		IncInnings(aBS.Innings());
		IncRuns (aBS.Runs());
		IncNotouts(aBS.NotOuts());
		IncHundreds(aBS.Hundreds());
		IncFifties(aBS.Fifties());
		IncDucks(aBS.Ducks());
	}
	
	
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
			lRet += "/>";
		}
		else
		{
			lRet += ">";
		}
						
		return (lRet);
	}
}
