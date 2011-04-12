// Overs Input

var gOversInputA=new Array();

function OversInput (aForm, aBlurCallback, aBlurCallbackParam)
{
	this.mForm				= aForm;
	this.mIndex				= gOversInputA.length;
	this.mName				= this.mForm + "-OversInput-" + this.mIndex;

	this.mControl			= new FloatInput (this.mForm, 0, 80, 1, OVERSINPUTBLURCB, this.mIndex);
	this.mBlurCallback		= aBlurCallback;
	this.mBlurCallbackParam	= aBlurCallbackParam;

	this.GetValue			= OversInput___GetValue;
	this.SetValue			= OversInput___SetValue;
	this.TakeFocus			= OversInput___TakeFocus;
	this.HTML				= OversInput___HTML;
	this.SetDisplayClass	= OversInput___SetDisplayClass;

	this.BlurCB				= OversInput___BlurCB;

	gOversInputA[this.mIndex] = this;
}

function OversInput___GetValue()				{	return (this.mControl.GetValue());			}
function OversInput___SetValue (aValue)			{	this.mControl.SetValue (aValue);			}
function OversInput___TakeFocus()				{	return (this.mControl.TakeFocus());			}
function OversInput___HTML()					{	return (this.mControl.HTML());				}
function OversInput___SetDisplayClass (aClass)	{	this.mControl.SetDisplayClass (aClass);		}
function OVERSINPUTBLURCB (aIndex)				{	return (gOversInputA[aIndex].BlurCB());		}


function OversInput___BlurCB()
{
	//
	// By this point we know it is a valid float number inside the range.
	// Need to check its valid as overs
	//
	var lRet=false;
	var lValue=this.GetValue();
	var lValueLen=lValue.length;

	if ((lValueLen > 0) && (((lValue * 10) - Math.floor (lValue * 10)) != 0))
	{
		alert ("Too many values after decimal point");
		this.TakeFocus();
	}
	else if ((lValue - Math.floor(lValue)) > 0.5)
	{
		alert ("Too many balls in part over");
		this.TakeFocus();
	}
	else if (this.mBlurCallback != null)
	{
		lRet = this.mBlurCallback (this.mBlurCallbackParam);
	}

	return (lRet);
}
