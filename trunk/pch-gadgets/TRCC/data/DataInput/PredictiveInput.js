//
// This object is to help in data entry by doing predictive text input
//

var gPredictiveInputA=new Array();


//
// From http://stackoverflow.com/questions/3085446/selecting-part-of-string-inside-an-input-box-with-jquery
//
// Allows us to set a partial selection in an InputBox on browsers other than IE
//
function setInputSelection (input, startPos, endPos) 
{
        if (typeof input.selectionStart != "undefined") 
        {
            input.selectionStart = startPos;
            input.selectionEnd = endPos;
        } 
        else if (document.selection && document.selection.createRange) 
        {
            // IE branch
            input.focus();
            input.select();
            var range = document.selection.createRange();
            range.collapse(true);
            range.moveEnd("character", endPos);
            range.moveStart("character", startPos);
            range.select();
        }

    }

function PredictiveResult (aValue)
{
	this.mValue				= aValue;
	this.mExact				= false;
}

function PredictiveInput (aName, aForm, aOptions, aChangeCB, aCCBParam, aLength, aMaxLength, aOnBlurCB, aOnBlurCBParam)
{
	this.mName				= aName;
	this.mForm				= aForm;
	this.mchangeCB			= aChangeCB;
	this.mchangeCBParam		= aCCBParam;
	this.mblurCB			= aOnBlurCB;
	this.mblurCBParam		= aOnBlurCBParam;
	this.mExactMatchBG		= "red";

	this.mCapitalFirstLetter= true;
	this.mStrictMatch		= true;

	this.mOptionsIndex		= null;

	this.mLength			= 15;
	if (aLength != null)
	{
		this.mLength		= aLength;
	}

	this.mMaxLength			= 30;
	if (aMaxLength != null)
	{
		this.mMaxLength		= aMaxLength;
	}

	this.mDisplayClass=null;

	this.SetOptions			= PredictiveInput___SetOptions;
	this.HTML				= PredictiveInput___HTML;
	this.getPartialMatch	= PredictiveInput___getPartialMatch;
	this.GetValue			= PredictiveInput___GetValue;
	this.SetValue			= PredictiveInput___SetValue;
	this.SetDisplayClass	= PredictiveInput___SetDisplayClass;
	this.GetDIVName			= PredictiveInput___GetDIVName;

	this.OnKeyUp			= PredictiveInput___OnKeyUp;
	this.OnBlur				= PredictiveInput___OnBlur;

	this.SetOptions (aOptions);

	gPredictiveInputA[this.mName] = this;
}

function PredictiveInput___SetOptions (aOptions)	
{
	this.mOptions		= aOptions;

	if (this.mOptions == null)
	{
		this.mOptions		= new Array();
	}

	// Already exact?
	if (this.mOptions.length == 1)
	{
		// Exact - Set BG color
		document.all['' + this.GetDIVName() + ''].style.background = this.mExactMatchBG;
	}
	else
	{
		// not Exact - Un-set BG color
		if (document.all['' + this.GetDIVName() + ''])
		{
			document.all['' + this.GetDIVName() + ''].style.background = "";
		}
	}

	//
	// Do we need an index to speed the lookup? Required for
	// all the TRCC players (>200 now)
	//
	if (this.mOptions.length < 20)
	{
		this.mOptionsIndex	= null;
	}
	else
	{
		this.mOptionsIndex	= PredictiveInputOptionsIndex (this.mOptions);
	}
}

function PredictiveInput___GetValue()				{	return (document[this.mForm][this.mName].value);	}
function PredictiveInput___SetValue (aValue)		{	document[this.mForm][this.mName].value = aValue;	}
function PredictiveInput___SetDisplayClass (aClass)	{	this.mDisplayClass = aClass;						}

function PredictiveInput___GetDIVName()
{
	return ("PInput-" + this.mName);
}

function PredictiveInput___HTML()
{
	dwln ("<div id=\"" + this.GetDIVName() + "\">");
	dwln ("    <INPUT type='text' ");

	if (this.mDisplayClass != null)
	{
		dwln ("class=\"" + this.mDisplayClass + "\" ");
	}

	dwln (			"size='"		+ this.mLength		+ "' "	+ 
					"maxlength='"	+ this.mMaxLength	+ "' "	+ 
					"name='"		+ this.mName		+ "' "	+
					"onkeyup='PI_OKU (\"" + this.mName	+ "\")' " +
					"onblur='PI_BLUR (\"" + this.mName	+ "\")' " +
					">");

	dwln ("</div>");
}

//
// The meat ...
//
function PredictiveInput___OnKeyUp ()
{
	var lCurVal=this.GetValue();

	// Was the backspace key pressed?
	if (window.event.keyCode == 8)
	{
		// Adjust the value in the text panel. Done because we dont 
		// place the insertion point correctly ....

		// alert ("lCurVal = " + lCurVal);
	}
	else if (window.event.keyCode == 9)
	{
		// Ignore tabs
	}
	else if ((window.event.keyCode == 16)	||
			 (window.event.keyCode == 17)	||
			 (window.event.keyCode == 18))
	{
		// Ignore shift, ctrl & alt key presses
	}
	else
	{
		// Look for a match
		var lPartial=this.getPartialMatch (lCurVal);

		if (lPartial != null)
		{
			this.SetValue (lPartial.mValue);

			if (lCurVal.length < lPartial.mValue.length)
			{
				// Set selection range on the data
				setInputSelection (document[this.mForm][this.mName], lCurVal.length, lPartial.mValue.length)
			}

			// Exact ?
			if (lPartial.mExact)
			{
document.all['' + this.GetDIVName() + ''].style.background = this.mExactMatchBG;
// alert ("** Exact **");
			}

			// Callback ...
			if (this.mchangeCB != null)
			{
				this.mchangeCB (this.mchangeCBParam);
			}
		}
		else if ((this.mCapitalFirstLetter) && (lCurVal.length > 0))
		{
			var lFirstLetter=lCurVal.substr (0, 1);

			if (lFirstLetter != lFirstLetter.toUpperCase())
			{
				this.SetValue (lFirstLetter.toUpperCase() + lCurVal.substr (1));
			}
		}
	}

	return (false);
}

function PredictiveInput___OnBlur()
{
	var lRet=true;

/*
	if (this.mStrictMatch)
	{
		// Make sure we have an exact match - Note: does not work correctly
		var lM=this.getPartialMatch (this.GetValue());

		if (!lM.mExact)
		{
			alert ("Not an exact match - Please re-enter");
			return (false);
		}
	}
*/

	// Make sure BG is as before
	document.all['' + this.GetDIVName() + ''].style.background = "";

	if (this.mblurCB != null)
	{
		lRet = this.mblurCB (this.mblurCBParam);
	}

	return (lRet);
}

function PredictiveInput___getPartialMatch (aText)
{
	var lText=aText.toLowerCase();
	var lRet=null;

	if (lText.length > 0)
	{
		var lBeginSearch=0;
		var lEndSearch=this.mOptions.length;

		//
		// Do we have an index?
		//
		if (this.mOptionsIndex != null)
		{
			var lA="a";
			var lBO=lA.charCodeAt (0);
			var lKey=lText.charCodeAt(0) - lBO;

			if ((lKey < this.mOptionsIndex.length) && (lKey >= 0))
			{
				lBeginSearch	= this.mOptionsIndex[lKey][0];
				lEndSearch		= this.mOptionsIndex[lKey][1];
			}
		}

		for (var i=lBeginSearch ; i<lEndSearch ; i++)
		{
			var lComp=this.mOptions[i].substring (0, lText.length);

			if (lComp.toLowerCase() == lText)
			{
				// lRet = this.mOptions[i];
				lRet = new PredictiveResult (this.mOptions[i])

				//
				// Is this as exact match?
				//
				if ((i+1) == lEndSearch)
				{
					// alert ("Exact");
					lRet.mExact = true;
				}
				else if (this.mOptions[i+1].substring (0, lText.length).toLowerCase() != lText)
				{
					// alert ("Another Exact");
					lRet.mExact = true;
				}

				break;
			}
		}
	}

	return (lRet);
}

function PI_OKU (aPIName)	{	return (gPredictiveInputA[aPIName].OnKeyUp());	}
function PI_BLUR (aPIName)	{	return (gPredictiveInputA[aPIName].OnBlur());	}
