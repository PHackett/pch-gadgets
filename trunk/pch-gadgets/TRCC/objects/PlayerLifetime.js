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


//----------------------------------------[GGTRCC_PLMatchIdO]-
// Object to hold information on a Match ID 
//
// @param aPsMatchIdXML	IN 	The <BowlingData> XML node
//
//------------------------------------------------------------
function GGTRCC_PLMatchIdO (aPsMatchIdXML)
{
	//
	// Members
	//
	this.mDate		= new Date (aPsMatchIdXML.getAttribute ("date"));
	this.mOppo		= aPsMatchIdXML.getAttribute ("oppo");
	
	//
	// NOTE: May need to introduce a "team" into the XML at some point. For now, 
	// derrive the team from the date. Careful as some games such as tour are not 
	// played on a Saturday or a Sunday!
	//
	this.mTeam		= GGUtils_GetDOWStringFromDate (this.mDate);	//"Saturday", "Sunday", etc
	if (("Saturday" != this.mTeam) && ("Sunday" != this.mTeam))
	{
		this.mTeam = "Sunday";
	}
	
	//
	// Methods
	//
	this.LinkHML	= GGTRCC_PLMatchIdO___LinkHTML;
	this.NeatDate	= GGTRCC_PLMatchIdO___NeatDate;
	this.HTML		= GGTRCC_PLMatchIdO___HTML;
}

function GGTRCC_PLMatchIdO___HTML()
{
	var lRet="";
	
	lRet += this.mDate.toString() + " " + this.mOppo;
	
	return (lRet);
}

function GGTRCC_PLMatchIdO___NeatDate()
{
	var lRet="";
	
	lRet += this.mDate.getFullYear() + "-" + GGUtils_ShortMonthStringFromDate(this.mDate) + "-" + GGUtils_GetDOMLeadingZero (this.mDate);
	
	return (lRet);
}

//-----------------------------[GGTRCC_PLMatchIdO___LinkHTML]-
// Return some HTML with link to the match 
//
// @param aPsBattingDataXML	IN 	The <BattingData> XML node
//
//------------------------------------------------------------
function GGTRCC_PLMatchIdO___LinkHTML ()
{
	var lRet="";
	
	lRet = GGUtils_makeHREF (this.mOppo, TRCCUtils_MakeFixtureURL (this.mDate, this.mOppo, this.mTeam));
	
	return (lRet);
}


//-------------------------------------[GGTRCC_PLBattingDataO]-
// Object to hold information on a single piece of batting data 
//
// @param aPsBattingDataXML	IN 	The <BattingData> XML node
//
//------------------------------------------------------------
function GGTRCC_PLBattingDataO (aPsBattingDataXML)
{
	//
	// Members
	//
	this.mRuns		= aPsBattingDataXML.getAttribute ("runs");
	this.mNotOuts	= aPsBattingDataXML.getAttribute ("notouts");
	
	//
	// Methods
	//
	this.HTML		= GGTRCC_PLBattingDataO___HTML;
}


function GGTRCC_PLBattingDataO___HTML()
{
	var lRet="";
	
	lRet += "Runs=" + this.mRuns + ", NotOuts=" + this.mNotOuts;
	
	return (lRet);
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


//-------------------------------[GGTRCC_PLBattingHighlightO]-
// Object to hold information on a batting highlights entry
// of a player lifetime stats
//
// @param aPsBattingHighlightXML	IN 	The <BattingHighlight> XML node
//
//------------------------------------------------------------
function GGTRCC_PLBattingHighlightO (aPsBattingHighlightXML)
{
	//
	// Members
	//
	this.mMatchID		= new GGTRCC_PLMatchIdO (aPsBattingHighlightXML.getElementsByTagName("MatchId")[0]);
	this.mBattingData	= new GGTRCC_PLBattingDataO (aPsBattingHighlightXML.getElementsByTagName("BattingData")[0]);
	
	//
	// Methods
	//
	this.HTML		= GGTRCC_PLBattingHighlightO___HTML;
}


function GGTRCC_PLBattingHighlightO___HTML()
{
	var lRet="";
	
	lRet += "**BattH**" + this.mBattingData.HTML() + "**BattH**";
	lRet += "**MatchId**" + this.mMatchID.HTML() + "**MatchId**";
	
	return (lRet);
}


//------------------------------------[GGTRCC_PLBattingBestO]-
// Object to hold information on a batting best entry
// of a player lifetime stats
//
// @param aPsBattingBestXML	IN 	The <BattingBest> XML node
//
//------------------------------------------------------------
function GGTRCC_PLBattingBestO (aPsBattingBestXML)
{
	//
	// Members
	//
	this.mMatchID		= new GGTRCC_PLMatchIdO (aPsBattingBestXML.getElementsByTagName("MatchId")[0]);
	this.mBattingData	= new GGTRCC_PLBattingDataO (aPsBattingBestXML.getElementsByTagName("BattingData")[0]);
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
	//
	// Members
	//
	this.mMatchID		= new GGTRCC_PLMatchIdO (aPsBowlingHighlightXML.getElementsByTagName("MatchId")[0]);
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
	lRet += "**MatchId**" + this.mMatchID.HTML() + "**MatchId**";
	
	return (lRet);
}


//-------------------------------[GGTRCC_PLBowlingBestO]-
// Object to hold information on a bowling best entry
// of a player lifetime stats
//
// @param aPsBowlingBestXML	IN 	The <BowlingHighlight> XML node
//
//------------------------------------------------------------
function GGTRCC_PLBowlingBestO (aPsBowlingBestXML)
{
	//
	// Members
	//
	this.mMatchID		= new GGTRCC_PLMatchIdO (aPsBowlingBestXML.getElementsByTagName("MatchId")[0]);
	this.mBowlingData	= new GGTRCC_PLBowlingDataO (aPsBowlingBestXML.getElementsByTagName("BowlingData")[0]);
}


//-----------------------------------------[GGTRCC_PLBattingO]-
// Object to hold information on batting stats for one year of a 
// player lifetime stats
//
// @param aPsBattingXML	IN 	The <Batting> XML node
//
//------------------------------------------------------------
function GGTRCC_PLBattingO (aPsBattingXML)
{
	//
	// Members
	//
	this.mInnings			= "0";
	this.mRuns				= "0";
	this.mNotOuts			= "0";
	this.mHundreds			= "0";
	this.mFifties			= "0";
	this.mDucks				= "0";
	this.mBattingBest		= null;
	this.mBattingHighlights	= new Array();
	
	//
	// Have we been given XML to parse?
	//
	if (null != aPsBattingXML)
	{
		//
		// Members
		//
		this.mInnings			= aPsBattingXML.getAttribute ("innings");
		this.mRuns				= aPsBattingXML.getAttribute ("runs");
		this.mNotOuts			= aPsBattingXML.getAttribute ("notouts");
		this.mHundreds			= aPsBattingXML.getAttribute ("hundreds");
		this.mFifties			= aPsBattingXML.getAttribute ("fifties");
		this.mDucks				= aPsBattingXML.getAttribute ("ducks");
	
		//
		// Parse the batting highlights
		//
		var lBattingHighlightsX = aPsBattingXML.getElementsByTagName("BattingHighlight");
		
		for (var ix=0 ; ix<lBattingHighlightsX.length ; ++ix)
		{
			this.mBattingHighlights[this.mBattingHighlights.length] = new GGTRCC_PLBattingHighlightO (lBattingHighlightsX[ix]);
		}
		
		
		//
		// Parse the "BattingBest" for the year
		//
		var lBattingBest = aPsBattingXML.getElementsByTagName("BattingBest");
		
		if (lBattingBest.length != 0)
		{
			this.mBattingBest = new GGTRCC_PLBattingBestO (lBattingBest[0]);
		}
	}
	
	//
	// Methods
	//
	this.HTML		= GGTRCC_PLBattingO___HTML;
	this.Add		= GGTRCC_PLBattingO___Add;
}


//-----------------------------------------[GGTRCC_PLBattingO]-
// Add the stats from the supplied GGTRCC_PLBattingO to this
//
// @param aPLBO	IN	Object to add data from 
//-------------------------------------------------------------

function GGTRCC_PLBattingO___Add (aPLBO)
{
	//
	// Note that we are storing the member data as strings, not integers
	//
	this.mInnings			= ((this.mInnings  - 0) + (aPLBO.mInnings  - 0)) + "";
	this.mRuns				= ((this.mRuns     - 0) + (aPLBO.mRuns     - 0)) + "";
	this.mNotOuts			= ((this.mNotOuts  - 0) + (aPLBO.mNotOuts  - 0)) + "";
	this.mHundreds			= ((this.mHundreds - 0) + (aPLBO.mHundreds - 0)) + "";
	this.mFifties			= ((this.mFifties  - 0) + (aPLBO.mFifties  - 0)) + "";
	this.mDucks				= ((this.mDucks    - 0) + (aPLBO.mDucks    - 0)) + "";
}


function GGTRCC_PLBattingO___HTML()
{
	var lRet="";
	
	lRet += "::Batting::"; 
	lRet += "innings=" + this.mInnings + ", runs=" + this.mRuns + ", nonouts=" + this.mNotOuts + ", hundreds=" + this.mHundreds + ", fifties=" + this.mFifties + ", ducks=" + this.mDucks;	
	lRet += "::Batting::";
	
	//
	// Highlights
	//
	for (var i=0 ; i<this.mBattingHighlights.length ; ++i)
	{
		lRet += this.mBattingHighlights[i].HTML();
	}
	
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
	this.mGames				= "0";
	this.mFivePlus			= "0";
	this.mBowlingData		= null;
	this.mBowlingBest		= null;
	this.mBowlingHighlights	= new Array();
	
	if (null != aPsBowlingXML)
	{
		this.mGames				= aPsBowlingXML.getAttribute ("games");
		this.mFivePlus			= aPsBowlingXML.getAttribute ("fiveplus");
		this.mBowlingData		= null;
		this.mBowlingBest		= null;
		this.mBowlingHighlights	= new Array();		
		
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
		
		for (var ix=0 ; ix<lBowlingHighlightsX.length ; ++ix)
		{
			this.mBowlingHighlights[this.mBowlingHighlights.length] = new GGTRCC_PLBowlingHighlightO (lBowlingHighlightsX[ix]);
		}
		
		//
		// Parse the "BowlingBest" for the year
		//
		var lBowlingBest = aPsBowlingXML.getElementsByTagName("BowlingBest");
		
		if (lBowlingBest.length != 0)
		{
			this.mBowlingBest = new GGTRCC_PLBowlingBestO (lBowlingBest[0]);
		}
	}
	
	//
	// Methods
	//
	this.HTML		= GGTRCC_PLBowlingO___HTML;
	this.Add		= GGTRCC_PLBowlingO___Add;
}


function GGTRCC_PLBowlingO___Add (aPBO)
{
	
}


function GGTRCC_PLBowlingO___HTML()
{
	var lRet="";
	
	lRet += "Games=" + this.mGames + ", FivePlus=" + this.mFivePlus + ": ";
	
	if (null != this.mBowlingData)
	{
		lRet += this.mBowlingData.HTML();
		
		for (var i=0 ; i<this.mBowlingHighlights.length ; ++i)
		{
			lRet += this.mBowlingHighlights[i].HTML();
		}
		
		lRet += "** this.mBowlingBest ";
		if (null == this.mBowlingBest)
		{
			lRet += "null **";
		}
		else
		{
			lRet += "Not null **";			
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
	this.mBatting	= null;
	
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
	
	//
	// Batting data
	//
	var lBatting = aPsyXML.getElementsByTagName("Batting");
	
	if (lBatting.length != 0)
	{
		this.mBatting = new GGTRCC_PLBattingO (lBatting[0]);
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

	if (null != this.mBatting)
	{
		lRet += this.mBatting.HTML();
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
	this.mName						= null;
	this.mGenerated					= null;
	this.mYears						= new Array();
	this.mFRG						= null;
	this.mBattingStats1969to1997	= null;
	this.mBowlingStats1969to1997	= null;
	this.mLifetimeBattingTotals		= null;
	this.mLifetimeBowlingTotals		= null;
	
	//
	// Methods
	//
	this.HasBattingHighlights	= GGTRCC_PlayerLifetimeO___HasBattingHighlights;
	this.HasBowlingHighlights	= GGTRCC_PlayerLifetimeO___HasBowlingHighlights;
	this.playerHTML 			= GGTRCC_PlayerLifetimeO___playerHTML;
	
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
	// Get the first recorded game (if present)
	//
	var lFRG = lPLS.getElementsByTagName("FirstRecordedGame");
	
	if (0 != lFRG.length)
	{
		this.mFRG = new GGTRCC_PLMatchIdO (lFRG[0].getElementsByTagName("MatchId")[0]);
	}
	
	//
	// Get the years information
	//
	var lYears = lPLS.getElementsByTagName("YearData");
	
	for (var i=0 ; i<lYears.length ; ++i)
	{
		this.mYears[this.mYears.length] = new GGTRCC_PLYearO (lYears[i]);
	}
	
	//
	// Get the mBattingStats for the years 1969 to 1997 (if present)
	//
	var lBatStats1969to1997 = lPLS.getElementsByTagName("BattingStats1969to1997");
	
	if (0 != lBatStats1969to1997.length)
	{
		this.mBattingStats1969to1997 = new GGTRCC_PLBattingO (lBatStats1969to1997[0].getElementsByTagName("Batting")[0]);
	}
	
	//
	// Get the mBattingStats for the years 1969 to 1997 (if present)
	//
	var lBowlStats1969to1997 = lPLS.getElementsByTagName("BowlingStats1969to1997");
	
	if (0 != lBowlStats1969to1997.length)
	{
		this.mBowlingStats1969to1997 = new GGTRCC_PLBowlingO (lBowlStats1969to1997[0].getElementsByTagName("Bowling")[0]);
	}
	
	//
	// Summarise the lifetime batting from the supplied information
	//
	this.mLifetimeBattingTotals = GGTRCC_AccumulateLifetimeBatting (this);

	//
	// Summarise the lifetime bowling from the supplied information
	//
	this.mLifetimeBowlingTotals = GGTRCC_AccumulateLifetimeBowling (this);
}


function GGTRCC_PlayerLifetimeO___HasBattingHighlights()
{
	var lRet=false;
	
	for (var i=0 ; i<this.mYears.length ; ++i)
	{
		if (this.mYears[i].mBatting && (0 != this.mYears[i].mBatting.mBattingHighlights.length))
		{
			lRet = true;
			break;
		}
	}
	
	return (lRet);
}

function GGTRCC_PlayerLifetimeO___HasBowlingHighlights()
{
	var lRet=false;
	
	for (var i=0 ; i<this.mYears.length ; ++i)
	{
		if (this.mYears[i].mBowling && (0 != this.mYears[i].mBowling.mBowlingHighlights.length))
		{
			lRet = true;
			break;
		}
	}
	
	return (lRet);
}

function GGTRCC_PlayerLifetimeO___playerHTML()
{
	var lRet = "";
	
	lRet += "Name = " 		+ this.mName					+ "<br>";
	lRet += "Generated = "	+ this.mGenerated.toString()	+ "<br>";
	
	if (this.mFRG)
	{
		lRet += "FRG=" + this.mFRG.HTML();
	}
	
	for (var i=0 ; i<this.mYears.length ; ++i)
	{
		lRet += this.mYears[i].yearHTML();
	}
	
	lRet += "<br><hr><br>";
	
	lRet += "mBowlingStats1969to1997: " + this.mBowlingStats1969to1997.HTML();
	
	
	return (lRet);
}
