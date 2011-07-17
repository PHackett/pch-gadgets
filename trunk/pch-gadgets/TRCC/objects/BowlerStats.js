//------------------------------------------------------------
// Object to hold year stats for a single bowler.
// This is the equivalent of the GGTRCC_BatsmanSummaryO. It's
// called GGTRCC_BowlerStatsO because GGTRCC_BowlerSummaryO
// is the object into which the actual game data is read.
// A bit confusing, I know ..
//
//------------------------------------------------------------
function GGTRCC_BowlerStatsO ()
{
	this.mGames			= 0;
	this.mOvers			= 0.0;
	this.mMaidens		= 0;
	this.mRuns			= 0;
	this.mWickets		= 0;
	this.mFivePlus		= 0;
	
	this.update			= GGTRCC_BowlerStatsO___update;
	this.getAverage		= GGTRCC_BowlerStatsO___getAverage;
	this.getHTMLAverage = GGTRCC_BowlerStatsO___getHTMLAverage;
	this.HTML			= GGTRCC_BowlerStatsO___HTML;
	this.getRunsPerOver	= GGTRCC_BowlerStatsO___getRunsPerOver;
	this.getStrikeRate	= GGTRCC_BowlerStatsO___getStrikeRate;
	
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
	
	this.mOvers 	= TRCCUtils_OversAdd (this.mOvers, parseFloat(aBowlInningsData.mOvers));
	this.mMaidens	+= (aBowlInningsData.mMaidens - 0);
	this.mRuns		+= (aBowlInningsData.mRuns - 0);
	this.mWickets	+= (aBowlInningsData.mWickets - 0);
	
	if ((aBowlInningsData.mWickets - 0) >= 5)
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
	// return (TRCCUtils_getHTMLAverage (this.mWickets, this.mRuns));
	
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
	var lRet="";
	
	lRet += "	<td align='right'>" + this.mGames							+ "</td>";
	lRet += "	<td align='right'>" + GGUtils_numToString (this.mOvers, 1)	+ "</td>";
	lRet += "	<td align='right'>" + this.mMaidens							+ "</td>";
	lRet += "	<td align='right'>" + this.mRuns							+ "</td>";
	lRet += "	<td align='right'>" + this.mWickets							+ "</td>";
	lRet += "	<td align='right'>" + this.mFivePlus						+ "</td>";
	lRet += "	<td align='right'>" + this.getRunsPerOver()					+ "</td>";
	lRet += "	<td align='right'>" + this.getStrikeRate()					+ "</td>";
	lRet += "	<td align='right'>" + this.getHTMLAverage(true)				+ "</td>";
	
	return (lRet);
}


function GGTRCC_BowlerStatsO___getRunsPerOver()
{
	// return (TRCCUtils_RunsPerOver (this.mRuns, this.mOvers));
	
	var lRPO=(this.mRuns/TRCCUtils_OversToBalls (this.mOvers)) * 6;
	return (GGUtils_numToString (lRPO, 2));
}


function GGTRCC_BowlerStatsO___getStrikeRate()
{
	// return (TRCCUtils_getStrikeRate (this.mWickets, this.mOvers));
	
	var lRet="-";
	
	if (this.mWickets > 0)
	{
		var lRPO=(TRCCUtils_OversToBalls (this.mOvers) / this.mWickets);
		
		lRet = GGUtils_numToString (lRPO, 2);
	}
	
	return (lRet);	
}
