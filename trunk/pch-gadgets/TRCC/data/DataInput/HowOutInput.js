// Howazzat?
var gHowOutReasons=new Array();
var gDidNotBat="Did Not Bat";
var gHowOutInputA=new Array();

MakeHowOutReasons ();


function MakeHowOutReasons ()
{
	gHowOutReasons[gHowOutReasons.length]	= gDidNotBat;
	gHowOutReasons[gHowOutReasons.length]	= "Not Out";
	gHowOutReasons[gHowOutReasons.length]	= "Bowled";
	gHowOutReasons[gHowOutReasons.length]	= "LBW";
	gHowOutReasons[gHowOutReasons.length]	= "Caught";
	gHowOutReasons[gHowOutReasons.length]	= "Caught & Bowled";
	gHowOutReasons[gHowOutReasons.length]	= "Caught Keeper";
	gHowOutReasons[gHowOutReasons.length]	= "Stumped";
	gHowOutReasons[gHowOutReasons.length]	= "Run Out";
	gHowOutReasons[gHowOutReasons.length]	= "Hit Wicket";
	gHowOutReasons[gHowOutReasons.length]	= "Retired Hurt";

	gHowOutReasons.sort();
}

function HowOutInput (aForm)
{
	this.mIndex				= gHowOutInputA.length;
	this.mForm				= aForm;
	this.mName				= this.mForm + "-HowOut-" + gHowOutInputA.length;
	this.mInput				= new PredictiveInput (this.mName, this.mForm, gHowOutReasons, HOWOUTCHANGEDCB, this.mIndex, 14);
	this.mCatcherInput		= new FullNameInput (this.mForm);
	this.mIsTRCCBowling		= false;

	this.HTML				= HowOutInput___HTML;
	this.GetValue			= HowOutInput___GetValue;
	this.SetValue			= HowOutInput___SetValue;
	this.SetDisplayClass	= HowOutInput___SetDisplayClass;
	this.SetPlayerNames		= HowOutInput___SetPlayerNames;
	this.SetTRCCBowling		= HowOutInput___SetTRCCBowling;
	this.GetDIVName			= HowOutInput___GetDIVName;
	this.HowOutChangeCB		= HowOutInput___HowOutChangeCB;

	// this.mBG				= "orange";

	gHowOutInputA[this.mIndex] = this;
}

function HowOutInput___GetValue ()
{
	var lRet = this.mInput.GetValue();

	if ((this.mInput.GetValue() == "Caught") && this.mIsTRCCBowling)
	{
		if (this.mCatcherInput.GetFirstname() != "")
		{
			lRet += " " + this.mCatcherInput.GetFirstname();
		}

		lRet += " " + this.mCatcherInput.GetSurname();

		// alert ("this.mCatcherInput Name = " + lRet);
	}

	return (lRet);
}
function HowOutInput___SetValue ()				{	this.mInput.SetValue();					}
function HowOutInput___SetDisplayClass (aClass)	
{
	this.mInput.SetDisplayClass (aClass);
	this.mCatcherInput.SetDisplayClass (aClass);
}

function HowOutInput___HTML ()
{
	dwln ("<table cellspacing='0' cellpadding='0' border='0'>");
	dwln ("	<tr>");
	dwln ("		<td>");
					this.mInput.HTML();
	dwln ("		</td>");
	dwln ("		<td>");
					dwln ("&nbsp");
	dwln ("		</td>");
	dwln ("		<td>");
	dwln ("			<div id=\"" + this.GetDIVName() + "\" style=\"visibility:hidden\">");
	// dwln ("			<div id=\"" + this.GetDIVName() + "\" style=\"visibility:visible\">");
					this.mCatcherInput.HTML();
	dwln ("			</div>");
	dwln ("		</td>");
	dwln ("	</tr>");
	dwln ("</table>");

	// this.mBG				= document.all['' + this.GetDIVName() + ''].style.background;
}

function HowOutInput___SetPlayerNames (aBowlerNames)
{
	this.mCatcherInput.SetPlayers (aBowlerNames);
}

function HowOutInput___SetTRCCBowling (aGet)
{
	this.mIsTRCCBowling = aGet;

	if (this.mIsTRCCBowling == null)
	{
		this.mIsTRCCBowling = true;
	}
}

function HowOutInput___HowOutChangeCB()
{
	if ((this.mInput.GetValue() == "Caught") && this.mIsTRCCBowling)
	{
		//
		// It is at this point we want to make the catcher input 
		// FullNameInput visible
		//
		// NOTE: THIS IS IE SPECIFIC
		//
		document.all['' + this.GetDIVName() + ''].style.visibility = "visible";
		// document.all['' + this.GetDIVName() + ''].style.background = "red";
	}
	else
	{
		document.all['' + this.GetDIVName() + ''].style.visibility = "hidden";
		// document.all['' + this.GetDIVName() + ''].style.background = this.mBG;
	}
}

function HowOutInput___GetDIVName()
{
	return ("CatcherDiv-" + this.mName);
}

function HOWOUTCHANGEDCB (aIndex)
{
	return (gHowOutInputA[aIndex].HowOutChangeCB());
}