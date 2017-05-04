//-------------------------------------[GGTRCC_CricketMatchO]-
// Object to hold an complete cricket match.
//
//	A single cricket match XML will look like - 
//
//
// @param aCricketMatchXML	IN 	The match report XML node
//
//------------------------------------------------------------
function GGTRCC_CricketMatchO (aCricketMatchXML)
{
	//
	// The members - With default values
	//
	this.mOppo 					= null;
	this.mDate					= null;
	this.mMatchType				= null;
	this.mTeam					= null;
	this.mPlayCricketId			= null;
	this.mMatchReport			= null;
	this.mInnings				= new Array;
	this.mInnings[0]			= null;
	this.mInnings[1]			= null;
	this.mCountsTowardsStats	= true;
	
	var lCM=aCricketMatchXML.getElementsByTagName("CricketMatch").item(0);
	
	//
	// Extract the data from the attributes
	//
	this.mOppo			= lCM.getAttribute ("oppo");
	this.mDate			= new Date (lCM.getAttribute ("date"));
	this.mMatchType		= lCM.getAttribute ("matchType");
	this.mTeam			= lCM.getAttribute ("team");
	this.mPlayCricketId	= lCM.getAttribute ("playCricketId");
	
	if (lCM.getAttribute ("notforstats"))
	{
		this.mCountsTowardsStats = false;
	}

	//
	// Parse the match report
	//
	this.mMatchReport = new GGTRCC_MatchReportO (lCM.getElementsByTagName("MatchReport").item(0));
	
	//
	// Get the innings information
	//
	var lInnings = lCM.getElementsByTagName("Innings");
	
	//
	// First innings
	//
	if (lInnings.length > 0)
	{
		this.mInnings[0] = new GGTRCC_InningsO (lInnings[0]);
	}
	
	//
	// Second innings
	//
	if (lInnings.length > 1)
	{
		this.mInnings[1] = new GGTRCC_InningsO (lInnings[1]);
	}
	
	//
	// Methods
	//
	this.oppo 			= GGTRCC_CricketMatchO___oppo;
	this.date 			= GGTRCC_CricketMatchO___date;
	this.title 			= GGTRCC_CricketMatchO___title;
	this.matchHTML 		= GGTRCC_CricketMatchO___matchHTML;
	
	this.getTRCCInnings	= GGTRCC_CricketMatchO___getTRCCInnings;
	this.getOppoInnings	= GGTRCC_CricketMatchO___getOppoInnings;
}

function GGTRCC_CricketMatchO___getTRCCInnings()
{
	var lRet=null;
	
	if ((null != this.mInnings[0]) && (this.oppo() != this.mInnings[0].mBattingTeam))
	{
		lRet = this.mInnings[0];
	}
	else if ((null != this.mInnings[1]) && (this.oppo() != this.mInnings[1].mBattingTeam))
	{
		lRet = this.mInnings[1];
	}

	return (lRet);
}

function GGTRCC_CricketMatchO___getOppoInnings()
{
	var lRet=null;
	
	if ((null != this.mInnings[0]) && (this.oppo() == this.mInnings[0].mBattingTeam))
	{
		lRet = this.mInnings[0];
	}
	else if ((null != this.mInnings[1]) && (this.oppo() == this.mInnings[1].mBattingTeam))
	{
		lRet = this.mInnings[1];
	}

	return (lRet);
}


function GGTRCC_CricketMatchO___oppo()	{ return (this.mOppo);	}
function GGTRCC_CricketMatchO___date()	{ return (this.mDate);	}


//-----------------------------[GGTRCC_CricketMatchO___title]-
// Return the match title
//
// @return	Match title
//
//------------------------------------------------------------
function GGTRCC_CricketMatchO___title()
{
	var lRet="";
	
	lRet += "TRCC vs. " + this.oppo() + " - "; 
	
	lRet += GGUtils_GetNumAsOrdinalString (this.date().getDate(), false) + " ";
	lRet += GGUtils_MonthStringFromDate (this.date()) + " ";
	lRet += this.date().getFullYear();
	
	return (lRet);
}


//-------------------------[GGTRCC_CricketMatchO___matchHTML]-
// Return the match as HTML
//
// @return	HTML
//
//------------------------------------------------------------
function GGTRCC_CricketMatchO___matchHTML()
{
	var lRet="";
	
	//
	// On google sites, the match data is already there
	// on the page - No need to render it here
	//
	if (!GGGadget_hostedOnSites())
	{
		lRet += "<span class='GadgetMatchReportHeader'>" + this.title() + "</span>";
		lRet += "<hr size='2'>";
		
		lRet += this.mMatchReport.HTML();
		
		lRet += "<p><hr>";
	}
	
	lRet += "<span class='Scorecard'>Scorecard";
	
	if (!this.mCountsTowardsStats)
	{
		lRet += " (This match does not count towards the season stats)";
	}
	
	lRet += "</span><p>";

	
	if (null != this.mInnings[0])
	{
		lRet += this.mInnings[0].HTML();
	}

	if (null != this.mInnings[1])
	{
		lRet += "<hr>";
		lRet += this.mInnings[1].HTML();
	}
	
	if ((null != this.getTRCCInnings()) && this.getTRCCInnings().hasKeeper())
	{
		lRet += "<hr>";
		lRet += "<em><sup>&#8224;</sup> Indicates keeper</em>";		
	}

	//
	// "Specials", for the new stuff requested by Spence to help with the Play-Cricket stuff
	//
	if ((null != this.mMatchType) && ("" !== this.mMatchType))
	{
		lRet += "<span class='Scorecard'>Match Type = " + this.mMatchType + "</span><p>";
	}
	
	if ((null != this.mTeam) && ("" !== this.mTeam))
	{
		lRet += "<span class='Scorecard'>Team = " + this.mTeam + "</span><p>";
	}

	if ((null != this.mPlayCricketId) && ("" !== this.mPlayCricketId))
	{
		lRet += "<span class='Scorecard'>Play-Cricket ID = " + this.mPlayCricketId + "</span><p>";
	}

	lRet += "<span class='Scorecard'>*</span><p>";	///REMOVE ME
	
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
function GGTRCC_CricketMatch_LoadXML (aYear, aOppo, aDate, aMonth, aXMLloaderFunc, aCallback)
{
	//
	// Construct the XML URL for the required data
	//
	var lXMLURL = TRCCUtils_GetFixtureXML (aYear, aOppo, aDate, aMonth);

	//
	// Fetch the data
	//
	aXMLloaderFunc (lXMLURL, aCallback);
}


//------------------------------[GGTRCC_CricketMatch_LoadXML]-
// Load the XML for the specific match
//
//	@param	aPrefObj		IN	The Google 'UserPrefs' object, 
// 								 or null if not to be used.
// 	@param	aXMLloaderFunc	IN	The funiton to load the XML. 
//	@param	aCallback		IN	The callback to invoike once 
// 								 the XML is loaded. 
//
//------------------------------------------------------------
function GGTRCC_CricketMatch_LoadXMLFromPrefs (aPrefsObj, aXMLloaderFunc, aCallback)
{
	//
	// First the year - Any userPrefs?
	//
	var lYear = TRCCUtils_ProcessPreferences ("year", aPrefsObj, "2007");
	
	//
	// Now the opposition ...
	//
	var lOppo = TRCCUtils_ProcessPreferences ("oppo", aPrefsObj, "Welford_Park");
	
	//
	// Now the date ...
	//
	var lDate = TRCCUtils_ProcessPreferences ("date", aPrefsObj, "29th");
	
	//
	// Now the month ...
	//
	var lMonth = TRCCUtils_ProcessPreferences ("month", aPrefsObj, "April");

	//
	// Load the data
	//
	GGTRCC_CricketMatch_LoadXML (lYear, lOppo, lDate, lMonth, aXMLloaderFunc, aCallback);
}
