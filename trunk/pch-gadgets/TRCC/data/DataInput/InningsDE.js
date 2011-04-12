// Input for a whole innings
var gInningsDEA=new Array();

function InningsDE (aForm)
{
	this.mForm					= aForm;
	this.mIndex					= gInningsDEA.length;
	this.mName					= this.mForm + "-InningsDE-" + this.mIndex;

	this.mBattingDE				= new TeamBatingDE (this.mForm, INNINGSDE_BAT_BOWLERBLURCB, this.mIndex);
	this.mBowlingDE				= new TeamBowlingDE (this.mForm, INNINGSDE_BWL_BOWLERBLURCB, this.mIndex);

	this.IsTRCC					= false;
	this.IsFirstInnings			= (this.mIndex == 0);

	this.HTML					= InningsDE___HTML;
	this.Setplayers				= InningsDE___Setplayers;
	this.SetIsTRCC				= InningsDE___SetIsTRCC;
	this.GetOppoPlayers			= InningsDE___GetOppoPlayers;
	this.BattingBowlerBlurCB	= InningsDE___BattingBowlerBlurCB;
	this.BowlingBowlerBlurCB	= InningsDE___BowlingBowlerBlurCB;

	this.GenerateData			= InningsDE___GenerateData;
	this.GetDataPrefix			= InningsDE___GetDataPrefix;

	gInningsDEA[this.mIndex] = this;
}

function InningsDE___HTML()
{
	this.mBattingDE.HTML();

	dwln ("<br>");

	this.mBowlingDE.HTML();
}

function InningsDE___Setplayers (aBatters, aBowlers)
{
	this.mBattingDE.SetPlayerNames (aBatters, aBowlers);
	this.mBowlingDE.SetBowlerNames (aBowlers);
}

function InningsDE___SetIsTRCC (aIs)
{
	this.IsTRCC = aIs;

	if (this.IsTRCC == null)
	{
		this.IsTRCC = true;
	}

	this.mBattingDE.SetIsTRCC (this.IsTRCC);
}

function InningsDE___GetOppoPlayers()
{
	var lRet;

	if (this.IsTRCC)
	{
		lRet = this.mBowlingDE.GetBowlersAsPlayers();
	}
	else
	{
		lRet = this.mBattingDE.GetBatsmenAsPlayers();
	}

	return (lRet);
}

function InningsDE___GenerateData()
{
	//
	// Batting
	//
	MatchDE_AddLine ("//");
	MatchDE_AddLine ("// Innings of " + ((this.IsTRCC) ? "TRCC" : "Opposition"));
	MatchDE_AddLine ("//");
	this.mBattingDE.GenerateData (this.GetDataPrefix());
	MatchDE_AddLine ("");

	//
	// Bowling
	//
	MatchDE_AddLine ("//");
	MatchDE_AddLine ("// Bowling of " + ((!this.IsTRCC) ? "TRCC" : "Opposition"));
	MatchDE_AddLine ("//");
	this.mBowlingDE.GenerateData (this.GetDataPrefix (true));


	//
	// Not forgetting the extras ...
	//
	MatchDE_AddLine ("//");
	MatchDE_AddLine ("// Extras for the batting side ...");
	MatchDE_AddLine ("//");
	MatchDE_AddLine (this.GetDataPrefix() + ".mExtras = " + this.mBattingDE.GetExtras() + ";");

}

function InningsDE___GetDataPrefix (aForBowler)
{
	var lRet="lTRCC";

	if (this.IsTRCC && (aForBowler != null))
	{
		lRet = "lOppo";
	}
	else if (!this.IsTRCC && (aForBowler == null))
	{
		lRet = "lOppo";
	}

	return (lRet);
}

//
// This callback is invoked when we "blur" from a bowlers first name, where 
// that bowlers name is being input into a batsmanDE!
// The purpose of this is to allow us to add players to the opposition players
// array when TRCC bat first
//
function InningsDE___BattingBowlerBlurCB()
{
	var lRet=true;

	//
	// Is this TRCC batting in the first innings?
	//
	if (this.IsTRCC && this.IsFirstInnings)
	{
		//
		// We potentially have another opposition player here ....
		//
		var lOppoPlayers=this.mBattingDE.GetBowlersAsPlayers();

		this.mBattingDE.SetPlayerNames (null, lOppoPlayers);
		this.mBowlingDE.SetBowlerNames (lOppoPlayers);
	}

	return (lRet);
}

function InningsDE___BowlingBowlerBlurCB (aBowlerIndex)
{
	var lRet=true;

	//
	// What is the name of the bowler in question?
	//
	var lName = this.mBowlingDE.GetBowlerName (aBowlerIndex);

	if ((lName != null) && (lName != ""))
	{
		//
		// How many wickets has this bowler taken?
		//
		var lW=this.mBattingDE.WicketsForBowler (lName);

		//
		// Set this as the value in the bowling stats
		//
		this.mBowlingDE.SetWicketsForBowler (aBowlerIndex, lW);
	}

	return (lRet);
}

function INNINGSDE_BAT_BOWLERBLURCB (aIndex)			{	return (gInningsDEA[aIndex].BattingBowlerBlurCB());	}
function INNINGSDE_BWL_BOWLERBLURCB (aIndex, aBowler)	{	return (gInningsDEA[aIndex].BowlingBowlerBlurCB(aBowler));	}
