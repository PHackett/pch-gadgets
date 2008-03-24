//
// Some statics for my Google gadgets
//
var gGGGadget_Root="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/";



//---------------------------------------[GGUtils_getHostURL]-
// Obtain (if possible) the URL of the page in which the 
// gadget is embedded
//
// @return The URL of the hosting page, else the empty string 
//
//------------------------------------------------------------
function GGGadget_getHostURL ()
{
	var lRet=_args()["source"];
	
	if (null == lRet)
	{
		lRet = "";
	}
	
	return (lRet);
}


//-----------------------------------[GGUtils_parseHostQuery]-
// Parse the query parameters from the hosting page 
//
// @return Associative array of items 
//
//------------------------------------------------------------
function GGGadget_parseHostQuery ()
{
	var lArgs = new Object();
	var lURL = GGGadget_getHostURL();
	var lIndex=-1;
	
	if (0 == lURL.length)
	{
		// Nothing to do
	}
	else if (-1 == (lIndex = lURL.indexOf("?")))
	{
		// Nothing to do
	}
	else
	{
		lArgs = GGUtils_ParseQuery (lURL(lIndex+1));
	}
	
	return (lArgs);
}