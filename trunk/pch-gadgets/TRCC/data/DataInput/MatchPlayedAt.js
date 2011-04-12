//
var gMatchPlayedAtA=new Array();

function MatchPlayedAt (aForm)
{
	this.mForm		= aForm;
	this.mIndex		= gMatchPlayedAtA.length;

	var lOptions = new Array ("Home", "Away", "Tour");

	this.mSelect	= new SelectInput (this.mForm, lOptions);

	this.HTML				= MatchPlayedAt___HTML;
	this.GetValue			= MatchPlayedAt___GetValue;
	this.GetValueCode		= MatchPlayedAt___GetValueCode;
	this.SetDisplayClass	= MatchPlayedAt___SetDisplayClass;

	gMatchPlayedAtA[this.mIndex] = this;
}

function MatchPlayedAt___HTML()
{
	this.mSelect.HTML();
}

function MatchPlayedAt___GetValue()
{
	return (this.mSelect.GetValue());
}

function MatchPlayedAt___GetValueCode()
{
	var lVal = this.GetValue();
	var lRet="";

	if (lVal == "Home")
	{
		lRet = "gHome";
	}
	else if (lVal == "Away")
	{
		lRet = "gAway";
	}
	else if (lVal == "Tour")
	{
		lRet = "gTour";
	}

	return (lRet);
}

function MatchPlayedAt___SetDisplayClass (aClass)
{
	this.mSelect.SetDisplayClass (aClass);
}