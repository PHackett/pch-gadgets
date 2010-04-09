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
	
	this.mOvers 	= TRCCUtils_OversAdd (this.mOvers, aBowlInningsData.Overs);
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
	
	lRet += "<td>&nbsp;</td>";
	lRet += "	<td align='left'>"  + this.mName							+ "</td>";
	lRet += "	<td align='right'>" + this.mGames							+ "</td>";
	lRet += "	<td align='right'>" + GGUtils_numToString (this.mOvers, 1)	+ "</td>";
	lRet += "	<td align='right'>" + this.mMaidens							+ "</td>";
	lRet += "	<td align='right'>" + this.mRuns							+ "</td>";
	lRet += "	<td align='right'>" + this.mWickets							+ "</td>";
	lRet += "	<td align='right'>" + this.mFivePlus						+ "</td>";
	lRet += "	<td align='right'>" + this.getRunsPerOver()					+ "</td>";
	lRet += "	<td align='right'>" + this.getStrikeRate()					+ "</td>";
	lRet += "	<td align='right'>" + this.getHTMLAverage(true)				+ "</td>";
	lRet += "<td>&nbsp;</td>";
	
	
	return (lRet);
}


function GGTRCC_BowlerStatsO___getRunsPerOver()
{
	var lRPO=(this.mRuns/TRCCUtils_OversToBalls (this.mOvers)) * 6;
	return (GGUtils_numToString (lRPO, 2));
}


function GGTRCC_BowlerStatsO___getStrikeRate()
{
	var lRet="-";
	
	if (this.mWickets > 0)
	{
		var lRPO=(TRCCUtils_OversToBalls (this.mOvers) / this.mWickets);
		
		lRet = GGUtils_numToString (lRPO, 2);
	}
	
	return (lRet);	
}
