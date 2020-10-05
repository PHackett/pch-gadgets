//
// Some statics for my Google gadgets
//
var gGGGadget_Root="http://rawgit.com/PHackett/pch-gadgets/master/pch-gadgets/";

var gGGGadget_NoSchemeSitesRoots = 
	[ 
		"://sites.google.com/a/trcc.paulhackett.com/trcc-cricket-club/", 
		"://sites.twyfordcc.org.uk/",
		"://www.twyfordcc.org.uk/",						// The default site is now on sites
		"://sites.google.com/a/twyfordcc.org.uk/home/"
	];

var gGGGadget_HomeRoot="http://trcc.paulhackett.com/TRCCweb/twyford-google/";
var gGGGadget_PlusNetRoot="http://www.paulhackett.plus.com/websites/trcc/";
var gGGGadget_GoogleSVNRoot="http://twyfordweb.googlecode.com/svn/trunk/";

var gGGGadget_LoadingHTML="<div class=\"loading\">Loading...</div>";


function GGGadget_GetSitesRootNoScheme ()
{
	var lRet = "";
	
	for (var i=0 ; i<gGGGadget_NoSchemeSitesRoots.length ; ++i)
	{
		if (-1 != GGGadget_getHostURL().indexOf(gGGGadget_NoSchemeSitesRoots[i]))
		{
			lRet = gGGGadget_NoSchemeSitesRoots[i];
			
			break;
		}
	}
	
	return (lRet);
}


//--------------------------------------[GGGadget_getHostURL]-
// Obtain (if possible) the URL of the page in which the 
// gadget is embedded
//
// @param	aIncludeQuery	IN		Return the ?query string as well?
//
// @return The URL of the hosting page, else the empty string 
//
//------------------------------------------------------------
function GGGadget_getHostURL (aIncludeQuery)
{
	var lIncludeQuery=false;
	var lIndex=-1;
	
	if (null != aIncludeQuery)
	{
		lIncludeQuery = aIncludeQuery;
	}
	
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
	// var lRet=document.referrer;
	
	//
	// And "document.referrer" stopped working for us in October 20202 on 
	// the Chrome browser (Still OK in Firefox).
	//
	// So we shall another way ...
	//
	var lRet=_args()["parent"]
	
	if (null == lRet)
	{
		lRet = "";
	}
	else if (lIncludeQuery)
	{
		// We are done
	}
	else if (-1 == (lIndex = lRet.indexOf("?")))
	{
		// No "?"
	}
	else
	{
		lRet = lRet.substr (0, lIndex);
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
	var lURL = GGGadget_getHostURL(true);
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
	//
	// We are, for some reason, sometimes using https (as opposed 
	// to http on Google sites. So, a special test required here
	//
	var lRet=false;
	
	if (0 != GGGadget_GetSitesRootNoScheme().length)
	{
		lRet = true;
	}
	
	return (lRet);
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
	var lSitesNoScheme = GGGadget_GetSitesRootNoScheme();
	
	if (0 != lSitesNoScheme.length)
	{
		lRet = "http" + lSitesNoScheme;
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


//---------------------------------[GGGadget_getUrlMinusRoot]-
// Get the the URL of the current page, minus the host root 
//
//	@return The path inside the root
//
//------------------------------------------------------------
function GGGadget_getUrlMinusRoot ()
{
	var lRet="";
	var lURL=GGGadget_getHostURL();
	
	//
	// Now this is a bit nasty ....
	// Sometimes we go to Google sites with https as opposed
	// to http. So, take car when chopping up the URL
	//
	var lDataRoot=GGGadget_GetSitesRootNoScheme();
	var lIndex = lURL.indexOf (lDataRoot);

	if (-1 == lIndex)
	{
		//
		// OK- Something has gone seriously wrong here ...
		//
	}	
	else if (lURL.length > (lDataRoot.length + lIndex))
	{
		lRet = lURL.substr(lDataRoot.length + lIndex);
	}
	
	return (lRet);	
}
