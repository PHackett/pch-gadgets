// Datechooser object
var gDateInputA=new Array();

function DateInput (aForm, aChangeCB, aChangeCBParam)
{
	this.mForm				= aForm;
	this.mIndex				= gDateInputA.length;
	this.mChangeCB			= aChangeCB;
	this.mChangeCBParam		= aChangeCBParam;

	var lNow = new Date();
	var lThisYear = lNow.getFullYear();

	this.mDate				= new NumberRangeInput (this.mForm, 1, 31, 1, DATEINPUTCHANGECB, this.mIndex);
	this.mMonth				= new MonthInput (this.mForm, "Apr", DATEINPUTCHANGECB, this.mIndex);
	this.mYear				= new NumberRangeInput (this.mForm, 1974, lThisYear, lThisYear, DATEINPUTCHANGECB, this.mIndex);

	this.HTML				= DateInput___HTML;
	this.GetValue			= DateInput___GetValue;
	this.GetDate			= DateInput___GetDate;
	this.ChangeCB			= DateInput___ChangeCB;
	this.SetDisplayClass	= DateInput___SetDisplayClass;

	gDateInputA[this.mIndex] = this;
}

function DateInput___HTML()
{
	this.mDate.HTML();
	this.mMonth.HTML();
	this.mYear.HTML();
}


function DateInput___GetValue()
{
	var lDate=	
			this.mMonth.GetValue() 	+ " " + 
			this.mDate.GetValue() 	+ " " + 
			this.mYear.GetValue();

	return (lDate);
}

function DateInput___GetDate()
{
	return (new Date (this.GetValue()));
}

function DateInput___SetDisplayClass (aClass)
{
	this.mDate.SetDisplayClass (aClass);
	this.mMonth.SetDisplayClass (aClass);
	this.mYear.SetDisplayClass (aClass);
}

function DateInput___ChangeCB()
{
	var lRet=true;

	if (this.mChangeCB != null)
	{
		lRet = this.mChangeCB (this.mChangeCBParam);
	}

	return (lRet);
}

function DATEINPUTCHANGECB (aIndex)
{
	return (gDateInputA[aIndex].ChangeCB());
}