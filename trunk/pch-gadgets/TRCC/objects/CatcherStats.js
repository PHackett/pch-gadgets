//------------------------------------------------------------
// Object to hold stats for a single catcher
//
//------------------------------------------------------------
function GGTRCC_CatcherStatsO ()
{
	this.mCatches	= 0;
	this.mCandB		= 0;
	
	this.update	= GGTRCC_CatcherStatsO___update;
	this.HTML	= GGTRCC_CatcherStatsO___HTML;
}

function GGTRCC_CatcherStatsO___update (aIsCaughtAndBowled)
{
	this.mCatches++;
	
	if (aIsCaughtAndBowled)
	{
		this.mCandB++;
	}
}


function GGTRCC_CatcherStatsO___HTML()
{
	var lHTML="";
	
	lHTML += "	<td align='right'>" + this.mCatches		+ "</td>";
	lHTML += "	<td align='right'>" + this.mCandB		+ "</td>";
	
	return (lHTML);
}
