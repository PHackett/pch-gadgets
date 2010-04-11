//------------------------------------------------------------
// Object to hold stats for a single catcher
//
//------------------------------------------------------------
function GGTRCC_CatcherStatsO ()
{
	this.mCatches	= 0;
	this.mCandB		= 0;
	
	this.increment	= GGTRCC_CatcherStatsO___increment;
}

function GGTRCC_CatcherStatsO___increment(aIsCaughtAndBowled)
{
	this.mCatches++;
	
	if (aIsCaughtAndBowled)
	{
		this.mCandB++;
	}
}
