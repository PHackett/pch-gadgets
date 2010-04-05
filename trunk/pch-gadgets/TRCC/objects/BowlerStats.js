//------------------------------------------------------------
// Object to hold year stats for a single bowler.
// This is the equivalent of the GGTRCC_BatsmanSummaryO. It's
// called GGTRCC_BowlerStatsO because GGTRCC_BowlerSummaryO
// is the object into which the actual game data is read.
// A bit confusing, I know ..
//
// @param	aName	IN	Name of the bowler
//
//------------------------------------------------------------
function GGTRCC_BowlerStatsO (aName)
{
	this.mName			= aName;
	
	this.mGames			= 0;
	this.mOvers			= 0;
	this.mMaidens		= 0;
	this.mRuns			= 0;
	this.mWickets		= 0;
	this.mFivePlus		= 0;
	
	this.update			= GGTRCC_BowlerStatsO___update;
	this.getAverage		= GGTRCC_BowlerStatsO___getAverage;
	this.getHTMLAverage = GGTRCC_BowlerStatsO___getHTMLAverage;
	this.HTML			= GGTRCC_BowlerStatsO___HTML;
}


//------------------------------------------------------------
// Increment the bowling stats given the information from a
// single game
//
// @param	aBowlInningsData	IN	Data for one innings (GGTRCC_BowlerSummaryO)
//
//------------------------------------------------------------
function GGTRCC_BowlerStatsO___update (aBowlInningsData)
{
	this.mGames++;
	
	this.mOvers 	= TRCCUtils_OversAdd (this.mOvers, aBowlInningsData.Overs);
	this.mMaidens	+= aBowlInningsData.mMaidens;
	this.mRuns		+= aBowlInningsData.mRuns;
	this.mWickets	+= aBowlInningsData.mWickets;
	
	if (aBowlInningsData.mWickets >= 5)
	{
		this.mFivePlus++;
	}
}


//------------------------------------------------------------
//
//------------------------------------------------------------
function GGTRCC_BowlerStatsO___getAverage()
{
	var lRet=0.0;

	if (this.mWickets > 0)
	{
		lRet = this.mRuns / this.mWickets;
	}

	return (lRet);	
}


function GGTRCC_BowlerStatsO___getHTMLAverage()
{
	var lRet="";

	if (this.mWickets > 0)
	{
		// 2 decimal places for HTML
		lRet = GGUtils_numToString (this.getAverage(), 2);
	}
	else
	{
		lRet = "&nbsp;";
	}

	return (lRet);		
}


function GGTRCC_BowlerStatsO___HTML()
{
	var lRet="To be implemented";
	
	
	Return (lRet);
}
