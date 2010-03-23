//-----------------------------------[GGTRCC_BatsmanInningsO]-
// Object to hold stats for a single batsman
//
// @param aName 	IN 	The batsman name
//
//------------------------------------------------------------
function GGTRCC_BatsmanStatsO (aName)
{
	this.mBatterSummary = new GGTRCC_BatsmanInningsO (null);
	this.mGames			= 0;
	this.mName			= aName;
}
