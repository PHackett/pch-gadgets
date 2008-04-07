//----------------------------------------------[GGTRCC_FOWO]-
// Object to hold information on a single "Fall of Wickets".
//
//	A single FOW XML will look like - 
//
//		 <FallOfWicket Batsman="2" Score="9"/>
//
// @param aFOWXML 	IN 	The innings XML node
//
//------------------------------------------------------------
function GGTRCC_FOWO (aFOWXML)
{
	this.mBatsmanNo	= aFOWXML.getAttribute ("batsman");
	this.mScore		= aFOWXML.getAttribute ("score");

	//
	// Methods
	//
	this.HTML 		= GGTRCC_FOWO___HTML;
	this.batsmanNo	= GGTRCC_FOWO___batsmanNo;
	this.score 		= GGTRCC_FOWO___score;
}


function GGTRCC_FOWO___HTML()
{
	return ("FOW: Bats=" + this.mBatsmanNo + " score=" + this.mScore + "<br>");
}

function GGTRCC_FOWO___batsmanNo()	{ return (this.mBatsmanNo);	}
function GGTRCC_FOWO___score()		{ return (this.mScore);		}
