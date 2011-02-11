

//------------------------------[GGTRCC_LoadPlayerRollcallXML]-
// Read the player rollcall XML and add then call the supplied 
// callback. 
//
// 	@param	aXMLloaderFunc	IN	The funiton to load the XML. 
//	@param	aCallback		IN	callback funtion. Takes one
//								 parameter - The XML
//
//------------------------------------------------------------
function GGTRCC_LoadPlayerRollcallXML (aXMLloaderFunc, aCallback)
{
	//
	// XML data for TRCC fixure years
	//
	var lURL = gGGGadget_Root + "TRCC/data/players/Rollcall.xml";
	
	//
	// Get the XML - Callback to function renderData when complete
	//
	aXMLloaderFunc (lURL, aCallback);	
}
