// Number range chooser
var gNumberRangeInputA=new Array();

function NumberRangeInput (aForm, aMin, aMax, aDefault, aChangeCB, aChangeCBParam)
{
	this.mForm			= aForm;
	this.mIndex			= gNumberRangeInputA.length;
	this.mName			= this.mForm + "-NumberRangeInput-" + this.mIndex;
	this.mDisplayClass	= null;

	this.mMin			= aMin;
	this.mMax			= aMax;
	this.mDefault		= aMin - 1;

	this.mChangeCB		= aChangeCB;
	this.mChangeCBParam	= aChangeCBParam;

	if (aDefault != null)
	{
		this.mDefault	= aDefault;
	}

	this.HTML				= NumberRangeInput___HTML;
	this.GetValue			= NumberRangeInput___GetValue;
	this.ChangeCB			= NumberRangeInput___ChangeCB;
	this.SetDisplayClass	= NumberRangeInput___SetDisplayClass;

	gNumberRangeInputA[this.mIndex]	= this;
}


function NumberRangeInput___HTML()
{
	var i;

	dwln ("<select ");

	if (this.mDisplayClass != null)
	{
		dwln ("class=\"" + this.mDisplayClass + "\" ");
	}

	dwln ("name='" + this.mName + "' onChange='NUMBERRANGEINPUTCHANGECB (\"" + this.mIndex + "\")'>");

	for (i=this.mMin ; i<=this.mMax ; i++)
	{
		dwln ("<option value=\"" + i + "\"");

		if (i == this.mDefault)
		{
			// Select 
			dwln (" selected=\"selected\"");
		}

		dwln (">" + i + "</option>");
	}

	dwln ("</select>");
}

function NumberRangeInput___GetValue()
{
	return (document[this.mForm][this.mName].value);
}

function NumberRangeInput___SetDisplayClass (aClass)
{
	this.mDisplayClass = aClass;
}

function NumberRangeInput___ChangeCB()
{
	var lRet=true;

	if (this.mChangeCB != null)
	{
		lRet = this.mChangeCB (this.mChangeCBParam);
	}

	return (lRet);
}

function NUMBERRANGEINPUTCHANGECB (aIndex)
{
	return (gNumberRangeInputA[aIndex].ChangeCB());
}