// Entire innings bowling input
var gTeamBowlingDEA=new Array();
var gRTrail=5;
var gNumBowlers=10;

function TeamBowlingDE (aForm, aBowlerNameBlurCB, aBowlerNameBlurCBParam)
{
	this.mForm					= aForm;
	this.mIndex					= gTeamBowlingDEA.length;
	this.mName					= this.mForm + "-TeamBowlingDE-" + this.mIndex;

	this.mBowlerNameBlurCB		= aBowlerNameBlurCB;
	this.mBowlerNameBlurCBParam	= aBowlerNameBlurCBParam;

	//
	// Create the bowlers
	//
	this.mBowlers	= new Array();
	for (var i=0 ; i<gNumBowlers ; i++)
	{
		this.mBowlers[i] = new BowlerDE (this.mForm, 
										TEAMBOWLINGDEBOWLENAMEBLURCB,
										TEAMBOWLINGDEOVERSBLURCB, 
										TEAMBOWLINGDEMAIDENSSBLURCB, 
										TEAMBOWLINGDERUNSBLURCB, 
										TEAMBOWLINGDEWICKETSCHANGECB,
										this.mIndex);
	}

	this.HTML					= TeamBowlingDE___HTML;
	this.SetBowlerNames			= TeamBowlingDE___SetBowlerNames;
	this.GetBowlersAsPlayers	= TeamBowlingDE___GetBowlersAsPlayers;

	this.GetBowlerName			= TeamBowlingDE___GetBowlerName;
	this.SetWicketsForBowler	= TeamBowlingDE___SetWicketsForBowler;

	this.SetTotalOvers			= TeamBowlingDE___SetTotalOvers;
	this.SetTotalMaidens		= TeamBowlingDE___SetTotalMaidens;
	this.SetTotalRuns			= TeamBowlingDE___SetTotalRuns;
	this.SetTotalWickets		= TeamBowlingDE___SetTotalWickets;
	this.SetTotalValue			= TeamBowlingDE___SetTotalValue;

	this.GetOversID				= TeamBowlingDE___GetOversID;
	this.GetMaidensID			= TeamBowlingDE___GetMaidensID;
	this.GetRunsID				= TeamBowlingDE___GetRunsID;
	this.GetWicketsID			= TeamBowlingDE___GetWicketsID;

	this.GetOversBowled			= TeamBowlingDE___GetOversBowled;
	this.GetMaidensBowled		= TeamBowlingDE___GetMaidensBowled;
	this.GetRunsScord			= TeamBowlingDE___GetRunsScord;
	this.GetWicketsTaken		= TeamBowlingDE___GetWicketsTaken;

	this.BowlerNameBlurCB		= TeamBowlingDE___BowlerNameBlurCB;
	this.OversBlurCB			= TeamBowlingDE___OversBlurCB;
	this.MaidensBlurCB			= TeamBowlingDE___MaidensBlurCB;
	this.RunsBlurCB				= TeamBowlingDE___RunsBlurCB;
	this.WicketsChangeCB		= TeamBowlingDE___WicketsChangeCB;

	this.GenerateData			= TeamBowlingDE___GenerateData;

	gTeamBowlingDEA[this.mIndex] = this;
}

function TeamBowlingDE___HTML()
{
	dwln ("<table width='100%'cellspacing='0' cellpadding='2' border='0'>");

	//
	// Heading
	//
	dwln ("	<tr class=\"BatsHeader\">");
	dwln ("		<th>&nbsp;</th>"					+ 
				"<th align='left'>Bowler <font size='1'>(Surname, Firstname)<font></th>"		+ 
				"<th align='right'>Overs</th>"		+
				"<th align='right'>Maidens</th>"	+
				"<th align='right'>Runs</th>"		+
				"<th align='right'>Wickets</th>"	+
				"<th width='" + gRTrail + "'>&nbsp;</th>");
	dwln ("	</tr>");


	for (var i=0 ; i<gNumBowlers ; i++)
	{
		this.mBowlers[i].HTML (i+1);
	}

	//
	// Trailing line for the totals
	//
	if (gNumBowlers % 2)
	{
		dwln ("<tr class=\"FixtureAltLine\">");
	}
	else
	{
		dwln ("<tr>");
	}

	dwln ("	<td>");
	dwln ("&nbsp;");
	dwln ("	</td>");

	dwln ("	<td align='right'>");
	dwln ("<span class='TotalsReadOnly'>Totals</span>");
	dwln ("	</td>");

	// Overs
	dwln ("	<td align='right'>");
	dwln ("<span class='TotalsReadOnly' id='" + this.GetOversID() + "'>&nbsp;</span>");
	dwln ("	</td>");

	// Maidens
	dwln ("	<td align='right'>");
	dwln ("<span class='TotalsReadOnly' id='" + this.GetMaidensID() + "'>&nbsp;</span>");
	dwln ("	</td>");

	// Runs
	dwln ("	<td align='right'>");
	dwln ("<span class='TotalsReadOnly' id='" + this.GetRunsID() + "'>&nbsp;</span>");
	dwln ("	</td>");

	// Wickets
	dwln ("	<td align='right'>");
	dwln ("<span class='TotalsReadOnly' id='" + this.GetWicketsID() + "'>&nbsp;</span>");
	dwln ("	</td>");

	// Padding
	dwln ("	<td>");
	dwln ("&nbsp;");
	dwln ("	</td>");

	dwln ("</tr>");

	dwln ("</table>");
}

function TeamBowlingDE___GetBowlerName (aIndex)
{
	return (gBowlerDEA[aIndex].GetBowlerName());
}

function TeamBowlingDE___SetWicketsForBowler (aIndex, aWickets)
{
	gBowlerDEA[aIndex].SetWickets (aWickets);
}

function TeamBowlingDE___SetBowlerNames (aBowlers)
{
	for (var i=0 ; i<gNumBowlers ; i++)
	{
		this.mBowlers[i].SetBowlerNames (aBowlers);
	}
}

function TeamBowlingDE___GetBowlersAsPlayers()
{
	var lRet=new Array();

	for (var i=0 ; i<gNumBowlers ; i++)
	{
		var lBowlerName=this.mBowlers[i].GetBowlerName();

		if (lBowlerName != "")
		{
			lRet[lRet.length] = new Player (lBowlerName);
		}
	}

	return (lRet);
}


function TeamBowlingDE___GenerateData (aPrefix)
{
	for (var i=0 ; i<gNumBowlers ; i++)
	{
		this.mBowlers[i].GenerateData (aPrefix);
	}
}

function TeamBowlingDE___GetOversID()	{	return (this.mName + "-total-overs-");		}
function TeamBowlingDE___GetMaidensID()	{	return (this.mName + "-total-maidens-");	}
function TeamBowlingDE___GetRunsID()	{	return (this.mName + "-total-runs-");		}
function TeamBowlingDE___GetWicketsID()	{	return (this.mName + "-total-wickets-");	}

function TeamBowlingDE___SetTotalOvers (aVal)		{	this.SetTotalValue (this.GetOversID(), aVal);	}
function TeamBowlingDE___SetTotalMaidens (aVal)		{	this.SetTotalValue (this.GetMaidensID(), aVal);	}
function TeamBowlingDE___SetTotalRuns (aVal)		{	this.SetTotalValue (this.GetRunsID(), aVal);	}
function TeamBowlingDE___SetTotalWickets (aVal)		{	this.SetTotalValue (this.GetWicketsID(), aVal);	}

function TeamBowlingDE___SetTotalValue (aID, aVal)	{	document.getElementById(aID).innerHTML = aVal;	}


function TeamBowlingDE___GetOversBowled()
{
	var lRet=0;

	for (var i=0 ; i<gNumBowlers ; i++)
	{
		lRet = OversAdd (lRet, (this.mBowlers[i].GetOvers() - 0));
	}

	return (lRet);
}

function TeamBowlingDE___GetMaidensBowled()
{
	var lRet=0;

	for (var i=0 ; i<gNumBowlers ; i++)
	{
		lRet += this.mBowlers[i].GetMaidens() - 0;
	}

	return (lRet);
}

function TeamBowlingDE___GetRunsScord()
{
	var lRet=0;

	for (var i=0 ; i<gNumBowlers ; i++)
	{
		lRet += this.mBowlers[i].GetRuns() - 0;
	}

	return (lRet);
}

function TeamBowlingDE___GetWicketsTaken()
{
	var lRet=0;

	for (var i=0 ; i<gNumBowlers ; i++)
	{
		lRet += this.mBowlers[i].GetWickets() - 0;
	}

	return (lRet);
}

function TeamBowlingDE___BowlerNameBlurCB (aBowlerI)
{
	var lRet=true;

	if (this.mBowlerNameBlurCB != null)
	{
		lREt = this.mBowlerNameBlurCB (this.mBowlerNameBlurCBParam, aBowlerI);
	}

	return (lRet);
}

function TeamBowlingDE___OversBlurCB()					{	this.SetTotalOvers (this.GetOversBowled());	}
function TeamBowlingDE___MaidensBlurCB()				{	this.SetTotalMaidens (this.GetMaidensBowled());	}
function TeamBowlingDE___RunsBlurCB()					{	this.SetTotalRuns (this.GetRunsScord());	}
function TeamBowlingDE___WicketsChangeCB()				{	this.SetTotalWickets (this.GetWicketsTaken());	}

function TEAMBOWLINGDEBOWLENAMEBLURCB (aIndex, aBowlerI)	{	return (gTeamBowlingDEA[aIndex].BowlerNameBlurCB(aBowlerI));	}
function TEAMBOWLINGDEOVERSBLURCB (aIndex)					{	return (gTeamBowlingDEA[aIndex].OversBlurCB());					}
function TEAMBOWLINGDEMAIDENSSBLURCB (aIndex)				{	return (gTeamBowlingDEA[aIndex].MaidensBlurCB());				}
function TEAMBOWLINGDERUNSBLURCB (aIndex)					{	return (gTeamBowlingDEA[aIndex].RunsBlurCB());					}
function TEAMBOWLINGDEWICKETSCHANGECB (aIndex)				{	return (gTeamBowlingDEA[aIndex].WicketsChangeCB());				}

