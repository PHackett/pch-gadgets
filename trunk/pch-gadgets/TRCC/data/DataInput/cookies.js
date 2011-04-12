

///////////////////////////////////////////////////////////////////////////////
// Method		:	MyCookie
//                 
// Description	:	Creates a MyCookie object
//                 
// Parameters	:	IN	aDocument
//				:	IN	aName
//				:	IN	aValue
//				:	IN	aPath
//				:	IN	aExpire		Time to expiration in hours
//				:	IN	aDomain
//				:	IN	aSecure
//                 
// Return		:	N/A
///////////////////////////////////////////////////////////////////////////////
function MyCookie (aDocument, aName, aValue, aPath, aExpire, aDomain, aSecure)
{
	//
	// Member variables
	//
	this.mDocument	= aDocument;
	this.mName		= aName;
	this.mValue		= aValue;

	if (aPath)
	{
		this.mPath = aPath;
	}
	else
	{
		//
		// Default to site wide cookie
		//
		this.mPath = "/";
	}

	if (aExpire)
	{
		this.mExpire = new Date ((new Date()).getTime() + (aExpire * 60 * 60 * 1000));
	}
	else
	{
		this.mExpire = null;
	}

	if (aDomain)
	{
		this.mDomain = aDomain;
	}
	else
	{
		this.mDomain = null;
	}

	if (aSecure)
	{
		this.mSecure = aSecure;
	}
	else
	{
		this.mSecure = null;
	}

	//
	// Methods
	//
	this.Set	= ___SetCookie;
	this.Delete	= ___DeleteCookie;

	// alert ("Created MyCookie, name = " + this.mName + ", value = " + this.mValue);
}


///////////////////////////////////////////////////////////////////////////////
// Method		:	___SetCookie
//                 
// Description	:	Set the cookie on the document
//                 
// Parameters	:	None
//                 
// Return		:	None
///////////////////////////////////////////////////////////////////////////////
function ___SetCookie ()
{
	var lCookieVal="";

	lCookieVal += this.mName + "=" + escape (this.mValue);

	if (this.mExpire)
	{
		lCookieVal += "; expires=" + this.mExpire.toGMTString();
	}

	if (this.mPath)
	{
		lCookieVal += "; path=" + this.mPath;
	}

	if (this.mDomain)
	{
		lCookieVal += "; domain=" + this.mDomain;
	}

	if (this.mSecure)
	{
		lCookieVal += "; secure";
	}

	//
	// On the document
	//
	this.mDocument.cookie = lCookieVal;
}


///////////////////////////////////////////////////////////////////////////////
// Method		:	___DeleteCookie
//                 
// Description	:	Delete this cookie
//                 
// Parameters	:	None
//                 
// Return		:	None
///////////////////////////////////////////////////////////////////////////////
function ___DeleteCookie ()
{
	var lCookie=this.mName + "=";

	if (this.mPath)
	{
		lCookie += "; path=" + this.mPath;
	}

	if (this.mDomain)
	{
		lCookie += "; domain=" + this.mDomain;
	}

	//
	// Set it to pre-expired
	//
	lCookie += "; expires=Fri, 02-Jan-1970 00:00:00 GMT";

	//
	// On the document
	//
	//alert ("Deleting cookie with lCookie = \"" + lCookie + "\"");
	
	this.mDocument.cookie = lCookie;
}

///////////////////////////////////////////////////////////////////////////////
// Method		:	GetMyCookieByName
//                 
// Description	:	Retrieve the named cookie
//                 
// Parameters	:	IN	aDocument	Document ot load from
//				:	IN	aName		Name of the cookie to retrieve
//                 
// Return		:	MyCookie object, or null is not found
///////////////////////////////////////////////////////////////////////////////
function GetMyCookieByName (aDocument, aName)
{
	var lRet=null;
	var lAllCookies=aDocument.cookie;
	var lStart=-1;

	if (lAllCookies == "")
	{
		//
		// No cookies at all
		//
		// alert ("NoCookies at all");
	}
	else if ((lStart = lAllCookies.indexOf (aName + "=")) == -1)
	{
		//
		// Named cookie not found
		//
		// alert ("No cookie named \"" + aName + "\" found");
	}
	else
	{
		//
		// Extract
		//
		lStart += aName.length + 1;

		var lEnd = lAllCookies.indexOf (";", lStart);
		if (lEnd == -1)
		{
			lEnd = lAllCookies.length;
		}

		var lCval = lAllCookies.substring (lStart, lEnd);

		//
		// Create a cookie
		//
		lRet = new MyCookie (aDocument, aName, unescape (lCval));

		// alert ("new cookie read, name = " + lRet.mName + ", val = " + lRet.mValue);
	}

	return (lRet);
}