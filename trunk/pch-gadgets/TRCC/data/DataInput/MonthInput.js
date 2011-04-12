// Month input
var gMonthInputA=new Array();

function MonthInput (aForm, aDefault, aChangeCB, aChangeCBParam)
{
	this.mForm			= aForm;
	this.mIndex			= gMonthInputA.length;
	this.mName			= this.mForm + "-MonthInput-" + this.mIndex;
	this.mDefault		= "<none>";
	if (aDefault != null)
	{
		this.mDefault 	= aDefault;
	}

	this.mDisplayClass	= null;

	this.mChangeCB		= aChangeCB;
	this.mChangeCBParam	= aChangeCBParam;

	this.HTML				= MonthInput___HTML;
	this.GetValue			= MonthInput___GetValue;
	this.ChangeCB			= MonthInput___ChangeCB;
	this.SetDisplayClass	= MonthInput___SetDisplayClass;

	gMonthInputA[this.mIndex]	= this;
}

function MonthInput___HTML()
{
	var lMonths=new Array ("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

	dwln ("<select ");

	if (this.mDisplayClass != null)
	{
		dwln ("class=\"" + this.mDisplayClass + "\" ");
	}

	dwln ("name='" + this.mName + "' onChange='MONTHINPUTCHANGECB (\"" + this.mIndex + "\")'>");

	for (i=0 ; i<lMonths.length ; i++)
	{
		dwln ("<option value=\"" + lMonths[i] + "\"");

		if (lMonths[i] == this.mDefault)
		{
			// Select
			dwln (" selected=\"selected\"");
		}

		dwln (">" + lMonths[i] + "</option>");
	}

	dwln ("</select>");
}

function MonthInput___GetValue()
{
	return (document[this.mForm][this.mName].value);
}

function MonthInput___SetDisplayClass (aClass)
{
	this.mDisplayClass = aClass;
}

function MonthInput___ChangeCB()
{
	var lRet=true;

	if (this.mChangeCB != null)
	{
		lRet = this.mChangeCB (this.mChangeCBParam);
	}

	return (lRet);
}

function MONTHINPUTCHANGECB (aIndex)
{
	return (gMonthInputA[aIndex].ChangeCB());
}
