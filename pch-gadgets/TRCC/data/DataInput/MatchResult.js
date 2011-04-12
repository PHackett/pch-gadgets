//
var gMatchResultA=new Array();

function MatchResult (aForm)
{
	this.mForm		= aForm;
	this.mIndex		= gMatchResultA.length;

	var lOptions = new Array ("Win", "Lose", "Draw", "Tie", "Rain", "Abandonned", "=Not-Played=");

	this.mSelect	= new SelectInput (this.mForm, lOptions);

	this.HTML				= MatchResult___HTML;
	this.GetValue			= MatchResult___GetValue;
	this.GetValueCode		= MatchResult___GetValueCode;
	this.SetDisplayClass	= MatchResult___SetDisplayClass;

	gMatchResultA[this.mIndex] = this;
}

function MatchResult___HTML()
{
	this.mSelect.HTML();
}

function MatchResult___GetValue()
{
	return (this.mSelect.GetValue());
}

function MatchResult___GetValueCode()
{
	var lVal = this.GetValue();
	var lRet="";

	if (lVal == "Win")
	{
		lRet = "gResWin";
	}
	else if (lVal == "Lose")
	{
		lRet = "gResLose";
	}
	else if (lVal == "Draw")
	{
		lRet = "gResDraw";
	}
	else if (lVal == "Tie")
	{
		lRet = "gResTie";
	}
	else if (lVal == "Rain")
	{
		lRet = "gResRain";
	}
	else if (lVal == "Abandonned")
	{
		lRet = "gResAba";
	}
	else if (lVal == "=Not-Played=")
	{
		lRet = "gResNP";
	}

	return (lRet);
}

function MatchResult___SetDisplayClass (aClass)
{
	this.mSelect.SetDisplayClass (aClass);
}
