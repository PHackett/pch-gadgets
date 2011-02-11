
var gGGTRCC_Player___Array = new Array();

function GGTRCC_Player_A()
{
	return (gGGTRCC_Player___Array);
}

function gGGTRCC_Player___sort (aA, aB)
{
	var lRet=0;
	
	if (aA.mSurname != aB.mSurname)
	{
		lRet = (aA.mSurname > aB.mSurname);
	}
	else
	{
		lRet = (aA.mFirstname > aB.mFirstname);
	}
	
	return (lRet);
}


//--------------------------------------------[GGTRCC_Player]-
// Object describing a single TRCC player
//
//	@param	aXML	IN	The XML for that player
//------------------------------------------------------------
function GGTRCC_Player (aPlayerXML)
{
	//
	// Note that there can be more in the XML that just the 
	// Firstname & Surname (see the file Rollcall.xml for details), 
	// but that data is of dubious trustworthyness so we shall 
	// ignore it here.
	//
	this.mFirstname = aPlayerXML.getAttribute ("firstname");
	this.mSurname	= aPlayerXML.getAttribute ("surname");
	
	//
	// Methods
	//
	this.Name		= GGTRCC_Player___Name;
	this.Canonical	= GGTRCC_Player___Canonical;
}


function GGTRCC_Player___Name ()
{
	return (this.mFirstname + " " + this.mSurname);
}


//-----------------------------[GGTRCC_Player______Canonical]-
// Get the player name in a canonical form, suitable for 
// the XML filename & the sites page name 
//
//------------------------------------------------------------
function GGTRCC_Player___Canonical ()
{
	var lRet="";
		
	lRet += this.mSurname + "_" + this.mFirstname;
		
	//
	// Remove illegal filename chars
	//
	lRet = lRet.replace (/\(/g, "_");
	lRet = lRet.replace (/\)/g, "_");
		
	//
	// Trim trailing "_"
	//
	if (lRet[lRet.length - 1] == "_")
	{
		lRet = lRet.substring (0, lRet.length - 1);
	}
	
	return (lRet.toLowerCase());
	
}


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


//------------------------------[GGTRCC_LoadPlayerRollcallXML]-
// Parse all the players into an array
//
//	@param	aXML	IN	The Rollcall XML in all it's glory
//------------------------------------------------------------
function GGTRCC_ParsePlayerRollcallXML (aXML)
{
	var lPlayers = aXML.getElementsByTagName("Player");
	
	for (i=0 ; i<lPlayers.length ; ++i)
	{
		gGGTRCC_Player___Array[gGGTRCC_Player___Array.length] = new GGTRCC_Player (lPlayers[i]);
	}
	
	gGGTRCC_Player___Array.sort (gGGTRCC_Player___sort);
}


//--------------------------------[GGTRCC_GetPlayerIndexHTML]-
// Generate the HTML got the A-Z players index
//
//	@param	aXML	IN	The Rollcall XML in all it's glory
//------------------------------------------------------------
function GGTRCC_GetPlayerIndexHTML (aPlayers)
{
	var lRet="";
	var lAlpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var lAindex=0;

	for (i=0 ; i<aPlayers.length ; i++)
	{
		var lSfl=aPlayers[i].mSurname.substring (0, 1).toUpperCase();

		while (lAlpha.substring (lAindex, lAindex+1) < lSfl)
		{
			lRet += lAlpha.substring (lAindex, lAindex+1).toLowerCase() + "&nbsp;";
			lAindex++;
		}

		if (lAlpha.substring (lAindex, lAindex+1) == lSfl)
		{
			lRet += "<a href=\"#" + lAlpha.substring (lAindex, lAindex+1) + "\">" +
								    lAlpha.substring (lAindex, lAindex+1) + "<a>";
			lAindex++;
		}
	}

	// write out trailing letters ...
	for (i=lAindex ; i<lAlpha.length ; i++)
	{
		lRet += lAlpha.substring (i, i+1).toLowerCase() + "&nbsp;";
	}

	return (lRet);
}
