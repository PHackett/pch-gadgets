//------------------------------------------------------------
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
	
	this.increment		= GGTRCC_BowlerStatsO___increment;
}


//------------------------------------------------------------
// Increment the bowling stats given the information from a
// single game
//
// @param	aBowlInningsData	IN	Data for one innings
//
//------------------------------------------------------------
function GGTRCC_BowlerStatsO___increment (aBowlInningsData)
{
	//
	// @todo
	//
}
