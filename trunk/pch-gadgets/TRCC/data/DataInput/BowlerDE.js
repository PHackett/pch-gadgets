// For inputs of bowler data
var gBowlerDEA=new Array();

function BowlerDE (aForm, aBowlerNameBlurCB, aOversBlurCB, aMdnsBlurCB, aRunsBlurCB, aWicketsChangeCB, aCallbackParam)
{
	this.mForm				= aForm;
	this.mIndex				= gBowlerDEA.length;

	this.mBowlerNameBlurCB	= aBowlerNameBlurCB
	this.mOversBlurCB		= aOversBlurCB;
	this.mMdnsBlurCB		= aMdnsBlurCB;
	this.mRunsBlurCB		= aRunsBlurCB;
	this.mWicketsChangeCB	= aWicketsChangeCB;
	this.mCallbackParam		= aCallbackParam;

	this.mBowlers			= new Array();

	this.mBowlerInput		= new FullNameInput (this.mForm, null, BOWLERDENAMEBLURCB, this.mIndex);
	this.mOversInput		= new OversInput (this.mForm, BOWLERDEOVERSBLURCB, this.mIndex);
	this.mMdnsInput			= new IntegerInput (this.mForm, 0, 40, BOWLERDEMAIDENSSBLURCB, this.mIndex);
	this.mRunsInput			= new IntegerInput (this.mForm, 0, 400, BOWLERDERUNSBLURCB, this.mIndex);
	this.mWktsInput			= new IntegerInput (this.mForm, 0, 10, null, null, BOWLERDEWICKETSCHANGECB, this.mIndex);

	this.HTML				= BowlerDE___HTML;
	this.SetBowlerNames		= BowlerDE___SetBowlerNames;
	this.GetBowlerName		= BowlerDE___GetBowlerName;
	this.GetRuns			= BowlerDE___GetRuns;
	this.GetOvers			= BowlerDE___GetOvers;
	this.GetMaidens			= BowlerDE___GetMaidens;
	this.GetWickets			= BowlerDE___GetWickets;
	this.SetWickets			= BowlerDE___SetWickets;

	this.BowlerNameBlurCB	= BowlerDE___BowlerNameBlurCB;
	this.OversBlurCB		= BowlerDE___OversBlurCB;
	this.MdnsBlurCB			= BowlerDE___MdnsBlurCB;
	this.RunsBlurCB			= BowlerDE___RunsBlurCB;
	this.WktsChangeCB		= BowlerDE___WktsChangeCB;
	this.BowlerNameBlurCB	= BowlerDE___BowlerNameBlurCB;

	this.GenerateData		= BowlerDE___GenerateData;

	gBowlerDEA[this.mIndex]	= this;
}

function BowlerDE___HTML(aNumber)
{
	var lDisplayClass="InputAltLine";

	if (aNumber % 2)
	{
		lDisplayClass = "InputNotAltLine";
		dwln ("<tr class=\"FixtureNotAltLine\">");
	}
	else
	{
		dwln ("<tr class=\"FixtureAltLine\">");
	}

	this.mBowlerInput.SetDisplayClass (lDisplayClass);
	this.mOversInput.SetDisplayClass (lDisplayClass);
	this.mMdnsInput.SetDisplayClass (lDisplayClass);
	this.mRunsInput.SetDisplayClass (lDisplayClass);
	this.mWktsInput.SetDisplayClass (lDisplayClass);

	dwln ("		<td>");
	dwln (			aNumber);
	dwln ("		</td>");

	dwln ("		<td>");
		this.mBowlerInput.HTML();
	dwln ("		</td>");

	dwln ("		<td align='right'>");
		this.mOversInput.HTML();
	dwln ("		</td>");

	dwln ("		<td align='right'>");
		this.mMdnsInput.HTML();
	dwln ("		</td>");

	dwln ("		<td align='right'>");
		this.mRunsInput.HTML();
	dwln ("		</td>");

	dwln ("		<td align='right'>");
		this.mWktsInput.HTML();
	dwln ("		</td>");

	// Trailing space
	dwln ("		<td>&nbsp;</td>");

	dwln ("	</tr>");
}

function BowlerDE___SetBowlerNames (aBowlers)
{
	this.mBowlers = aBowlers;
	this.mBowlerInput.SetPlayers (this.mBowlers);
}

function BowlerDE___GetBowlerName()	
{
	return (this.mBowlerInput.GetName());
}

function BowlerDE___GetRuns()		{	return ((this.mRunsInput.GetValue()  != "")	? this.mRunsInput.GetValue()	: 0);	}
function BowlerDE___GetOvers()		{	return ((this.mOversInput.GetValue() != "")	? this.mOversInput.GetValue()	: 0);	}
function BowlerDE___GetMaidens()	{	return ((this.mMdnsInput.GetValue()  != "")	? this.mMdnsInput.GetValue()	: 0);	}
function BowlerDE___GetWickets()	{	return ((this.mWktsInput.GetValue()  != "")	? this.mWktsInput.GetValue()	: 0);	}
function BowlerDE___SetWickets (aW)
{
	this.mWktsInput.SetValue (aW);

	this.WktsChangeCB();
}

function BowlerDE___GenerateData (aPrefix)
{
	if (this.mBowlerInput.GetName() == "")
	{
		// No bowler info for this batsman
	}
	else
	{
		var lLine=aPrefix + ".addBowler (new Bowler (";

		lLine += "\"" + this.mBowlerInput.GetName() + "\",\t";
		lLine += this.GetOvers()					+ ",\t";
		lLine += this.GetMaidens()					+ ",\t";
		lLine += this.GetRuns()						+ ",\t";
		lLine += this.GetWickets();

		lLine += "));";

		//
		// Add to the output data
		//
		MatchDE_AddLine (lLine);
	}
}

function BowlerDE___OversBlurCB()
{
	var lRet=true;

	if (this.mOversBlurCB != null)
	{
		lRet = this.mOversBlurCB (this.mCallbackParam);
	}

	return (lRet);
}

function BowlerDE___MdnsBlurCB()
{
	var lRet=true;

	if (this.mMdnsInput.GetValue() == "")
	{
		this.mMdnsInput.SetValue ("0");
	}

	if (this.mMdnsBlurCB != null)
	{
		lRet = this.mMdnsBlurCB (this.mCallbackParam);
	}

	return (lRet);
}

function BowlerDE___RunsBlurCB()
{
	var lRet=true;

	if (this.mRunsBlurCB != null)
	{
		lRet = this.mRunsBlurCB (this.mCallbackParam);
	}

	return (lRet);
}

function BowlerDE___WktsChangeCB()
{
	var lRet=true;

	if (this.mWicketsChangeCB != null)
	{
		lRet = this.mWicketsChangeCB (this.mCallbackParam);
	}

	return (lRet);
}

function BowlerDE___BowlerNameBlurCB()
{
	var lRet=true;

	if (this.mBowlerNameBlurCB != null)
	{
		lRet = this.mBowlerNameBlurCB (this.mCallbackParam, this.mIndex);
	}

	return (lRet);
}

function BOWLERDEOVERSBLURCB (aIndex)		{	return (gBowlerDEA[aIndex].OversBlurCB());		}
function BOWLERDEMAIDENSSBLURCB (aIndex)	{	return (gBowlerDEA[aIndex].MdnsBlurCB());		}
function BOWLERDERUNSBLURCB (aIndex)		{	return (gBowlerDEA[aIndex].RunsBlurCB());		}
function BOWLERDEWICKETSCHANGECB (aIndex)	{	return (gBowlerDEA[aIndex].WktsChangeCB());		}
function BOWLERDENAMEBLURCB (aIndex)		{	return (gBowlerDEA[aIndex].BowlerNameBlurCB());	}
