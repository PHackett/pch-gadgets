// Float Input

var gFloatInputA=new Array();

function FloatInput (aForm, aMin, aMax, aDecimalPlaces, aBlurCallback, aBlurCallbackParam)
{
	this.mForm	= aForm;
	this.mIndex	= gFloatInputA.length;
	this.mName	= this.mForm + "-FloatInput-" + this.mIndex;
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

	this.mDP		= aDecimalPlaces;

	var lDigits	= (Math.log (this.mMax) * Math.LOG10E) + 1 + 1 + this.mDP;

	this.mControl	= new TextInputControl (this.mForm, lDigits, lDigits, FLOATINPUTBLURCB, this.mIndex);

	this.mBlurCallback	= aBlurCallback;
	this.mBlurCallbackParam	= aBlurCallbackParam;

	this.GetValue			= FloatInput___GetValue;
	this.SetValue			= FloatInput___SetValue;
	this.TakeFocus			= FloatInput___TakeFocus;
	this.HTML				= FloatInput___HTML;
	this.SetDisplayClass	= FloatInput___SetDisplayClass;

	this.BlurCB				= FloatInput___BlurCB;

	gFloatInputA[this.mIndex] = this;
}

function FloatInput___GetValue()				{	return (this.mControl.GetValue());			}
function FloatInput___SetValue (aValue)			{	this.mControl.SetValue (aValue);			}
function FloatInput___TakeFocus()				{	return (this.mControl.TakeFocus());			}
function FloatInput___HTML()					{	return (this.mControl.HTML());				}
function FloatInput___SetDisplayClass (aClass)	{	this.mControl.SetDisplayClass (aClass);		}
function FLOATINPUTBLURCB (aIndex)				{	return (gFloatInputA[aIndex].BlurCB());		}


function FloatInput___BlurCB()
{
	var lRet=false;
	var lValue=this.GetValue();
	var lValueLen=lValue.length;

	if ((lValueLen > 0) && !IsFloat (lValue))
	{
		alert ("Please enter an decimal number");
		this.TakeFocus();
	}
	else if ((lValueLen > 0) && (parseFloat (lValue) < this.mMin))
	{
		this.TakeFocus();
		alert ("Value entered (" + lValue + ") is less than the minimum (" + this.mMin + ")");
	}
	else if ((lValueLen > 0) && (parseFloat (lValue) > this.mMax))
	{
		alert ("Value entered (" + lValue + ") is greater than the maximum (" + this.mMax + ")");
		this.TakeFocus();
	}
	else if (this.mBlurCallback != null)
	{
		lRet = this.mBlurCallback (this.mBlurCallbackParam);
	}

	return (lRet);
}

function IsFloat (aVal)
{
	return (("" + parseFloat (aVal)) == aVal);
}
