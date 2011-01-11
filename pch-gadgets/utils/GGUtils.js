//
// Local "statics"
//
var sGGUtils___LinkTarget="";


//---------------------------------[GGUtils_MonthNumToString]-
// Get the month number as a string
//
// @param aMonth IN 0 based month number
//
// @return The string name for that month
//
//------------------------------------------------------------
function GGUtils_MonthNumToString (aMonth)
{
    var lMonths=new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

    return (lMonths[aMonth]);
}


//----------------------------[GGUtils_MonthNumToShortString]-
// Get the month number as a string
//
// @param aMonth IN 0 based month number
//
// @return The string name for that month
//
//------------------------------------------------------------
function GGUtils_MonthNumToShortString (aMonth)
{
    var lMonths=new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

    return (lMonths[aMonth]);
}


//------------------------------[GGUtils_MonthStringFromDate]-
// Get the month number as a string
//
// @param aDate IN A javascript date object
//
// @return The string name for that month
//
//------------------------------------------------------------
function GGUtils_MonthStringFromDate (aDate)
{
    return (GGUtils_MonthNumToString (aDate.getMonth()));
}


//-------------------------[GGUtils_ShortMonthStringFromDate]-
// Get the month number as a short string
//
// @param aDate IN A javascript date object
//
// @return The string name for that month
//
//------------------------------------------------------------
function GGUtils_ShortMonthStringFromDate (aDate)
{
    return (GGUtils_MonthNumToShortString (aDate.getMonth()));
}


//-------------------------------------[GGUtils_GetShortYear]-
// Get the year as a short string. I.e 2008 -> "08"
//
// @param aDate IN A javascript date object
//
// @return The string for that year
//
//------------------------------------------------------------
function GGUtils_GetShortYear (aDate)
{
	var lRet = "" + aDate.getFullYear();
	
    return (lRet.substring(2));
}


//-----------------------------------[GGUtils_DOWNumToString]-
// Get the day number as a string
//
// @param aDOW IN The day of the week
//
// @return The string name for that day
//
//------------------------------------------------------------
function GGUtils_DOWNumToString (aDOW)
{
    var lDays=new Array ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

    return (lDays[aDOW]);
}


//-----------------------------[GGUtils_GetDOWStringFromDate]-
// Get the day number as a string
//
// @param aDate IN Date object
//
// @return The string name for that day
//
//------------------------------------------------------------
function GGUtils_GetDOWStringFromDate (aDate)
{
    return (GGUtils_DOWNumToString (aDate.getDay()));
}


//---------------------------------------[GGUtils_GetOrdinal]-
// Get the ordinal string associates with the number.
// i.e. 1 -> "st", 2 -> "nd", 3 -> "rd" etc
//
// @param aNum IN Integer number
//
// @return The string name for that day
//
//------------------------------------------------------------
function GGUtils_GetOrdinal (aNum)
{
	var lRet="th";

    switch (aNum % 10)
    {
        case (1): { if ((aNum % 100) != 11) { lRet = "st"; } break;	}
        case (2): { if ((aNum % 100) != 12) { lRet = "nd"; } break;	}
        case (3): { if ((aNum % 100) != 13) { lRet = "rd"; } break;	}
    }

    return (lRet);
}


//----------------------------[GGUtils_GetNumAsOrdinalString]-
// Get the number as an ordinal string.
// i.e. 1 -> "1st", 2 -> "2nd", 3 -> "3rd" etc
//
// @param aNum IN Integer number
// @param aHTMLSuper IN With HTML superscript
//
// @return The string name for that day
//
//------------------------------------------------------------
function GGUtils_GetNumAsOrdinalString (aNum, aHTMLSuper)
{
	var lRet=aNum + "";
	
	if (aHTMLSuper)
	{
		lRet += "<sup>";
	}
	
	lRet += GGUtils_GetOrdinal (aNum);
	
	if (aHTMLSuper)
	{
		lRet += "</sup>";
	}
	
	return (lRet);
}


//--------------------------------------[GGUtils_numToString]-
// Get a number as a string with a certain precision
//
// @param aNum IN The number to work with
// @param aPrecision IN The precision the number is
// required to be in.
//
// @return The string at the correct precision
//
//------------------------------------------------------------
function GGUtils_numToString (aNum, aPrecision)
{
    var lInt=Math.round (aNum * Math.pow (10, aPrecision)) + "";
    var lIntLen=lInt.length-aPrecision;

    return (lInt.substr (0, lIntLen) + "." + lInt.substr (lIntLen));
}


//------------------------------------[GGUtils_EscapeToHTML]-
// Escape the given string for display in an HTML page
//
// @param aString IN The string to escape
//
// @return The HTML escaped string
//
//------------------------------------------------------------
function GGUtils_EscapeToHTML (aString)
{
    return (aString.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;"));
}


//----------------------------------------[GGUtils_XMLToHTML]-
// Change the given XML in to HTML for rendering on screen
//
// @param aXMLNode IN The XML to render
//
// @return The HTML escaped string
//
//------------------------------------------------------------
function GGUtils_XMLToHTML (aXMLNode)
{
    var lRet="";

    lRet += "<pre>";
    lRet += GGUtils_EscapeToHTML ((new XMLSerializer()).serializeToString(aXMLNode));
    lRet += "</pre>";

    return (lRet);
}

//---------------------------------------[GGUtils_ParseQuery]-
// Parse the "query" part of the URL of th ecurrent page.
//
//	The query is expected to be of the form "name1=value1&name2=value2"
//
//	@param	aQuery		IN		The query to be parsed. If 
// 								 null, then the location is
//								 used.
//	@param	aDelim		IN		Delimeter
//
// @return Array (name, value) of parsed items. 
//
//------------------------------------------------------------
function GGUtils_ParseQuery (aQuery, aDelim)
{
	var lArgs = new Object();
	var lQuery = aQuery;
	var lDelim=aDelim;
	
	if (null == lQuery)
	{
		lQuery = location.search.substring (1);
	}
	
	if (null == lDelim)
	{
		lDelim = "&";
	}
	
	var lPairs = lQuery.split (lDelim);

	for (var i=0 ; i<lPairs.length ; i++)
	{
		var lPos = lPairs[i].indexOf ("=");

		if (lPos != -1)
		{
			var lArgName = lPairs[i].substring (0, lPos);
			var lArgVal  = lPairs[i].substring (lPos + 1);

			lArgs[lArgName] = lArgVal;
		}
	}

	return (lArgs);
}


//------------------------------[GGUtils_spacesToUnderscores]-
// Replace all the spaces in the supplied string with "_" chars.
//
// @param	aS	IN	String to modify
// 
// @return Modified string 
//
//------------------------------------------------------------
function GGUtils_spacesToUnderscores (aS)
{
	return (aS.replace (/ /g, "_"));
}


//------------------------------[GGUtils_periodsToUnderscores]-
// Replace all the '.' in the supplied string with "_" chars.
//
// @param	aS	IN	String to modify
// 
// @return Modified string 
//
//------------------------------------------------------------
function GGUtils_periodsToUnderscores (aS)
{
	return (aS.replace (/\./g, "_"));
}


//--------------------------------------[GGUtils_SanitizeURL]-
// 'Sanitize' the given string (presumed to be an URL) such 
// that the URL is now suitable for Google sites
//
// @param	aS	IN	String to modify
// 
// @return Modified string 
//
//------------------------------------------------------------
function GGUtils_SanitizeURL (aS)
{
	var lRet = GGUtils_periodsToUnderscores (aS);
	
	lRet = GGUtils_spacesToUnderscores (lRet)
	
	return (lRet);
}


//-----------------------------------------[GGUtils_makeHREF]-
// Make the <a href=....> string for the given info
// 
// @param	aString	IN	Displayed string 
// @param	aURL	IN	Target URL 
// @param	aTarget	IN	window target 
//
// @return HTML <a href> string
//
//------------------------------------------------------------
function GGUtils_makeHREF (aString, aURL, aTarget)
{
	var lTarget=aTarget;
	
	if (null == lTarget)
	{
		lTarget = GGUtils_getLinkTarget(); 
	}
	
	var lRet="<a href=";
	
	lRet += "\"" + aURL + "\"";
	
	if (null == lTarget)
	{
		// Nothing else
	}
	else if (0 == lTarget.length)
	{
		// Nothing else
	}
	else
	{
		lRet += " target=\"" + lTarget + "\""; 
	}
	
	lRet += ">";
	lRet += aString;
	lRet += " <" + lTarget + ">";	/// Special to help debug fuckin'g IE problem
	lRet += "</a>"; 
	
	return (lRet);
}


//-----------------------------------[GGUtils_*etLinkTarget]-
// To hold <a href="..." target="******" string
// 
//	Usually expect value to be "", "_parent"or "_blank
//------------------------------------------------------------
function GGUtils_setLinkTarget (aLinkTarget)	{ sGGUtils___LinkTarget = aLinkTarget;	}
function GGUtils_getLinkTarget ()				{ return (sGGUtils___LinkTarget);		}


//---------------------------------------[GGUtils_nbspIfNull]-
// Ready for rendering to HTML, if the supplied value is null
// then return "&nbsp;"
// 
// @return	As described
//------------------------------------------------------------
function GGUtils_nbspIfNull (aValue)
{
	var lRet=aValue;
	
	if (null == lRet)
	{
		lRet = "&nbsp;";
	}
	
	return (lRet);
}


function GGUtils_stripMultipleSpaces (aS)
{
	return (aS.replace (/\s+/g, " "));
}

function GGUtils_trimStringLandR (aS)
{
	return (aS.replace(/^\s+|\s+$/g, ""));
}

function GGUtils_collapseStringSpaces (aS)
{
	var lRet=aS;
	
	lRet = GGUtils_stripMultipleSpaces (lRet);
	lRet = GGUtils_trimStringLandR (lRet);
	
	return (lRet);
} 

function GGUtils_CapitaliseFirstLetter (aString)
{
	return (aString.substr(0, 1).toUpperCase() + aString.substr(1));
}
