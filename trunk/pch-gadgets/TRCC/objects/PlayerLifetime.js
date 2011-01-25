//
// This file contains methods for parsing & rendering of the lifetime stats for individual players
//

var gXXXPLBowlingDebug="";


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


//-------------------------------------[GGTRCC_PLBowlingDataO]-
// Object to hold information on a single piece of bowling data 
//
// @param aPsBowlingDataXML	IN 	The <BowlingData> XML node
//
//------------------------------------------------------------
function GGTRCC_PLBowlingDataO (aPsBowlingDataXML)
{
	//
	// Members
	//
	this.mOvers		= aPsBowlingDataXML.getAttribute ("overs");
	this.mMaidens	= aPsBowlingDataXML.getAttribute ("maidens");
	this.mRuns		= aPsBowlingDataXML.getAttribute ("runs");
	this.mWickets	= aPsBowlingDataXML.getAttribute ("wickets");
	
	//
	// Methods
	//
	this.HTML		= GGTRCC_PLBowlingDataO___HTML;
}


function GGTRCC_PLBowlingDataO___HTML()
{
	var lRet="";
	
	lRet += "Overs=" + this.mOvers + ", Maidens=" + this.mMaidens + ", Runs=" + this.mRuns + ", Wickets=" + this.mWickets + "<br>";
	
	return (lRet);
}


//-------------------------------[GGTRCC_PLBowlingHighlightO]-
// Object to hold information on a bowling highlights entry
// of a player lifetime stats
//
// @param aPsBowlingHighlightXML	IN 	The <BowlingHighlight> XML node
//
//------------------------------------------------------------
function GGTRCC_PLBowlingHighlightO (aPsBowlingHighlightXML)
{
gXXXPLBowlingDebug += "[[ Create GGTRCC_PLBowlingHighlightO ]]";

	//
	// Members
	//
	this.mMatchID		= null;
	this.mBowlingData	= new GGTRCC_PLBowlingDataO (aPsBowlingHighlightXML.getElementsByTagName("BowlingData")[0]);
	
	//
	// Methods
	//
	this.HTML		= GGTRCC_PLBowlingHighlightO___HTML;
}


function GGTRCC_PLBowlingHighlightO___HTML()
{
	var lRet="";
	
	lRet += "**BowlH**" + this.mBowlingData.HTML() + "**BowlH**";
	
	return (lRet);
}



//-----------------------------------------[GGTRCC_PLBowlingO]-
// Object to hold information on bowling stats for one year of a 
// player lifetime stats
//
// @param aPsBowlingXML	IN 	The <Bowling> XML node
//
//------------------------------------------------------------
function GGTRCC_PLBowlingO (aPsBowlingXML)
{
	//
	// Members
	//
	this.mGames				= aPsBowlingXML.getAttribute ("games");
	this.mFivePlus			= aPsBowlingXML.getAttribute ("FivePlus");
	this.mBowlingData		= null;
	this.mBowlingHighlights	= new Array();
	
	//
	// Methods
	//
	this.HTML		= GGTRCC_PLBowlingO___HTML;
	
	{
		var lData = aPsBowlingXML.childNodes;
	
		for (var i=0 ; i<lData.length ; ++i)
		{
			gXXXPLBowlingDebug += "Node " + i + ": \"" + lData.item(i).nodeName + "\"::";
		}
	}
	
	
	//
	// Parse the summary bowling data
	//
	var lBowlingData = aPsBowlingXML.getElementsByTagName("BowlingData");
	
	if (lBowlingData.length != 0)
	{
		this.mBowlingData = new GGTRCC_PLBowlingDataO (lBowlingData[0]);
	}
	
	//
	// Parse the bowling highlights
	//
	var lBowlingHighlightsX = aPsBowlingXML.getElementsByTagName("BowlingHighlight");
	gXXXPLBowlingDebug += "lBowlingHighlightsX.length=" + lBowlingHighlightsX.length + " == ";
	
	for (var ix=0 ; ix<lBowlingHighlightsX.length ; ++ix)
	{
		this.mBowlingHighlights[this.mBowlingHighlights.length - 1] = new GGTRCC_PLBowlingHighlightO (lBowlingHighlightsX[ix]);
	}
	gXXXPLBowlingDebug += "this.mBowlingHighlights.length=" + this.mBowlingHighlights.length + "<br>";
}


function GGTRCC_PLBowlingO___HTML()
{
	var lRet="";
	
	lRet += "Games=" + this.mGames + ", FivePlus=" + this.mFivePlus + ": ";
	
	if (null != this.mBowlingData)
	{
		lRet += this.mBowlingData.HTML();
		
		lRet += "*2this.mBowlingHighlights.length=" + this.mBowlingHighlights.length + "*<br>";
		lRet += gXXXPLBowlingDebug + "<br>";
		gXXXPLBowlingDebug = "";
		
		for (var i=0 ; i<this.mBowlingHighlights.length ; ++i)
		{
			lRet += this.mBowlingHighlights[i].HTML();
		}
	}
	
	return (lRet);
}


//-------------------------------------------[GGTRCC_PLYearO]-
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
	this.mBowling	= null;
	
	//
	// Methods
	//
	this.yearHTML	= GGTRCC_PLYearO___yearHTML;
	
	//
	// Bowling data
	//
	var lBowling = aPsyXML.getElementsByTagName("Bowling");
	
	if (lBowling.length != 0)
	{
		this.mBowling = new GGTRCC_PLBowlingO (lBowling[0]);
	}
}


function GGTRCC_PLYearO___yearHTML ()
{
	var lRet="";
	
	lRet += "year=" + this.mYear + ": ";
	
	if (null != this.mBowling)
	{
		lRet += this.mBowling.HTML();
	}
	
	lRet += "<br>";
	
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
