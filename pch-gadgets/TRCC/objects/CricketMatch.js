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
	// Extract the data from the attributes
	//
	this.mOppo	= aCricketMatchXML.getAttribute ("oppo");
	this.mDate	= new Date (aCricketMatchXML.getAttribute ("date"));

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
	
	return (lRet);
}
