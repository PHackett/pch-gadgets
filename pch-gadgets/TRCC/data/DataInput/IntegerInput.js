// Integer Input

var gIntegerInputA=new Array();

function IntegerInput (aForm, aMin, aMax, aBlurCallback, aBlurCallbackParam, aKeyUpCB, aKeyUpCBParam)
{
	this.mForm	= aForm;
	this.mIndex	= gIntegerInputA.length;
	this.mName	= this.mForm + "-IntegerInput-" + this.mIndex;
	this.mMin	= aMin;
	if (aMin == null)
	{
		this.mMin	= 0;
	}

	this.mMax	= aMax;
	if (aMax == null)
	{
		this.mMax	= 999;
	}

	var lDigits	= (Math.log (this.mMax) * Math.LOG10E) + 1;

	this.mControl	= new TextInputControl (this.mForm, 
											lDigits, 
											lDigits, 
											INTEGERINPUTBLURCB, this.mIndex,
											INTEGERINPUTKEYUPCB, this.mIndex);

	this.mBlurCallback		= aBlurCallback;
	this.mBlurCallbackParam	= aBlurCallbackParam;
	this.mKeyUpCB			= aKeyUpCB;
	this.mKeyUpCBParam		= aKeyUpCBParam;

	this.GetValue			= IntegerInput___GetValue;
	this.SetValue			= IntegerInput___SetValue;
	this.TakeFocus			= IntegerInput___TakeFocus;
	this.HTML				= IntegerInput___HTML;
	this.SetDisplayClass	= IntegerInput___SetDisplayClass;

	this.BlurCB				= IntegerInput___BlurCB;
	this.KeyUpCB			= IntegerInput___KeyUpCB;

	gIntegerInputA[this.mIndex] = this;
}

function IntegerInput___GetValue()					{	return (this.mControl.GetValue());			}
function IntegerInput___SetValue (aValue)			{	this.mControl.SetValue (aValue);			}
function IntegerInput___TakeFocus()					{	return (this.mControl.TakeFocus());			}
function IntegerInput___HTML()						{	return (this.mControl.HTML());				}
function IntegerInput___SetDisplayClass (aClass)	{	this.mControl.SetDisplayClass (aClass);		}
function INTEGERINPUTBLURCB (aIndex)				{	return (gIntegerInputA[aIndex].BlurCB());	}
function INTEGERINPUTKEYUPCB (aIndex)				{	return (gIntegerInputA[aIndex].KeyUpCB());	}

function IntegerInput___BlurCB()
{
	var lRet=false;
	var lValue=this.GetValue();
	var lValueLen=lValue.length;

	if ((lValueLen > 0) && !IsInteger (lValue))
	{
		alert ("Please enter an integer **");
		this.SetValue ("0");
		this.TakeFocus();
	}
	else if ((lValueLen > 0) && (parseInt (lValue) < this.mMin))
	{
		this.TakeFocus();
		alert ("Value entered (" + lValue + ") is less than the minimum (" + this.mMin + ") **");
		this.SetValue (this.mMin);
	}
	else if ((lValueLen > 0) && (parseInt (lValue) > this.mMax))
	{
		alert ("Value entered (" + lValue + ") is greater than the maximum (" + this.mMax + ") **");
		this.SetValue (this.mMax);
		this.TakeFocus();
	}
	else if (this.mBlurCallback != null)
	{
		lRet = this.mBlurCallback (this.mBlurCallbackParam);
	}

	return (lRet);
}

function IntegerInput___KeyUpCB()
{
	var lRet=true;

	if (this.mKeyUpCB != null)
	{
		lRet = this.mKeyUpCB (this.mKeyUpCBParam);
	}

	return (lRet);
}

function IsInteger (aVal)
{
	return (("" + parseInt (aVal)) == aVal);
}
