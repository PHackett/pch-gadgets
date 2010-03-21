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
	var lXMLURL = gGGGadget_Root + "TRCC/data/fixtures/" + aYear + "/" + aMonth + "_" + aDate + "_" + GGUtils_spacesToUnderscores(aOppo) + ".xml";

	return (lXMLURL);
}
