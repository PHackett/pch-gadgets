//------------------------------------------------------------
// Object to hold stats for a single player
//
// @param aName 	IN 	The player name
//
//------------------------------------------------------------
function GGTRCC_PlayerStatsO (aName)
{
	this.mName			= aName;

	this.mBatsmanSummary 	= new GGTRCC_BatsmanSummaryO();
	// this.mBowlerSummary 	= new GGTRCC_BowlerSummaryO (null);
	// this.mCatcherSummary	= new GGTRCC_CatcherStatsO();
	
	this.batsmanHTML		= GGTRCC_PlayerStatsO___batsmanHTML;
	
}

function GGTRCC_PlayerStatsO___batsmanHTML()
{
	var lHTML="";
	
	lHTML += "	<td>&nbsp;</td>";
	lHTML += "	<td align='left'>"  + this.mName						+ "</td>";
	
	lHTML += this.mBatsmanSummary.HTML();
	
	return (lHTML);
}
