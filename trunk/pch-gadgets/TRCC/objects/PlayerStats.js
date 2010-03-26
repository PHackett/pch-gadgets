//------------------------------------------------------------
// Object to hold stats for a single player
//
// @param aName 	IN 	The player name
//
//------------------------------------------------------------
function GGTRCC_PlayerStatsO (aName)
{
	this.mName			= aName;
	this.mGames			= 0;

	// this.mBatterSummary 	= new GGTRCC_BatsmanInningsO (null);
	// this.mBowlerSummary 	= new GGTRCC_BowlerSummaryO (null);
	this.mCatcherSummary	= new GGTRCC_CatcherStatsO();

	this.getCatcherSummary	= GGTRCC_PlayerStatsO___getCatcherSummary;
}

function GGTRCC_PlayerStatsO___getCatcherSummary()	{ return (this.getCatcherSummary);	}
