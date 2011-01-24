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


//----------        -------------------------[GGTRCC_PLYearO]-
// Object to hold information for one year of a player lifetime
// stats
//
// @param aPsyXML	IN 	The <YearData> XML node
//
//------------------------------------------------------------
function GGTRCC_PLYearO (aPsyXML)
{
	//
	// Members
	//
	this.mYear		= aPsyXML.getAttribute ("year");
	
	//
	// Methods
	//
	this.yearHTML	= GGTRCC_PLYearO___yearHTML;
}


function GGTRCC_PLYearO___yearHTML ()
{
	var lRet="";
	
	lRet += "year=" + this.mYear + "<br>";
	
	return (lRet);
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
	this.mGenerated	= null;
	this.mYears		= new Array();
	
	//
	// Methods
	//
	this.playerHTML 		= GGTRCC_PlayerLifetimeO___playerHTML;
	
	//
	// Get the root object
	//
	var lPLS=aPsXML.getElementsByTagName("PlayerStats").item(0);

	//
	// Extract the data from the attributes
	//
	this.mName		= lPLS.getAttribute ("name");
	this.mGenerated	= new Date (lPLS.getAttribute ("generated"));
	
	//
	// Get the years information
	//
	var lYears = lPLS.getElementsByTagName("YearData");
	
	for (var i=0 ; i<lYears.length ; ++i)
	{
		this.mYears[this.mYears.length] = new GGTRCC_PLYearO (lYears[i]);
	}
}


function GGTRCC_PlayerLifetimeO___playerHTML()
{
	var lRet = "";
	
	lRet += "Name = " 		+ this.mName					+ "<br>";
	lRet += "Generated = "	+ this.mGenerated.toString()	+ "<br>";
	
	for (var i=0 ; i<this.mYears.length ; ++i)
	{
		lRet += this.mYears[i].yearHTML();
	}
	
	return (lRet);
}
