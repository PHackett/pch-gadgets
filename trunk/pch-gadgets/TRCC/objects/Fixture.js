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

//
// For the loading of multiple sets of fixture dats
//
var s___multiLoadContext;



//--------------------------------------[___multiLoadContext]-
// Object to hold all info required for the loading of 
// fixtures for multiple years/teams. 
//
//	@param	aYear		IN		Year of interest
//	@param	aTeams		IN		Teams of interest
//	@param	aCallback	IN		Callback to be invoked (eventually)
//
//------------------------------------------------------------
function GGTRCC_Fixture___multiLoadContext (aYear, aTeams, aCallback)
{
	this.mYear 		= aYear;
	this.mTeams		= aTeams;
	this.mCallback	= aCallback;
	
	this.mFixtures	= new Array(0);
	this.mError		= "";
	
	this.callback	= GGTRCC_Fixture___multiLoadContext_Callback;
}


function GGTRCC_Fixture___multiLoadContext_Callback()
{
	this.mCallback (this.mFixtures, this.mError);
}



//------------------------------------------[GGTRCC_FixtureO]-
// Object to hold information on a single fixture.
//
//	A single fixture XML will look like - 
//
//		<Fixture>
//		  <Date>Fri, 9 May 1975 23:00:00 UTC</Date>
//		  <Opposition>Berkshire College</Opposition>
//		  <Venue>Home</Venue>
//		  <Result>Lose</Result>
//		  <HasLink/>
//		</Fixture>
//
// @param aFixtureXML 	IN 	The fixture XML node
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
	this.URL = GGTRCC_FixtureO___URL;
	
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
	
	if ((1 == (lXMLElement = aFixtureXML.getElementsByTagName ("Venue")).length) &&
		(null != lXMLElement[0]) && 
		(null != lXMLElement[0].firstChild))
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
	
		if (this.mHasLink)
		{
			lRet = GGUtils_makeHREF (lRet, this.URL());
		}
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

		if (this.mHasLink)
		{
			lRet = GGUtils_makeHREF (lRet, this.URL());
		}
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


//-----------------------------[GGTRCC_FixtureO___ResultHTML]-
// Get the result as HTML
//
// @return The fixture result as HTML
//
//------------------------------------------------------------
function GGTRCC_FixtureO___URL()
{
	var lBaseURL="http://trcc.paulhackett.com/Fixtures/GenericFixture.html?";
	
	var lURL=lBaseURL;
	
	lURL += "month=" + GGUtils_MonthStringFromDate (this.mDate) + "&";
	lURL += "date="  + GGUtils_GetNumAsOrdinalString (this.mDate.getDate(), false) + "&";
	lURL += "year="  + this.mDate.getFullYear() + "&";
	lURL += "oppo="  + this.mOppo;
	
	return (GGUtils_spacesToUnderscores(lURL));
}

function GGTRCC_FixtureO___isWin() { return (gFixtureResWin == this.mResult); }
function GGTRCC_FixtureO___isLose() { return (gFixtureResLose == this.mResult); }


//
// The following are utility functions to help with the manipulation of Fixture objects
//


//-------------------------------[GGTRCC_LoadFixturesFromXML]-
// Read the fixtures from the supplied XML and add then to the 
// end of the given array.
//
//	@param	aXML		IN	The XML to examine
//	@param	aOut		IN	The array of Fixture objects we are 
// 							 to append to
//
// @return 	Number of fixtures read in, or -1 upon error 
//
//------------------------------------------------------------
function GGTRCC_LoadFixturesFromXML (aXML, aOut)
{
	//
	// Validate the XML
	//
	if ((aXML == null) || (typeof(aXML) != "object") || (aXML.firstChild == null))
	{
		return (-1);
	}

	//
	// Down all the fixtures
	//
	var lFixtures=aXML.getElementsByTagName ("Fixture");
	
	for (var i=0 ; i<lFixtures.length ; ++i)
	{
		aOut[aOut.length] = new GGTRCC_FixtureO (lFixtures[i]);
	}
	
	return (lFixtures.length);
}


//--------------------------------[GGTRCC_SortFixturesByDate]-
// Sorter - Sort by data
//
//	@param	aFixture1	IN	First fixture to compare
//	@param	aFixture2	IN	Second fixture to compare
//
//	@return	aFixture1 > aFixture2 by date
//
//------------------------------------------------------------
function GGTRCC_SortFixturesByDate (aFixture1, aFixture2)
{
	var lRet=0;
	
	if ((null == aFixture1.mDate) && (null == aFixture2.mDate))
	{
		lRet = 0;
	}
	else if (null == aFixture1.mDate)
	{
		return (-1);
	}
	else if (null == aFixture2.mDate)
	{
		return (1);
	}
	else
	{
		lRet = (aFixture1.mDate.UTC() - aFixture2.mDate.UTC());
	}
	
	return (lRet);
}


//----------------------------[GGTRCC_LoadTeamYearFixtureXML]-
// Load the XML for the fixtures for a specific year & team.
//
//	@param	aYear			IN	The year we want data for
//	@param	aTeam			IN	The team we want data for
// 	@param	aXMLloaderFunc	IN	The funiton to load the XML. 
//	@param	aCallback		IN	The callback to invoike once 
// 								 the XML is loaded. 
//
//------------------------------------------------------------
function GGTRCC_LoadTeamYearFixtureXMLByDateAndTeam (aYear, aTeam, aXMLloaderFunc, aCallback)
{
	//
	// Construct the XML URL for the required data
	//
	var lXMLURL = gGGGadget_Root + "TRCC/data/fixtures/" + aYear + "/" + aTeam + "_Fixtures_Data.xml";

	//
	// Fetch the data
	//
	aXMLloaderFunc (lXMLURL, aCallback);
}


//----------------------------[GGTRCC_LoadTeamYearFixtureXML]-
// Load the XML for the fixtures for a specific year & team.
//
//	@param	aPrefObj		IN	The Google 'UserPrefs' object, 
// 								 or null if not to be used.
// 	@param	aXMLloaderFunc	IN	The funiton to load the XML. 
//	@param	aCallback		IN	The callback to invoike once 
// 								 the XML is loaded. 
//
//------------------------------------------------------------
function GGTRCC_LoadTeamYearFixtureXML (aPrefsObj, aXMLloaderFunc, aCallback)
{
	//
	// Determine the year we are interrested in
	//
	var lYear = TRCCUtils_ProcessPreferences ("year", aPrefsObj, "2008");
	
	//
	// Determine the team we are interrested in
	//
	var lTeam = TRCCUtils_ProcessPreferences ("team", aPrefsObj, "Sunday");

	//
	// Load the data
	//
	GGTRCC_LoadTeamYearFixtureXMLByDateAndTeam (lYear, lTeam, aXMLloaderFunc, aCallback);
}


//------------------------------------[GGTRCC_FixturesToHTML]-
// Render the given fixtures in HMTL
//
//	@param	aFixtures	IN	The fixtures. 
//
//	@return	The HTML
//
//------------------------------------------------------------
function GGTRCC_FixturesToHTML (aFixtures)
{
	//
	// Start building HTML string that will be displayed in <div>.
	//
	var lHTML = "<table border='0' cellpadding='5' cellspacing='0' width='100%'>";
	
	//
	// Down all the fixtures
	//
	for (var i=0 ; i<aFixtures.length ; ++i)
	{
		//
		// Start the <tr>
		//
		lHTML += (aIndex % 2) ? "<tr>" : "<tr class='GadgetFixtureAltLine'>";
		
		//
		// Add in the data
		//
		lHTML += "<td>" + aFixture.VenueHTML() + "</td>";
		lHTML += "<td>" + aFixture.DateHTML() + "</td>";
		lHTML += "<td>" + aFixture.OppoHTML() + "</td>";
		lHTML += "<td>" + aFixture.TimeHTML() + "</td>";
		lHTML += "<td>" + aFixture.ResultHTML() + "</td>";
		
		//
		// Terminate the row
		//
		lHTML += "</tr>";
	}
	
	//
	// End the table
	//
	lHTML += "</table>";
	
	return (lHTML);
}
