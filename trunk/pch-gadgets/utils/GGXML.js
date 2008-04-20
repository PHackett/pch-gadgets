
var GGXML___xmlhttpO;
var GGXML___callbackFn;


//-----------------------------------------[GGXML_loadXMLDoc]-
// Load the XML document & invoke the callback
// 
//	@param	aURL		IN	URL to load
//	@param	aCallback	IN	Callback function
//
//	@return Empty string upon success, else error message
//
//------------------------------------------------------------
function GGXML___processStateChange()
{
	if (4 != GGXML___xmlhttpO.readyState)
	{
		//
		// Not ready yet ...
		//
	}
	else if (200 != GGXML___xmlhttpO.status)
	{
		//
		// Some problem retrieving the data
		//
		alert("Problem retrieving XML data:" + GGXML___xmlhttpO.statusText);
	}
	else
	{
		//
		// We're hot - Do the callback
		//
		GGXML___callbackFn (GGXML___xmlhttpO.responseXML);
	}
}


//-----------------------------------------[GGXML_loadXMLDoc]-
// Load the XML document & invoke the callback
// 
//	@param	aURL		IN	URL to load
//	@param	aCallback	IN	Callback function
//
//	@return Empty string upon success, else error message
//
//------------------------------------------------------------
function GGXML_loadXMLDoc (aURL, aCallback)
{
	var lRet="";
	
	GGXML___xmlhttpO	= null;
	GGXML___callbackFn	= aCallback;
	
	if (window.XMLHttpRequest)
	{
		// 
		// code for IE7, Firefox, Opera, etc.
		//
		GGXML___xmlhttpO = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		// 
		// code for IE6, IE5
		//
		GGXML___xmlhttpO = new ActiveXObject ("Microsoft.XMLHTTP");
	}
	
	if (GGXML___xmlhttpO != null)
	{
		GGXML___xmlhttpO.onreadystatechange = GGXML___processStateChange;
		GGXML___xmlhttpO.open ("GET", aURL, true);
		GGXML___xmlhttpO.send (null);
	}
	else
	{
		alert("Your browser does not support XMLHTTP.");
	}
}
