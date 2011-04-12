// For inputs of batsman data
var gBatsmanDEA=new Array();

function BatsmanDE (aForm, aRunsChangeCB, aRunsChangeCBParam, aBowlerBlurCB, aBowlerBlurCBParam)
{
	this.mForm				= aForm;
	this.mRunsChangeCB		= aRunsChangeCB;
	this.mRunsChangeCBParam	= aRunsChangeCBParam;
	this.mBowlerBlurCB		= aBowlerBlurCB;
	this.mBowlerBlurCBParam	= aBowlerBlurCBParam;
	this.mIndex				= gBatsmanDEA.length;
	this.mIsTRCCBatter		= false;
	this.mBatsmen			= new Array();
	this.mBowlers			= new Array();

	this.mBatterInput		= new FullNameInput (this.mForm);
	this.mHOInput			= new HowOutInput (this.mForm);
	this.mBowlerInput		= new FullNameInput (this.mForm, null, BOWLERBLURCB, this.mIndex);
	this.mRunsInput			= new IntegerInput (this.mForm, 0, 400, BATSMANRUNSBLURCB, this.mIndex);
	this.HTML				= BatsmanDE___HTML;
	this.SetPlayerNames		= BatsmanDE___SetPlayerNames;
	this.GetBatterName		= BatsmanDE___GetBatterName;
	this.GetHowOut			= BatsmanDE___GetHowOut;
	this.IsOut				= BatsmanDE___IsOut;
	this.GetBowlerName		= BatsmanDE___GetBowlerName;
	this.GetRuns			= BatsmanDE___GetRuns;
	this.SetIsTRCC			= BatsmanDE___SetIsTRCC;

	this.RunsChangeCB		= BatsmanDE___RunsChangeCB;
	this.BowlerBlurCB		= BatsmanDE___BowlerBlurCB;

	this.GenerateData		= BatsmanDE___GenerateData;

	gBatsmanDEA[this.mIndex]	= this;
}

function BatsmanDE___HTML(aNumber)
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

//if (3 == aNumber)
//{
//alert ("lDisplayClass = " + lDisplayClass);
//}

	this.mBatterInput.SetDisplayClass (lDisplayClass);
	this.mBowlerInput.SetDisplayClass (lDisplayClass);
	this.mHOInput.SetDisplayClass (lDisplayClass);
	this.mRunsInput.SetDisplayClass (lDisplayClass);

	dwln ("		<td>");
	dwln (			aNumber);
	dwln ("		</td>");

	dwln ("		<td>");
					this.mBatterInput.HTML();
	dwln ("		</td>");

	dwln ("		<td>");
					this.mHOInput.HTML();
	dwln ("		</td>");

	dwln ("		<td>");
					this.mBowlerInput.HTML();
	dwln ("		</td>");

	dwln ("		<td align='right'>");
					this.mRunsInput.HTML();
	dwln ("		</td>");

	// Trailing space
	dwln ("		<td>&nbsp;</td>");

	dwln ("	</tr>");
}

function BatsmanDE___SetPlayerNames (aBatters, aBowlers)
{
	if (aBatters != null)
	{
		this.mBatsmen = aBatters;
		this.mBatterInput.SetPlayers (this.mBatsmen);
	}

	if (aBowlers != null)
	{
		this.mBowlers = aBowlers;
		this.mBowlerInput.SetPlayers (this.mBowlers);
		this.mHOInput.SetPlayerNames (this.mBowlers);
	}
}

function BatsmanDE___GetBatterName()	
{
	return (this.mBatterInput.GetName());
}

function BatsmanDE___GetHowOut()		{	return (this.mHOInput.GetValue());													}
function BatsmanDE___IsOut()
{
	var lRet=true;
	var lHowOut=this.GetHowOut();

	if (lHowOut == null)
	{
		lRet = false;
	}
	else if (lHowOut == "")
	{
		lRet = false;
	}
	else if (lHowOut == gDidNotBat)
	{
		lRet = false;
	}
	else if (lHowOut == "Not Out")
	{
		lRet = false;
	}
	else if (lHowOut == "Retired Hurt")
	{
		lRet = false;
	}

	return (lRet);
}

function BatsmanDE___GetBowlerName()
{
	var lRet="";

	if (this.mBowlerInput.GetFirstname() != "")
	{
		lRet += this.mBowlerInput.GetFirstname() + " ";
	}

	lRet += this.mBowlerInput.GetSurname();

	return (lRet);
}
function BatsmanDE___GetRuns()
{
	var lRet=this.mRunsInput.GetValue();

	if (lRet == "")
	{
		lRet = 0;
	}

	return (lRet);
}

function BatsmanDE___SetIsTRCC (aIs)
{
	this.mIsTRCCBatter = aIs;

	if (this.mIsTRCCBatter == null)
	{
		this.mIsTRCCBatter = true;
	}

	//
	// Do we want to input the catcher's name nicely? (I.e is the 
	// catcher a TRCC player?).
	//
	this.mHOInput.SetTRCCBowling (!this.mIsTRCCBatter);
}

function BatsmanDE___GenerateData (aPrefix)
{
	if (this.mBatterInput.GetName() == "")
	{
		// No batter info for this batsman
	}
	else
	{
		var lLine=aPrefix + ".addBatter (new Batsman (";

		lLine += "\"" + this.mBatterInput.GetName() + "\"";

		if (this.GetHowOut() != "")
		{
			lLine += ",\t";
			lLine += "\"" + this.GetHowOut()			+ "\",\t";
			lLine += "\"" + this.mBowlerInput.GetName() + "\",\t";
			lLine += this.GetRuns();
		}

		lLine += "));";

		//
		// Add to the output data
		//
		MatchDE_AddLine (lLine);
	}
}

function BatsmanDE___RunsChangeCB()
{
	var lRet=true;

	if (this.mRunsChangeCB != null)
	{
		lRet = this.mRunsChangeCB (this.mRunsChangeCBParam);
	}

	return (lRet);
}

function BatsmanDE___BowlerBlurCB ()
{
	var lRet=true; 

	if (this.mBowlerBlurCB != null)
	{
		lRet = this.mBowlerBlurCB (this.mBowlerBlurCBParam);
	}

	return (lRet);
}

function BATSMANRUNSBLURCB (aIndex)
{
	return (gBatsmanDEA[aIndex].RunsChangeCB());
}

function BOWLERBLURCB (aIndex)
{
	return (gBatsmanDEA[aIndex].BowlerBlurCB());
}
