//------------------------------------------------------------
// Object to hold stats for a single keeper
//
//------------------------------------------------------------
function GGTRCC_KeeperStatsO ()
{
	this.mGames		= 0;	// Number of games as keeper
	this.mCatches	= 0;
	this.mStumpings	= 0;
	
	this.incGames		= GGTRCC_KeeperStatsO___incGames;
	this.incCatches		= GGTRCC_KeeperStatsO___incCatches;
	this.incStumpings	= GGTRCC_KeeperStatsO___incStumpings;
	this.HTML			= GGTRCC_KeeperStatsO___HTML;
}

function GGTRCC_KeeperStatsO___incGames ()
{
	this.mGames++;
}

function GGTRCC_KeeperStatsO___incCatches ()
{
	this.mCatches++;
}

function GGTRCC_KeeperStatsO___incStumpings ()
{
	this.mStumpings++;
}


function GGTRCC_KeeperStatsO___HTML()
{
	var lHTML="";
	
	lHTML += "	<td align='right'>" + this.mGames		+ "</td>";
	lHTML += "	<td align='right'>" + this.mCatches		+ "</td>";
	lHTML += "	<td align='right'>" + this.mStumpings	+ "</td>";
	
	return (lHTML);
}
