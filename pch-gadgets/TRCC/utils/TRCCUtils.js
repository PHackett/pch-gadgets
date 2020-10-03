//-----------------------------[TRCCUtils_ProcessPreferences]-
// Extract an item from the "parent" page URL, based upon the 
// delimiter "/"
//
//	@param	aIndex	IN	Index to extract.
//				0 is the item before the first '/'
//				1 is the item between the first 
//				  & second '/'
//				n ... etc.
//				-1 is whatever comes after the 
//				  last '/'
//				-2 ... is the one before that
//				-n ... etc.
//------------------------------------------------------------
function TRCCUtils_ExtractFromParentByIndex (aIndex)
{
	var lRet="";
	
	//
	// Get the parent
	//
	var lParent=new String (_args()["parent"]);
	//
	// Split the parent
	//
	var lItems = lParent.split("/");
	
	return (lRet);
}

//-----------------------------[TRCCUtils_ProcessPreferences]-
// Process the user preferences for this page
//
// 	@param 	aPrefName		IN 	"Preference" name. The name 
// 								 should be the same for any 
// 								 Google "UserPrefs" & page 
// 								 query arguments (e.g. "year").
//	@param	aPrefObj		IN	The Google 'UserPrefs' object, 
// 								 or null if not to be used. 
//	@param	aFallbackValue	IN	Fallback value if the preference
//								 cannot be determined by other 
//								 means.
//
// @return The preference as a string
//
//------------------------------------------------------------
function TRCCUtils_ProcessPreferences (aPrefName, aPrefObj, aFallbackValue)
{
	var lRet="";
	var lArgs=GGGadget_parseHostQuery();
	
	//
	// Any userPrefs?
	//
	if ((null != aPrefObj) &&  (null != (lRet = aPrefObj.getString (aPrefName)) && (0 != lRet.length)))
	{
		// Preference set in the userPrefs
	}
	
	//
	// How about in the hosting page query?
	//
	else if ((0 != lArgs.length) && (null != (lRet = lArgs[aPrefName])) && (0 != lRet.length))
	{
		// Preference from the page query string
	} 
	else
	{
		//
		// Fall back to a default preference value
		//
		lRet = aFallbackValue;
	}
	
	return (lRet);
}

//------------------------------[GGTRCC_CricketMatch_LoadXML]-
// Load the XML for the specific match
//
//	@param	aYear			IN	The year we want data for
//	@param	aOppo			IN	The opposition
//	@param	aDate			IN	Date (e.g. "12th").
//	@param	aMonth			IN	The month.
// 	@param	aXMLloaderFunc	IN	The funiton to load the XML. 
//	@param	aCallback		IN	The callback to invoike once 
// 								 the XML is loaded. 
//
//------------------------------------------------------------
function TRCCUtils_GetFixtureXML (aYear, aOppo, aDate, aMonth)
{
	//
	// Construct the XML URL for the required data
	//
	var lXMLURL = gGGGadget_Root + "TRCC/data/fixtures/" + aYear + "/" + aMonth.toLowerCase() + "_" + aDate + "_" + GGUtils_SanitizeURL(aOppo).toLowerCase() + ".xml";

	return (lXMLURL);
}


function TRCCUtils_OversAdd (aOne, aTwo)
{
	var lOOne = Math.round (aOne - 0.5);
	var lOTwo = Math.round (aTwo - 0.5);
	var lBOne = (aOne - lOOne) * 10;
	var lBTwo = (aTwo - lOTwo) * 10;

	// Sanity check
	if ((lBOne > 5) || (lBTwo > 5))
	{
		lOOne = lOTwo = 0;
		lBOne = lBTwo = 0;
	}

	var lOvrs=lOOne + lOTwo;
	var lBwls=lBOne + lBTwo;

	if (lBwls > 5.5)
	{
		lOvrs++;
		lBwls -= 6;
	}

	lRet = Math.round ((lOvrs * 10) + lBwls);

	return (lRet / 10);
}

function TRCCUtils_OversToBalls (aOvers)
{
	var lW=Math.floor (aOvers);
	var lP=(aOvers-lW) * 10;

	return ((lW * 6) + lP);
}


function TRCCUtils_RunsPerOver (aRuns, aOvers)
{
	var lRPO=(aRuns/TRCCUtils_OversToBalls (aOvers)) * 6;
	return (GGUtils_numToString (lRPO, 2));
	
}


function TRCCUtils_getStrikeRate (aWickets, aOvers)
{
	var lRet="-";
	
	if (aWickets > 0)
	{
		var lRPO=(TRCCUtils_OversToBalls (aOvers) / aWickets);
		
		lRet = GGUtils_numToString (lRPO, 2);
	}
	
	return (lRet);	
}


//---------------------------------[TRCCUtils_getHTMLAverage]-
// Could be Wickets or completed innings!
//
//------------------------------------------------------------
function TRCCUtils_getAverage (aWickets, aRuns)
{
	var lRet=0.0;

	if (aWickets > 0)
	{
		lRet = aRuns / aWickets;
	}

	return (lRet);	
}


//---------------------------------[TRCCUtils_getHTMLAverage]-
// Could be Wickets or completed innings!
//
//------------------------------------------------------------
function TRCCUtils_getHTMLAverage (aWickets, aRuns)
{
	var lRet="-";

	if (aWickets > 0)
	{
		// 2 decimal places for HTML
		lRet = GGUtils_numToString (TRCCUtils_getAverage (aWickets, aRuns), 2);
	}

	return (lRet);		
}


//------------------------------------[GGTRCC_FixtureO___URL]-
// Get the fixture matchreport URL
//
// @param	aDate	IN	Date of the fixture (Date object)
// @param	aOppo	IN	Opposition name
// @param	aTeam	IN	Which Twyford team is playing? (Saturday, Sunday etc.)
//
// @return The URL of the match report page
//
//------------------------------------------------------------
function TRCCUtils_MakeFixtureURL (aDate, aOppo, aTeam)
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
		lURL += aDate.getFullYear() + "/";
		lURL += aTeam + "/";
		lURL += GGUtils_MonthStringFromDate (aDate).toLowerCase() + "_" +
                GGUtils_GetNumAsOrdinalString (aDate.getDate(), false) + "_" +
				GGUtils_periodsToUnderscores (aOppo.toLowerCase());
	}
	else 
	{
		lURL += "Fixtures/GenericFixture.html?";
		lURL += "month=" + GGUtils_MonthStringFromDate (aDate) + "&";
		lURL += "date="  + GGUtils_GetNumAsOrdinalString (aDate.getDate(), false) + "&";
		lURL += "year="  + aDate.getFullYear() + "&";
		lURL += "oppo="  + aOppo;
	}	
	
	return (GGUtils_spacesToUnderscores(lURL));
}


function TRCCUtils_MakeWorkingHTML (aTitle)
{
	var lHTML="";
	var lWorkingGif=gGGGadget_Root + "TRCC/images/LoadingData.gif";
	var lTitle=aTitle;
	
	if (null == lTitle)
	{
		lTitle = "Working ...";
	}
	
	lHTML += "<table width='100%' border='0'>";
	
	lHTML +=   "<tr align='center'><td>&nbsp;</td></tr>";
	
	lHTML +=   "<tr align='center'>";
	lHTML +=     "<td><image src='" + lWorkingGif + "'></td>";
	lHTML +=   "</tr>";

	lHTML +=   "<tr align='center'><td>&nbsp;</td></tr>";
	
	lHTML +=   "<tr align='center'>";
	lHTML +=     "<td>" + lTitle + "</td>";
	lHTML +=   "</tr>";
	
	lHTML += "</table>";
	
	return (lHTML);
}
