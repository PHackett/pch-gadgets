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
        case (1): { if ((aNum % 100) != 11) { lRet = "st"; } }
        case (2): { if ((aNum % 100) != 12) { lRet = "nd"; } }
        case (3): { if ((aNum % 100) != 13) { lRet = "rd"; } }
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
