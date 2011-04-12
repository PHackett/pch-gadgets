// Oposition select
var gOppositionInputA=new Array();
var gOppoInputLength=25;
var gOppoInputMaxLength=25;

function OppositionInput (aForm, aSelChangeCB, aSelChangeCBPAram)
{
	this.mForm					= aForm;
	this.index					= gOppositionInputA.length;
	this.mName					= aForm + "-OppositionInput=" + this.index;
	this.mSelChangeCB			= aSelChangeCB;
	this.mSelChangeCBPAram		= aSelChangeCBPAram;

	this.mOppoInput				= new TextInputControl (this.mForm, 
														gOppoInputLength, 
														gOppoInputMaxLength, 
														OPPOSITIONINPUTBLURCB, 
														this.index);
	this.mBatFirstSel			= new SelectInput (this.mForm, 
													new Array ("TRCC", "Opposition"), 
													"TRCC", 
													BATFIRSTSELECTCHANGECB, 
													this.index);

	this.HTMLOppoName			= OppositionInput___HTMLOppoName;
	this.HTMLBattingTeam1		= OppositionInput___HTMLBattingTeam1;
	this.HTMLBattingTeam2		= OppositionInput___HTMLBattingTeam2;
	this.SetBattingTeam2Name	= OppositionInput___SetBattingTeam2Name;
	this.GetOpposition			= OppositionInput___GetOpposition;
	this.IsTRCCBattingFirst		= OppositionInput___IsTRCCBattingFirst;
	this.FocusOnInput			= OppositionInput___FocusOnInput;

	this.OppoInputBlurCB		= OppositionInput___OppoInputBlurCB;
	this.BatFirstSelChangeCB	= OppositionInput___BatFirstSelChangeCB;
	this.GetBT2ID				= OppositionInput___GetBT2ID;

	gOppositionInputA[gOppositionInputA.length] = this;
}

function OppositionInput___HTMLOppoName ()
{
	this.mOppoInput.SetDisplayClass ("FixtureHeadInput");
	this.mOppoInput.HTML();
}

function OppositionInput___HTMLBattingTeam1 ()
{
	this.mBatFirstSel.SetDisplayClass ("InputSm");
	this.mBatFirstSel.HTML();
}

function OppositionInput___HTMLBattingTeam2 ()
{
	dwln ("<span id='" + this.GetBT2ID() + "'>Opposition</span>");
}

function OppositionInput___SetBattingTeam2Name (aName)
{
	document.getElementById(this.GetBT2ID()).innerHTML = aName;
}

function OppositionInput___GetOpposition()
{
	return (this.mOppoInput.GetValue());
}

function OppositionInput___IsTRCCBattingFirst ()
{
	var lRet=true;

	if (this.mBatFirstSel.GetValue() != "TRCC")
	{
		lRet = false;
	}

	return (lRet);
}

function OppositionInput___FocusOnInput()
{
	this.mOppoInput.TakeFocus();
}

function OppositionInput___GetBT2ID()
{
	return (this.nName + "-BT2ID");
}

function OppositionInput___BatFirstSelChangeCB()
{
	var lOpts=this.mBatFirstSel.GetOptions();
	var lIndex=this.mBatFirstSel.GetSelIndex();

	var lOppo = lOpts[1 - lIndex];

	this.SetBattingTeam2Name (lOppo);

	// Callback
	if (this.mSelChangeCB != null)
	{
		this.mSelChangeCB (this.mSelChangeCBParam);
	}
}

function OppositionInput___OppoInputBlurCB()
{
	if (this.mOppoInput.GetValue() != "")
	{
		this.mBatFirstSel.SetOptions (new Array ("TRCC", this.mOppoInput.GetValue()));
		this.SetBattingTeam2Name (this.mOppoInput.GetValue());
	}
}

function OPPOSITIONINPUTBLURCB (aIndex)
{
	return (gOppositionInputA[aIndex].OppoInputBlurCB());
}

function BATFIRSTSELECTCHANGECB (aIndex)
{
	return (gOppositionInputA[aIndex].BatFirstSelChangeCB());
}