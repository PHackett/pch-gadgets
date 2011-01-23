//
// This file contains methods for parsing & rendering of the lifetime stats for individual players
//
function GGTRCC_PlayerLifetime_GetXMLURLFromLocation()
{
	var lXMLURL=gGGGadget_Root + "TRCC/data/players/";
	
	lXMLURL += GGTRCC_ItemFromSitesURL (0) + ".xml";
	
	return (lXMLURL);
}
