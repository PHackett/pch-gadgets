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
	this.mForm		= aForm;
	this.mName		= this.mForm + "-HowOut-" + gHowOutInputA.length;
	this.mInput		= new PredictiveInput (this.mName, this.mForm, gHowOutReasons, null, 14, 14);

	this.HTML				= HowOutInput___HTML;
	this.GetValue			= HowOutInput___GetValue;
	this.SetValue			= HowOutInput___SetValue;
	this.SetDisplayClass	= HowOutInput___SetDisplayClass;

	gHowOutInputA[gHowOutInputA.length] = this;
}

function HowOutInput___GetValue ()				{	return (this.mInput.GetValue());		}
function HowOutInput___SetValue ()				{	this.mInput.SetValue();					}
function HowOutInput___SetDisplayClass (aClass)	{	this.mInput.SetDisplayClass (aClass);	}

function HowOutInput___HTML ()
{
	this.mInput.HTML();
}
