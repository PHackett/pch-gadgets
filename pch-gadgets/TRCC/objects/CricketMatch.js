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
	// First innings
	//
	
	//
	// Second innings
	//
	
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
	
	return (lRet);
}
