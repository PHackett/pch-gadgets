//
// Some statics for my Google gadgets
//
var gGGGadget_Root="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/";
var gGGGadget_SitesRoot="http://sites.google.com/a/trcc.paulhackett.com/trcc-cricket-club/";



//---------------------------------------[GGUtils_getHostURL]-
// Obtain (if possible) the URL of the page in which the 
// gadget is embedded
//
// @return The URL of the hosting page, else the empty string 
//
//------------------------------------------------------------
function GGGadget_getHostURL ()
{
	//
	// We used to look at _args()["source"] to find out
	// what page we were embedded in. This worked for gadgets
	// embedded in "vanilla" web pages, bit not for those that
	// were embedded inside Google Sites. 
	//  So, instead we use the document referer which works in
	// both. 
	//  When the gadget is embedded in an iGoogle page, neither
	// technique works.
	//
	// var lRet=_args()["source"];
	var lRet=document.referrer;
	
	if (null == lRet)
	{
		lRet = "";
	}
	
	return (lRet);
}


//-----------------------------------[GGUtils_parseHostQuery]-
// Parse the query parameters from the hosting page 
//
//	@param	aDelim	IN	Delimiter to use in the query
//
// @return Associative array of items 
//
//------------------------------------------------------------
function GGGadget_parseHostQuery (aDelim)
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
		lArgs = GGUtils_ParseQuery (lURL.substring (lIndex+1), aDelim);
	}
	
	return (lArgs);
}


//-------------------------------------[GGUtils_hostedOnSites]-
// Is the gadget being hosted on google sites? 
//
//	@return true if so, else false 
//
//------------------------------------------------------------
function GGGadget_hostedOnSites ()
{
	var lRet=false;
	var lIndex=GGGadget_getHostURL().indexOf(gGGGadget_SitesRoot);

	if (0 == lIndex)
	{
		lRet = true;
	}	
	
	return (lRet);
}
