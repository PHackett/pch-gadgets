//
// Some statics for my Google gadgets
//
var gGGGadget_Root="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/";

var gGGGadget_SitesRoot="http://sites.google.com/a/trcc.paulhackett.com/trcc-cricket-club/";
var gGGGadget_HomeRoot="http://trcc.paulhackett.com/TRCCweb/twyford-google/";
var gGGGadget_PlusNetRoot="http://www.paulhackett.plus.com/websites/trcc/";
var gGGGadget_GoogleSVNRoot="http://twyfordweb.googlecode.com/svn/trunk/";

var gGGGadget_LoadingHTML="<div class=\"loading\">Loading...</div>";


//--------------------------------------[GGGadget_getHostURL]-
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


//---------------------------------[GGGadget_parseHostQuery]-
// Parse the query parameters from the hosting page 
//
//	@param	aDelim	IN	Delimiter to use in the query
//
// @return Associative array of items 
//
//-----------------------------------------------------------
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


//-----------------------------------[GGGadget_hostedOnSites]-
// Is the gadget being hosted on the given site? 
//
//	@param	aSite	IN		Site to test for
//
//	@return true if so, else false 
//
//------------------------------------------------------------
function GGGadget_hostedOn (aSite)
{
	var lRet=false;
	var lIndex=GGGadget_getHostURL().indexOf(aSite);

	if (0 == lIndex)
	{
		lRet = true;
	}	
	
	return (lRet);
}


//-----------------------------------[GGGadget_hostedOnSites]-
// Is the gadget being hosted on google sites? 
//
//	@return true if so, else false 
//
//------------------------------------------------------------
function GGGadget_hostedOnSites ()
{
	return (GGGadget_hostedOn (gGGGadget_SitesRoot));
}


//------------------------------------[GGGadget_hostedAtHome]-
// Is the gadget being hosted on on my home computer? 
//
//	@return true if so, else false 
//
//------------------------------------------------------------
function GGGadget_hostedAtHome ()
{
	return (GGGadget_hostedOn (gGGGadget_HomeRoot));
}


//-------------------------------[GGGadget_hostedAtGoogleSVN]-
// Is the gadget being hosted on Google under SVN?
//
//	@return true if so, else false 
//
//------------------------------------------------------------
function GGGadget_hostedAtGoogleSVN ()
{
	return (GGGadget_hostedOn (gGGGadget_GoogleSVNRoot));
}


//---------------------------------[GGGadget_hostedAtPlusNet]-
// Is the gadget being hosted at PlusNet (obsolete).
//
//	@return true if so, else false 
//
//------------------------------------------------------------
function GGGadget_hostedAtPlusNet ()
{
	return (GGGadget_hostedOn (gGGGadget_PlusNetRoot));
}


//----------------------------------[GGGadget_getHostingRoot]-
// Get the root - Where the current gadget is being 'hosted',
// i.e. where in what page is the gadget embeded? 
//
//	@return The host root
//
//------------------------------------------------------------
function GGGadget_getHostingRoot ()
{
	var lRet = gGGGadget_GoogleSVNRoot;
	
	if (GGGadget_hostedOnSites())
	{
		lRet = gGGGadget_SitesRoot;
	}
	else if (GGGadget_hostedAtHome())
	{
		lRet = gGGGadget_HomeRoot;
	}
	else if (GGGadget_hostedAtPlusNet())
	{
		lRet = gGGGadget_PlusNetRoot;
	}
	
	return (lRet);
}
