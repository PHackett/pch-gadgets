// Select input
var gSelectInput=new Array();

function SelectInput (aForm, aOptions, aDefault, aChangeCB, aChangeCBParam)
{
	this.mForm			= aForm;
	this.mIndex			= gSelectInput.length;
	this.mName			= aForm + "-SelectInput-" + this.mIndex;

	this.mOptions		= aOptions;
	if (this.mOptions == null)
	{
		this.mOptions = new Array();
	}

	this.mDefault		= aDefault;
	if (this.mDefault == null)
	{
		this.mDefault = "<never selected at all>";
	}
	this.mChangeCB			= aChangeCB;
	this.mChangeCBParam		= aChangeCBParam;
	this.mDisplayClass		= null;

	this.HTML				= SelectInput___HTML;
	this.GetValue			= SelectInput___GetValue;
	this.GetSelIndex		= SelectInput___GetSelIndex;
	this.SetOptions			= SelectInput___SetOptions;
	this.GetOptions			= SelectInput___GetOptions;
	this.SetDisplayClass	= SelectInput___SetDisplayClass;

	this.ChangeCB		= SelectInput___ChangeCB;


	gSelectInput[gSelectInput.length] = this;
}

function SelectInput___HTML()
{
	dwln ("<select ");

	if (this.mDisplayClass != null)
	{
		dwln ("class=\"" + this.mDisplayClass + "\" ");
	}

	dwln ("name='" + this.mName + "' onChange='SELECTCHANGECB (\"" + this.mIndex + "\")'>");

	for (i=0 ; i<this.mOptions.length ; i++)
	{
		dwln ("<option value=\"" + this.mOptions[i] + "\"");

		if (this.mOptions[i] == this.mDefault)
		{
			// Select
			dwln (" selected=\"selected\"");
		}

		dwln (">" + this.mOptions[i] + "</option>");
	}

	dwln ("</select>");
}

function SelectInput___GetValue()
{
	return (document[this.mForm][this.mName].value);
}

function SelectInput___GetSelIndex()
{
	return (document[this.mForm][this.mName].selectedIndex);
}

function SelectInput___SetOptions (aOptions)
{
	this.mOptions = aOptions;

	for (var i=0 ; i<this.mOptions.length ; i++)
	{
		document[this.mForm][this.mName].options[i].text = this.mOptions[i];
		document[this.mForm][this.mName].options[i].value = this.mOptions[i];
	}
}

function SelectInput___GetOptions()
{
	return (this.mOptions);
}

function SelectInput___SetDisplayClass (aClass)
{
	this.mDisplayClass = aClass;
}

function SelectInput___ChangeCB()
{
	var lRet=true;

	if (this.mChangeCB != null)
	{
		lRet = this.mChangeCB (this.mChangeCBParam);
	}

	return (lRet);
}

function SELECTCHANGECB (aIndex)
{
	return (gSelectInput[aIndex].ChangeCB());
}