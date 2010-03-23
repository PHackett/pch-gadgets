//------------------------------------[GGTRCC_BowlerSummaryO]-
// Object to hold year stats for a single bowler
//
// @param	aName	IN	Name of the bowler
//
//------------------------------------------------------------
function GGTRCC_BowlerStatsO (aName)
{
	this.mBowlerSummary = new GGTRCC_BowlerSummaryO (null);
	this.mGames			= 0;
	this.mName			= aName;
}

