// Entire innings batting input
var gTeamBatingDEA=new Array();
var gNumBatsmen=11;

var gRTrail=5;

function TeamBatingDE (aForm, aBowlerBlurCB, aBowlerBlurCBParam)
{
	this.mForm				= aForm;
	this.mIndex				= gTeamBatingDEA.length;
	this.mName				= this.mForm + "-TeamBatingDE-" + this.mIndex;
	this.mIsTRCCInnings		= false;

	this.mBowlerBlurCB		= aBowlerBlurCB;
	this.mBowlerBlurCBParam	= aBowlerBlurCBParam;

	//
	// Create the batsmen
	//
	this.mBatsmen			= new Array();
	for (var i=0 ; i<gNumBatsmen ; i++)
	{
		this.mBatsmen[i] = new BatsmanDE (this.mForm, 
											RUNSCHANGECB, this.mIndex, 
											TEAMBATTINGBOWLERBLURCB, this.mIndex);
	}

	//
	// Fall of wickets
	//
	this.mFOW					= new FOWDE (this.mForm);

	//
	// Extras
	//
	this.mExtrasInput			= new IntegerInput (this.mForm, 0, 100, RUNSCHANGECB, this.mIndex);

	this.HTML					= TeamBatingDE___HTML;
	this.SetPlayerNames			= TeamBatingDE___SetPlayerNames;
	this.GetBatsmenAsPlayers	= TeamBatingDE___GetBatsmenAsPlayers;
	this.GetBowlersAsPlayers	= TeamBatingDE___GetBowlersAsPlayers;
	this.CalcTotalRuns			= TeamBatingDE___CalcTotalRuns;
	this.CalcTotalWkts			= TeamBatingDE___CalcTotalWkts;
	this.GetTotalID				= TeamBatingDE___GetTotalID;
	this.GetWktsID				= TeamBatingDE___GetWktsID;
	this.GetExtras				= TeamBatingDE___GetExtras;
	this.WicketsForBowler		= TeamBatingDE___WicketsForBowler;
	this.SetIsTRCC				= TeamBatingDE___SetIsTRCC;

	this.RunsChangedCB			= TeamBatingDE___RunsChangedCB;
	this.BowlerBlurCB			= TeamBatingDE___BowlerBlurCB;

	this.GenerateData			= TeamBatingDE___GenerateData;

	gTeamBatingDEA[this.mIndex] = this;
}

function TeamBatingDE___HTML()
{
	dwln ("<table width='100%'cellspacing='0' cellpadding='2' border='0'>");

	//
	// Heading
	//
	dwln ("	<tr class=\"BatsHeader\">");
	dwln ("		<th>&nbsp;</th>"	+
				"<th align='left'>Batsman <font size='1'>(Surname, Firstname)<font></th>"	+
				"<th align='left'>How Out</th>"	+
				"<th align='left'>Bowler <font size='1'>(Surname, Firstname)<font></th>"	+
				"<th align='right'>Runs</th>"	+
				"<th width='" + gRTrail + "'>&nbsp;</th>");
	dwln ("	</tr>");
	

	for (var i=0 ; i<gNumBatsmen ; i++)
	{
		this.mBatsmen[i].HTML (i+1);
	}

	//
	// Now space for the extras
	//
	this.mExtrasInput.SetDisplayClass ("InputAltLine");

	dwln ("	<tr>");
	dwln ("		<td colspan='3'>&nbsp;</td>");
	dwln ("		<td class=\"FixtureAltLine\">Extras</td>");
	dwln ("		<td align='right' class=\"FixtureAltLine\">");
		this.mExtrasInput.HTML();
	dwln ("		</td>");
	dwln ("		<td class=\"FixtureAltLine\">&nbsp;</td>");
	dwln ("	</tr>");

	//
	// Now space for the total
	//
	dwln ("	<tr>");
	dwln ("		<td colspan='3'>&nbsp;</td>");
	dwln ("		<td class=\"FixtureAltLine\"><span  class='TotalsReadOnly'>Total</span></td>");
	dwln ("		<td align='right' class=\"FixtureAltLine\"><span class='TotalsReadOnly' id='" + this.GetTotalID() + "'>0</span></td>");
	dwln ("		<td class=\"FixtureAltLine\">&nbsp;</td>");
	dwln ("	</tr>");

	//
	// And space for the wickets
	//
	dwln ("	<tr>");
	dwln ("		<td colspan='3'>&nbsp;</td>");
	dwln ("		<td class=\"FixtureAltLine\"><span  class='TotalsReadOnly'>Wickets</span></td>");
	dwln ("		<td align='right' class=\"FixtureAltLine\"><span class='TotalsReadOnly' id='" + this.GetWktsID() + "'>0</span></td>");
	dwln ("		<td class=\"FixtureAltLine\">&nbsp;</td>");
	dwln ("	</tr>");

	dwln ("</table>");

	//
	// And now, optionally, the fall of wickets
	//
//	if (gItsMe)		// From the index.html page
	{
		dwln ("<br>");
		this.mFOW.HTML();
		dwln ("<br>");
	}
}

function TeamBatingDE___SetPlayerNames (aBatters, aBowlers)
{
	for (var i=0 ; i<gNumBatsmen ; i++)
	{
		this.mBatsmen[i].SetPlayerNames (aBatters, aBowlers);
	}
}

function TeamBatingDE___GetBatsmenAsPlayers()
{
	var lRet=new Array();

	for (var i=0 ; i<gNumBatsmen ; i++)
	{
		var lBatterName=this.mBatsmen[i].GetBatterName ();

		if (lBatterName != "")
		{
			lRet[lRet.length] = new Player (lBatterName);
		}
	}

	return (lRet);
}

function TeamBatingDE___GetBowlersAsPlayers()
{
	var lRet=new Array();

	for (var i=0 ; i<gNumBatsmen ; i++)
	{
		var lBowlerName=this.mBatsmen[i].GetBowlerName ();

		if (lBowlerName != "")
		{
			lRet[lRet.length] = new Player (lBowlerName);
		}
	}

	return (lRet);
}

function TeamBatingDE___CalcTotalRuns()
{
	var lRuns=0;
	for (var i=0 ; i<gNumBatsmen ; i++)
	{
		lRuns += this.mBatsmen[i].GetRuns() - 0;
	}

	//
	// Add the extras
	//
	lRuns += this.mExtrasInput.GetValue() - 0;

	//
	// Set on the screen
	//
	document.getElementById(this.GetTotalID()).innerHTML = lRuns;
}

function TeamBatingDE___CalcTotalWkts()
{
	var lWkts=0;

	for (var i=0 ; i<gNumBatsmen ; i++)
	{
		lWkts += (this.mBatsmen[i].IsOut()) ? 1 : 0;
	}

	document.getElementById(this.GetWktsID()).innerHTML = lWkts;
}


function TeamBatingDE___GetExtras()
{
	return (this.mExtrasInput.GetValue() - 0);
}

function TeamBatingDE___GenerateData (aPrefix)
{
	for (var i=0 ; i<gNumBatsmen ; i++)
	{
		this.mBatsmen[i].GenerateData (aPrefix);
	}

	this.mFOW.GenerateData (aPrefix);
}

function TeamBatingDE___WicketsForBowler (aBowlerName)
{
	var lRet=0;

	for (var i=0 ; i<gNumBatsmen ; i++)
	{
		if (this.mBatsmen[i].GetBowlerName() == aBowlerName)
		{
			lRet++;
		}
	}

	return (lRet);
}

function TeamBatingDE___SetIsTRCC (aIs)
{
	this.mIsTRCCInnings = aIs;

	if (this.mIsTRCCInnings == null)
	{
		this.mIsTRCCInnings = true;
	}

	//
	// Tell the individual batter inputs who we are
	//
	for (var i=0 ; i<gNumBatsmen ; i++)
	{
		this.mBatsmen[i].SetIsTRCC (this.mIsTRCCInnings);
	}
}

function TeamBatingDE___GetTotalID()
{
	return (this.mName + "-total-");
}

function TeamBatingDE___GetWktsID()
{
	return (this.mName + "-wkts-");
}

function TeamBatingDE___RunsChangedCB()
{
	this.CalcTotalRuns();
	this.CalcTotalWkts();
	return (true);
}

function TeamBatingDE___BowlerBlurCB()
{
	var lRet=true;

	if (this.mBowlerBlurCB != null)
	{
		lRet = this.mBowlerBlurCB (this.mBowlerBlurCBParam);
	}

	return (lRet);
}

function RUNSCHANGECB (aIndex)
{
	return (gTeamBatingDEA[aIndex].RunsChangedCB());
}

function TEAMBATTINGBOWLERBLURCB (aIndex)
{
	return (gTeamBatingDEA[aIndex].BowlerBlurCB());
}