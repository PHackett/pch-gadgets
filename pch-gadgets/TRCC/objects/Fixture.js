//
// Global variables
//
var gFixtureResWin = "W";
var gFixtureResLose = "L";
var gFixtureResDraw = "D";
var gFixtureResTie = "T";
var gFixtureResRain = "R";
var gFixtureResAba = "A";
var gFixtureResNP = "N";
var gFixtureResWasNotPlayed = "U";
var gFixtureResCancelled = "C";

var gFixtureVenueAway="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/VenueAway.gif";
var gFixtureVenueHome="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/VenueHome.gif";
var gFixtureVenueTour="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/VenueTour.gif";



//------------------------------------------[GGTRCC_FixtureO]-
// Object to hold information on a single fixture
//
// @param aFixtureXML IN The fixture XML node
//
//------------------------------------------------------------
function GGTRCC_FixtureO (aFixtureXML)
{
	//
	// Initialse the members
	//
	this.mDate = null;
	this.mOppo = null;
	this.mTime = null;
	this.mVenue = null;
	this.mResult = gFixtureResNP;
	this.mHasLink = false;
	
	//
	// Set up the "methods"
	//
	this.DateHTML = GGTRCC_FixtureO___DateHTML;
	this.OppoHTML = GGTRCC_FixtureO___OppoHTML;
	this.TimeHTML = GGTRCC_FixtureO___TimeHTML;
	this.VenueHTML = GGTRCC_FixtureO___VenueHTML;
	this.ResultHTML = GGTRCC_FixtureO___ResultHTML;
	
	this.isWin = GGTRCC_FixtureO___isWin;
	this.isLose = GGTRCC_FixtureO___isLose;
	
	//
	// Process the items of the XML
	//
	var lXMLElement;
	
	if (1 == (lXMLElement = aFixtureXML.getElementsByTagName ("Date")).length)
	{
		this.mDate = new Date (lXMLElement[0].firstChild.nodeValue);
	}
	
	if (1 == (lXMLElement = aFixtureXML.getElementsByTagName ("Opposition")).length)
	{
		this.mOppo = lXMLElement[0].firstChild.nodeValue;
	}
	
	if (1 == (lXMLElement = aFixtureXML.getElementsByTagName ("Time")).length)
	{
		this.mTime = lXMLElement[0].firstChild.nodeValue;
	}
	
	if (1 == (lXMLElement = aFixtureXML.getElementsByTagName ("Venue")).length)
	{
		this.mVenue = lXMLElement[0].firstChild.nodeValue;
	}
	
	if (1 == (lXMLElement = aFixtureXML.getElementsByTagName ("Result")).length)
	{
		var lRes=lXMLElement[0].firstChild.nodeValue;
		
		if ("Win" == lRes) { this.mResult = gFixtureResWin; }
		else if ("Lose" == lRes) { this.mResult = gFixtureResLose; }
		else if ("Draw" == lRes) { this.mResult = gFixtureResDraw; }
		else if ("Tie" == lRes) { this.mResult = gFixtureResTie; }
		else if ("Rain" == lRes) { this.mResult = gFixtureResRain; }
		else if ("Abandonned" == lRes) { this.mResult = gFixtureResAba; }
		else if ("NP" == lRes) { this.mResult = gFixtureResWasNotPlayed; }
		else if ("Cancelled" == lRes) { this.mResult = gFixtureResCancelled; }
	}
	
	if (1 == (lXMLElement = aFixtureXML.getElementsByTagName ("HasLink")).length)
	{
		this.mHasLink = true;
	}
}


//-------------------------------[GGTRCC_FixtureO___DateHTML]-
// Get the date as HTML
//
// @return The fixture date as HTML
//
//------------------------------------------------------------
function GGTRCC_FixtureO___DateHTML()
{
	var lRet="&nbsp;";
	
	if (null != this.mDate)
	{
		lRet = GGUtils_MonthStringFromDate (this.mDate)
			 + " "
			 + GGUtils_GetNumAsOrdinalString (this.mDate.getDate(), true);
	}
	
	return (lRet);
}


//-------------------------------[GGTRCC_FixtureO___OppoHTML]-
// Get the opposition as HTML
//
// @return The fixture opposition as HTML
//
//------------------------------------------------------------
function GGTRCC_FixtureO___OppoHTML()
{
	var lRet="&nbsp;";
	
	if (null != this.mOppo)
	{
		lRet = this.mOppo;
	}
	
	return (lRet);
}


//-------------------------------[GGTRCC_FixtureO___TimeHTML]-
// Get the fixture time as HTML
//
// @return The fixture time as HTML
//
//------------------------------------------------------------
function GGTRCC_FixtureO___TimeHTML()
{
	var lRet="&nbsp;";
	
	if (null != this.mTime)
	{
		lRet = this.mTime;
	}
	
	return (lRet);
}


//------------------------------[GGTRCC_FixtureO___VenueHTML]-
// Get the venue as HTML
//
// @return The fixture venue as HTML
//
//------------------------------------------------------------
function GGTRCC_FixtureO___VenueHTML()
{
	var lRet="&nbsp;";
	
	if ("Away" == this.mVenue)
	{
		lRet += "<img src='" + gFixtureVenueAway + "'>";
	}
	else if ("Home" == this.mVenue)
	{
		lRet += "<img src='" + gFixtureVenueHome + "'>";
	}
	else if ("Tour" == this.mVenue)
	{
		lRet += "<img src='" + gFixtureVenueTour + "'>";
	}

	return (lRet);
}


//-----------------------------[GGTRCC_FixtureO___ResultHTML]-
// Get the result as HTML
//
// @return The fixture result as HTML
//
//------------------------------------------------------------
function GGTRCC_FixtureO___ResultHTML()
{
	var lRet="&nbsp;";
	
	if (gFixtureResWin == this.mResult)
	{
		lRet = "Win";
	}
	else if (gFixtureResLose == this.mResult)
	{
		lRet = "Lose";
	}
	else if (gFixtureResDraw == this.mResult)
	{
		lRet = "Draw";
	}
	else if (gFixtureResTie == this.mResult)
	{
		lRet = "Tie";
	}
	else if (gFixtureResRain == this.mResult)
	{
		lRet = "Rain";
	}
	else if (gFixtureResAba == this.mResult)
	{
		lRet = "Abandonned";
	}
	else if (gFixtureResNP == this.mResult)
	{
		lRet = "&nbsp;";
	}
	else if (gFixtureResWasNotPlayed == this.mResult)
	{
		lRet = "Not Played";
	}
	else if (gFixtureResCancelled == this.mResult)
	{
		lRet = "Cancelled";
	}
	
	return (lRet);
}


function GGTRCC_FixtureO___isWin() { return (gFixtureResWin == this.mResult); }
function GGTRCC_FixtureO___isLose() { return (gFixtureResLose == this.mResult); }
