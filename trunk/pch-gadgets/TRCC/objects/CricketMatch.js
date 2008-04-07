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
	this.mOppo 			= null;
	this.mDate			= null;
	this.mMatchReport	= null;
	this.mInnings		= new Array;
	this.mInnings[0]	= null;
	this.mInnings[1]	= null;
	
	var lCM=aCricketMatchXML.getElementsByTagName("CricketMatch").item(0);
	
	//
	// Extract the data from the attributes
	//
	this.mOppo	= lCM.getAttribute ("oppo");
	this.mDate	= new Date (lCM.getAttribute ("date"));

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
		this.mInnings[0] = new GGTRCC_InningsO (lCM.item(0));
	}
	
	//
	// Second innings
	//
	if (lInnings.length > 1)
	{
		this.mInnings[1] = new GGTRCC_InningsO (lCM.item(1));
	}
	
	//
	// Methods
	//
	this.oppo 			= GGTRCC_CricketMatchO___oppo;
	this.date 			= GGTRCC_CricketMatchO___date;
	this.matchHTML 		= GGTRCC_CricketMatchO___matchHTML;
}


function GGTRCC_CricketMatchO___oppo()	{ return (this.mOppo);	}
function GGTRCC_CricketMatchO___date()	{ return (this.mDate);	}


//-------------------------[GGTRCC_CricketMatchO___matchHTML]-
// Return the match as HTML
//
// @return	HTML
//
//------------------------------------------------------------
function GGTRCC_CricketMatchO___matchHTML()
{
	var lRet="";
	
	lRet += "Opposition = " + this.oppo() + "<br>";
	lRet += "Date = " + this.date().toString() + "<br>";
	
	lRet += this.mMatchReport.HTML();

	lRet += "<br>";
	
	if (null != this.mInnings[0])
	{
		lRet += this.mInnings[0].HTML();
	}

	if (null != this.mInnings[1])
	{
		lRet += this.mInnings[1].HTML();
	}
	
	return (lRet);
}
