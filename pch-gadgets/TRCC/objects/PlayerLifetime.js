//
// This file contains methods for parsing & rendering of the lifetime stats for individual players
//

function GGTRCC_PlayerLifetime_GetXMLURLFromName (aFirstName, aSurname)
{
	var lXMLURL=gGGGadget_Root + "TRCC/data/players/";
	
	var lFilename = aSurname + "_" + aFirstName + ".xml";
	
	lXMLURL += lFilename.toLowerCase();
	
	return (lXMLURL);
}


function GGTRCC_PlayerLifetime_GetXMLURLFromLocation()
{
	var lXMLURL=gGGGadget_Root + "TRCC/data/players/";
	var lPath=GGGadget_getUrlMinusRoot ();
	var lA=lPath.split("/");
	var lPlayerName=lA[lA.length - 1];
	
	
	lXMLURL += lPlayerName.toLowerCase() + ".xml";
	
	return (lXMLURL);
}


//-----------------------------------[GGTRCC_PlayerLifetimeO]-
// Object to hold player lifetime stats
//
// @param aCricketMatchXML	IN 	The <PlayerStats> XML node
//
//------------------------------------------------------------
function GGTRCC_PlayerLifetimeO (aPsXML)
{
	//
	// Members
	//
	this.mName		= null;
	this.Generated	= null;
	
	//
	// Get the root object
	//
	var lPLS=aPsXML.getElementsByTagName("PlayerStats").item(0);

	//
	// Extract the data from the attributes
	//
	this.mName		= lPLS.getAttribute ("name");
	this.Generated	= new Date (lPLS.getAttribute ("generated"));
	
	//
	// Methods
	//
	this.playerHTML 		= GGTRCC_PlayerLifetimeO___playerHTML;
}


function GGTRCC_PlayerLifetimeO___playerHTML()
{
	var lRet = "";
	
	lRet += "Name = " 		+ this.mName			+ "<br>";
	lRet += "Generated = "	+ this.mDate.toString()	+ "<br>";
	
	return (lRet);
}
