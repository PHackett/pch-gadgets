//------------------------------------------------------------
// Object to hold stats for a single catcher
//
// @param aName 	IN 	The catcher name
//
//------------------------------------------------------------
function GGTRCC_CatcherStatsO (aName)
{
	this.mCatches	= 0;
	this.mName		= aName;
	
	this.increment	= GGTRCC_CatcherStatsO___increment;
}

function GGTRCC_CatcherStatsO___increment()
{
	this.mCatches++;
}
