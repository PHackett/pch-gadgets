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

var gFixtureVenueAwayImg ="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/VenueAway.gif";
var gFixtureVenueHomeImg ="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/VenueHome.gif";
var gFixtureVenueTourImg ="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/VenueTour.gif";
var gFixtureRainImg      ="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/rain.gif";
var gFixtureWinImg       ="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/greentick.gif";
var gFixtureLoseImg      ="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/redcross.gif";
var gFixtureDrawImg      ="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/equals.png";
var gFixtureCancelledImg ="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/greycross.gif";
var gFixtureAbandonedImg ="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/abandon-cross.png";
var gFixtureTieImg       ="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/tie.gif";

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
	this.mDate    = null;
	this.mOppo    = null;
	this.mTime    = null;
	this.mVenue   = null;
	this.mResult  = gFixtureResNP;
	this.mHasLink = false;
	this.mTeam    = null;	// Special - Added when fixtures from multiple teams are loaded at the same time
	
	//
	// Set up the "methods"
	//
	this.DateString = GGTRCC_FixtureO___DateString;
	this.DateHTML   = GGTRCC_FixtureO___DateHTML;
	this.OppoHTML   = GGTRCC_FixtureO___OppoHTML;
	this.TimeHTML   = GGTRCC_FixtureO___TimeHTML;
	this.VenueHTML  = GGTRCC_FixtureO___VenueHTML;
	this.ResultHTML = GGTRCC_FixtureO___ResultHTML;
	this.TeamHTML   = GGTRCC_FixtureO___TeamHTML;
	this.URL        = GGTRCC_FixtureO___URL;
	this.setTeam    = GGTRCC_FixtureO___setTeam;
	this.getTeam    = GGTRCC_FixtureO___getTeam;
	
	this.isWin = GGTRCC_FixtureO___isWin;
	this.isLose = GGTRCC_FixtureO___isLose;
	
	this.getMatchXMLURL = GGTRCC_FixtureO___getMatchXMLURL;
	
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
	
	if ((1 == (lXMLElement = aFixtureXML.getElementsByTagName ("Time")).length) &&
		(null != lXMLElement[0]) && 
		(null != lXMLElement[0].firstChild))
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
		
		if 		(("Win" == lRes) || ("Won" == lRes)) 	{ this.mResult = gFixtureResWin; 			}
		else if (("Lose" == lRes) || ("Lost" == lRes)) 	{ this.mResult = gFixtureResLose; 			}
		else if ("Draw" == lRes) 						{ this.mResult = gFixtureResDraw; 			}
		else if ("Tie" == lRes) 						{ this.mResult = gFixtureResTie; 			}
		else if ("Rain" == lRes) 						{ this.mResult = gFixtureResRain; 			}
		else if ("Abandonned" == lRes) 					{ this.mResult = gFixtureResAba; 			}
		else if ("NP" == lRes) 							{ this.mResult = gFixtureResWasNotPlayed; 	}
		else if ("Cancelled" == lRes) 					{ this.mResult = gFixtureResCancelled; 		}
	}
	
	if (1 == (lXMLElement = aFixtureXML.getElementsByTagName ("HasLink")).length)
	{
		this.mHasLink = true;
	}
}

function GGTRCC_FixtureO___setTeam (aTeam)	{ this.mTeam = aTeam;	}
function GGTRCC_FixtureO___getTeam()		{ return (this.mTeam);	}


//-----------------------------[GGTRCC_FixtureO___DateString]-
// Get the date as a string
//
//	@param	aUSD		IN	"Use Short Date" 
//
// @return The fixture date as a string
//
//------------------------------------------------------------
function GGTRCC_FixtureO___DateString(aUSD)
{
	var lRet="";
	var lUSD=false;
	
	if (null != aUSD)
	{
		lUSD = aUSD;
	}	
	
	if (null != this.mDate)
	{
		if (lUSD)
		{
			lRet = this.mDate.getDate()
				 + "-"
				 + GGUtils_ShortMonthStringFromDate (this.mDate)
				 + "-"
				 + GGUtils_GetShortYear (this.mDate);
		}
		else
		{
			lRet = GGUtils_MonthStringFromDate (this.mDate)
				 + " "
				 + GGUtils_GetNumAsOrdinalString (this.mDate.getDate(), true);
		
		}
	}	
	return (lRet);	
}

//-------------------------------[GGTRCC_FixtureO___DateHTML]-
// Get the date as HTML
//
//	@param	aUSD		IN	"Use Short Date" 
//
// @return The fixture date as HTML
//
//------------------------------------------------------------
function GGTRCC_FixtureO___DateHTML(aUSD)
{
	var lRet="&nbsp;";
	var lUSD=false;
	
	if (null != aUSD)
	{
		lUSD = aUSD;
	}	
	
	if (null != this.mDate)
	{
		lRet = this.DateString(aUSD);
		
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
	
	if ((gFixtureResNP == this.mResult) && (null != this.mTime))
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
		lRet += "<img src='" + gFixtureVenueAwayImg + "'>";
	}
	else if ("Home" == this.mVenue)
	{
		lRet += "<img src='" + gFixtureVenueHomeImg + "'>";
	}
	else if ("Tour" == this.mVenue)
	{
		lRet += "<img src='" + gFixtureVenueTourImg + "'>";
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
		lRet = "<img src='" + gFixtureWinImg + "' alt='Won'>";
	}
	else if (gFixtureResLose == this.mResult)
	{
		lRet = "<img src='" + gFixtureLoseImg + "' alt='Lost'>";
	}
	else if (gFixtureResDraw == this.mResult)
	{
		lRet = "<img src='" + gFixtureDrawImg + "' alt='Drawn'>";
	}
	else if (gFixtureResTie == this.mResult)
	{
		lRet = "<img src='" + gFixtureTieImg + "' alt='Tie'>";
	}
	else if (gFixtureResRain == this.mResult)
	{
		lRet = "<img src='" + gFixtureRainImg + "' alt='Rained off'>";
	}
	else if (gFixtureResAba == this.mResult)
	{
		lRet = "<img src='" + gFixtureAbandonedImg + "' alt='Abandoned'>";
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
		lRet = "<img src='" + gFixtureCancelledImg + "' alt='Cancelled'>";
	}
	
	return (lRet);
}


//-------------------------------[GGTRCC_FixtureO___TeamHTML]-
// Get the team as HTML
//
// @return The fixture team (Saturdat, Sunday, Youth) as HTML
//
//------------------------------------------------------------
function GGTRCC_FixtureO___TeamHTML()
{
	var lRet="&nbsp;";
	
	if (null != this.getTeam())
	{
		lRet = this.getTeam();
	}
	
	return (lRet);
}


//------------------------------------[GGTRCC_FixtureO___URL]-
// Get the result as HTML
//
// @return The fixture result as HTML
//
//------------------------------------------------------------
function GGTRCC_FixtureO___URL()
{
	var lURL=GGGadget_getHostingRoot();

	if (GGGadget_hostedOnSites())
	{
		// lBaseURL += "FixturesForYear?";
	
		//
		// When rendered on the google-stites website, the match data
		// pages are at the following location
		// 	
		lURL += "All-Fixtures/";
		lURL += this.mDate.getFullYear() + "/";
		lURL += this.getTeam() + "/";
		lURL += GGUtils_MonthStringFromDate (this.mDate).toLowerCase() + "_" +
                GGUtils_GetNumAsOrdinalString (this.mDate.getDate(), false) + "_" +
				GGUtils_periodsToUnderscores (this.mOppo.toLowerCase());
	}
	else 
	{
		lURL += "Fixtures/GenericFixture.html?";
		lURL += "month=" + GGUtils_MonthStringFromDate (this.mDate) + "&";
		lURL += "date="  + GGUtils_GetNumAsOrdinalString (this.mDate.getDate(), false) + "&";
		lURL += "year="  + this.mDate.getFullYear() + "&";
		lURL += "oppo="  + this.mOppo;
	}	
	
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
//	@param	aTeam		IN	What team is this information for? ("Saturday", "Sunday", etc)
//	@param	aOut		IN	The array of Fixture objects we are 
// 							 to append to
//
// @return 	Number of fixtures read in, or -1 upon error 
//
//------------------------------------------------------------
function GGTRCC_LoadFixturesFromXML (aXML, aTeam, aOut)
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
		var lFix = new GGTRCC_FixtureO (lFixtures[i]);
		
		lFix.setTeam(aTeam);
		
		aOut[aOut.length] = lFix;
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
		lRet = (aFixture1.mDate.getTime() - aFixture2.mDate.getTime());
	}
	
	return (lRet);
}


//----------------------------[GGTRCC_LoadTeamYearFixtureXML]-
// Load the XML for the fixtures for a specific year & team.
//
//	@param	aYear			IN	The year we want data for
//	@param	aTeam			IN	The team we want data for
// 	@param	aXMLloaderFunc	IN	The funiton to load the XML. 
//	@param	aCallback		IN	The callback to invoke once 
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
//	@param	aFixtures		IN	The fixtures. 
//	@param	aUSD			IN	"Use Short Date" - Compressed output 
//	@param	aDisplayTeam	IN	Sould we render the team name?
//
//	@return	The HTML
//
//------------------------------------------------------------
function GGTRCC_FixturesToHTML (aFixtures, aUSD, aDisplayTeam)
{
	var lUSD=false;
	
	if (null != aUSD)
	{
		lUSD = aUSD;
	}
	
	var lDisplayTeam=true;
	
	if (null != aDisplayTeam)
	{
		lDisplayTeam = aDisplayTeam;
	}
	
	//
	// Start building HTML string that will be displayed in <div>.
	//
	var lHTML = "<table border='0' cellpadding='2' cellspacing='0' width='100%'";
	
	if (aUSD)
	{
		lHTML += " class='GadgetSmallText'";
	}
	
	lHTML += ">";
	
	//
	// Down all the fixtures
	//
	for (var i=0 ; i<aFixtures.length ; ++i)
	{
		//
		// Start the <tr>
		//
		lHTML += (i % 2) ? "<tr>" : "<tr class='GadgetFixtureAltLine'>";

		if (aUSD)
		{
			//
			// Add in the data
			//
			lHTML += "<td rowspan=\"2\">" + aFixtures[i].VenueHTML()    					+ "</td>";
			lHTML += "<td>" + aFixtures[i].TeamHTML() + " " + aFixtures[i].DateString(lUSD)	+ "</td>";
			lHTML += "<td rowspan=\"2\">" + aFixtures[i].ResultHTML()   					+ "</td>";
			
			lHTML += "</tr>";
			
			lHTML += (i % 2) ? "<tr>" : "<tr class='GadgetFixtureAltLine'>";
			lHTML += "<td>" + aFixtures[i].OppoHTML()										+ "</td>";
		}
		else
		{
			//
			// Add in the data
			//
			lHTML += "<td>" + aFixtures[i].VenueHTML()    + "</td>";
			
			if (lDisplayTeam)
			{
				lHTML += "<td>" + aFixtures[i].TeamHTML()     + "</td>";
			}
			else
			{
				lHTML += "<td>&nbsp;</td>";			
			}
			
			lHTML += "<td>" + aFixtures[i].DateHTML(lUSD) + "</td>";
			lHTML += "<td>" + aFixtures[i].OppoHTML()     + "</td>";
			lHTML += "<td>" + aFixtures[i].TimeHTML()     + "</td>";
			lHTML += "<td align='right'>" + aFixtures[i].ResultHTML()   + "</td>";
		}
		
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


//--------------------[GGTRCC_GetMatchDataXMLURLFromLocation]-
// Return the URL for match report XML file from the URL of the
// page that the gadget is embedded in. 
//
// @return The URL of the XML match data
//------------------------------------------------------------
function GGTRCC_GetMatchDataXMLURLFromLocation ()
{
	var lXMLURL=gGGGadget_Root + "TRCC/data/fixtures/";
	
	lXMLURL += GGTRCC_YearFromSitesURL() + "/";
	lXMLURL += GGTRCC_MatchInfoFromSitesURL() + ".xml";
	
	return (lXMLURL);
}


//----------------------------------[GGTRCC_YearFromSitesURL]-
// Get the year from the currect Google Sites URL.
// 
// The sort of URL we expect is -
// 
// http://sites.google.com/a/trcc.paulhackett.com/trcc-cricket-club/All-Fixtures/2007/Sunday
//
//	@return	The year as a string
//
//------------------------------------------------------------
function GGTRCC_YearFromSitesURL ()
{
	return (GGTRCC_ItemFromSitesURL (0));
}


//----------------------------------[GGTRCC_TeamFromSitesURL]-
// Get the DOW from the currect Google Sites URL.
// 
// The sort of URL we expect is -
// 
// http://sites.google.com/a/trcc.paulhackett.com/trcc-cricket-club/All-Fixtures/2007/Sunday
//
//	@return	The DOW as a string
//
//------------------------------------------------------------
function GGTRCC_TeamFromSitesURL ()
{
    //
    // Capitalise the first letter for ease of page creation.
    // The Team name should always start with a Capital letter,
    // i.e. "Sunday" not "sunday"
    //
	return (GGUtils_CapitaliseFirstLetter (GGTRCC_ItemFromSitesURL (1)));
}


//-----------------------------[GGTRCC_MatchInfoFromSitesURL]-
// Get the DOW from the currect Google Sites URL.
// 
// The sort of URL we expect is -
// 
// http://sites.google.com/a/trcc.paulhackett.com/trcc-cricket-club/All-Fixtures/2007/Sunday/may-5-sonning
//
//	@return	The DOW as a string
//
//------------------------------------------------------------
function GGTRCC_MatchInfoFromSitesURL ()
{
	return (GGTRCC_ItemFromSitesURL (2));
}


//----------------------------------[GGTRCC_ItemFromSitesURL]-
// Get an item from the currect Google Sites URL.
// 
// The sort of URL we expect is -
// 
// http://sites.google.com/a/trcc.paulhackett.com/trcc-cricket-club/All-Fixtures/2007/Sunday
//
//	@return	The item as a string
//
//------------------------------------------------------------
function GGTRCC_ItemFromSitesURL (aItem)
{
	var lRet="";
	var lURL=GGGadget_getHostURL();
	
	//
	// Now this is a bit nasty ....
	// Sometimes we go to Google sites with https as opposed
	// to http. So, take car when chopping up the URL
	//
	var lDataRoot=GGGadget_GetSitesRootNoScheme() + "All-Fixtures/";
	var lIndex = lURL.indexOf (GGGadget_GetSitesRootNoScheme());

	if (-1 == lIndex)
	{
		//
		// OK- Something has gone seriously wrong here ...
		//
	}	
	else if (lURL.length > (lDataRoot.length + lIndex))
	{
		var lPath=lURL.substr(lDataRoot.length + lIndex);
		var lA=lPath.split ("/");
		
		if (lA.length > aItem)
		{
			lRet = lA[aItem];
		}
	}
	
	return (lRet);
}

function GGTRCC_FixtureO___getMatchXMLURL ()
{
	return (TRCCUtils_GetFixtureXML (this.mDate.getFullYear(), this.mOppo, GGUtils_GetNumAsOrdinalString (this.mDate.getDate(), false), GGUtils_MonthStringFromDate (this.mDate)));
}
