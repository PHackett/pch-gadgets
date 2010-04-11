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
	this.mBowlerStats 		= new GGTRCC_BowlerStatsO ();
	this.mCatcherStats		= new GGTRCC_CatcherStatsO();
	
	this.batsmanHTML	= GGTRCC_PlayerStatsO___batsmanHTML;
	this.bowlerHTML		= GGTRCC_PlayerStatsO___bowlerHTML;
	this.catcherHTML	= GGTRCC_PlayerStatsO___catcherHTML;
	
}

function GGTRCC_PlayerStatsO___batsmanHTML()
{
	var lHTML="";
	
	lHTML += "	<td>&nbsp;</td>";

	lHTML += "	<td align='left'>"  + this.mName						+ "</td>";
	
	lHTML += this.mBatsmanSummary.HTML();
	
	lHTML += "	<td>&nbsp;</td>";
	
	return (lHTML);
}


function GGTRCC_PlayerStatsO___bowlerHTML()
{
	var lHTML="";
	
	lHTML += "	<td>&nbsp;</td>";

	lHTML += "	<td align='left'>"  + this.mName						+ "</td>";
	
	lHTML += this.mBowlerStats.HTML();
	
	lHTML += "	<td>&nbsp;</td>";
	
	return (lHTML);
}


function GGTRCC_PlayerStatsO___catcherHTML()
{
	var lHTML="";
	
	lHTML += "	<td>&nbsp;</td>";

	lHTML += "	<td align='left'>"  + this.mName						+ "</td>";
	
	lHTML += this.mCatchererStats.HTML();
	
	lHTML += "	<td>&nbsp;</td>";
	
	return (lHTML);
}
