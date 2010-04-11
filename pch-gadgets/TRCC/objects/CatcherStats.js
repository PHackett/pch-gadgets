//------------------------------------------------------------
// Object to hold stats for a single catcher
//
//------------------------------------------------------------
function GGTRCC_CatcherStatsO ()
{
	this.mCatches	= 0;
	this.mCandB		= 0;
	
	this.update	= GGTRCC_CatcherStatsO___update;
}

function GGTRCC_CatcherStatsO___update (aIsCaughtAndBowled)
{
	this.mCatches++;
	
	if (aIsCaughtAndBowled)
	{
		this.mCandB++;
	}
}
