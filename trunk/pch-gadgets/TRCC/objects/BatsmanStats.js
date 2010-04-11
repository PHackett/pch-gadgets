//
// This FILE IS NOT USED
//

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

	this.increment		= GGTRCC_BatsmanStatsO___increment;
}


//------------------------------------------------------------
// Increment the batting stats given the information from a
// single game
//
// @param	aBatInningsData	IN	Data for one innings (GGTRCC_BatsmanInningsO)
//
//------------------------------------------------------------
function GGTRCC_BatsmanStatsO___increment (aBatInningsData)
{
	//
	// @todo
	//
}
