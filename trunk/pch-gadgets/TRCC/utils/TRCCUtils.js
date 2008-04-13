//-----------------------------[TRCCUtils_ProcessPreferences]-
// Process the user preferences for this page
//
// 	@param 	aPrefName		IN 	"Preference" name. The name 
// 								 should be the same for any 
// 								 Google "UserPrefs" & page 
// 								 query arguments (e.g. "year").
//	@param	aFallbackValue	IN	Fallback value if the preference
//								 cannot be determined by other 
//								 means
//
// @return The preference as a string
//
//------------------------------------------------------------
function TRCCUtils_ProcessPreferences (aPrefName, aFallbackValue)
{
	var lRet="";
	var lPrefs=new _IG_Prefs();
	var lArgs=GGGadget_parseHostQuery();
	
	//
	// Any userPrefs?
	//
	if (null != (lRet = lPrefs.getString (aPrefName)) && (0 != lRet.length))
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
