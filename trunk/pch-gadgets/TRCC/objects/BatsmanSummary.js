//------------------------------------------------------------
// Object to hold sumamry information on a single batsman.
//
// @param aBowlerXML 	IN 	The bowler XML node
//
//------------------------------------------------------------
function GGTRCC_BatsmanSummaryO (aName)
{
	this.mGames			= 0;
	this.Innings		= 0;
	this.mNotOuts		= 0;
	this.mRuns			= 0;
	this.mMaxRuns		= 0;
	this.m50s			= 0;
	this.m100s			= 0;
	this.mDucks			= 0;
	this.mMaxRunsNotOut = false;
	
	this.update = GGTRCC_BatsmanSummaryO___update;
}


//------------------------------------------------------------
// Updatye the object from the given GGTRCC_BatsmanInningsO
//------------------------------------------------------------
function GGTRCC_BatsmanSummaryO___update (aBatsmanInningsO)
{
	this.mGames++;
	
	if (null == aBatsmanInningsO.mHowOut)
	{
		// Did not bat
	}
	else
	{
		var lRuns	= 0 + aBatsmanInningsO.mRuns;
		var lNotOut	= false;
		
		this.Innings++;
		
		if (aBatsmanInningsO.mHowOut == "Not Out")
		{
			this.mNotOuts++;
			lNotOut = true;
		}
		else if (0 == lRuns)
		{
			this.mDucks++;
		}
		
		this.mRuns += lRuns;
		
		if (this.mMaxRuns < lRuns)
		{
			this.mMaxRuns		= lRuns;
			this.mMaxRunsNotOut	= lNotOut;
		}
		
		if (lRuns > 100)
		{
			this.m100s++;
		}
		else if (lRuns > 50)
		{
			this.m50s++;
		}
	}
}