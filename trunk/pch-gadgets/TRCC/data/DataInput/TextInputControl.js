// General input panel
var gTextInputControlA=new Array();

function TextInputControl (aForm, aLength, aMaxLength, aBlurCallback, aBlurCallbackParam, aOnKeyUpCB, aOnKeyUpCBParam)
{
	this.mIndex			= gTextInputControlA.length;
	this.mForm			= aForm
	this.mName			= this.mForm + "-TextInputControl-" + this.mIndex;
	this.mLength		= aLength;
	this.mMaxLength		= this.mLength;
	if (aMaxLength != null)
	{
		this.mMaxLength	= aMaxLength;
	}

	this.mDisplayClass			= null;

	this.mBlurCallback			= aBlurCallback;
	this.mBlurCallbackParam		= aBlurCallbackParam;
	this.mOnKeyUpCB				= aOnKeyUpCB;
	this.mOnKeyUpCBParam		= aOnKeyUpCBParam;

	this.GetValue				= TextInputControl___GetValue;
	this.SetValue				= TextInputControl___SetValue;
	this.TakeFocus				= TextInputControl___TakeFocus;
	this.HTML					= TextInputControl___HTML;
	this.SetDisplayClass		= TextInputControl___SetDisplayClass;

	this.BlurCB					= TextInputControl___BlurCB;
	this.OnKeyUpCB				= TextInputControl___OnKeyUpCB;

	gTextInputControlA[this.mIndex] = this;
}

function TextInputControl___GetValue()					{ return (document[this.mForm][this.mName].value);	}
function TextInputControl___SetValue (aValue)			{ document[this.mForm][this.mName].value = aValue;	}
function TextInputControl___SetDisplayClass (aClass)	{ this.mDisplayClass = aClass;						}
function TextInputControl___TakeFocus()		
{ 
	document[this.mForm][this.mName].select();
	document[this.mForm][this.mName].focus();
}

function TextInputControl___HTML()
{
	dwln ("<input 	type='text' ");

	if (this.mDisplayClass != null)
	{
		dwln ("class=\"" + this.mDisplayClass + "\" ");
	}

	dwln (			"name='"		+ this.mName 				+ "' "				+ 
					"size='"		+ this.mLength 				+ "' "				+
					"maxlength='" 	+ this.mMaxLength			+ "' "				+
					"onBlur='TEXTINPUTCONTROLBLURCB ("	+ this.mIndex	+ ")'"		+
					"onkeyup='TEXTINPUTCONTROLKEYUPCB ("	+ this.mIndex	+ ")'"	+
					">");
}

function TextInputControl___BlurCB ()
{
	var lRet=true;

	if (this.mBlurCallback != null)
	{
		lRet = this.mBlurCallback (this.mBlurCallbackParam);
	}

	return (lRet);
}

function TextInputControl___OnKeyUpCB ()
{
	var lRet=true;

	if (this.mOnKeyUpCB != null)
	{
		lRet = this.mOnKeyUpCB (this.mOnKeyUpCBParam);
	}

	return (lRet);
}

function TEXTINPUTCONTROLBLURCB (aIndex)	{	return (gTextInputControlA[aIndex].BlurCB());		}
function TEXTINPUTCONTROLKEYUPCB (aIndex)	{	return (gTextInputControlA[aIndex].OnKeyUpCB());	}
