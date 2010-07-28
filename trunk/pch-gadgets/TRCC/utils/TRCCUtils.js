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
	var lXMLURL = gGGGadget_Root + "TRCC/data/fixtures/" + aYear + "/" + aMonth.toLowerCase() + "_" + aDate + "_" + GGUtils_spacesToUnderscores(aOppo).toLowerCase() + ".xml";

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