//------------------------------------------[GGTRCC_InningsO]-
// Object to hold an innings data.
//
//	A single innings XML will look like - 
//
//		 <Innings batting="Twyford">
//        <batting>
//          ....
//        </batting>
//        <bowling>
//        </bowling>
//
// @param aInningsXML	IN 	The match report XML node
//
//------------------------------------------------------------
function GGTRCC_InningsO (aInningsXML)
{
	this.mBatsmen 	= new Array();
	this.mExtras	= null;
	this.mFOWs 		= new Array();
	this.mBowlers 	= new Array();
	
	//
	// Read the batting information
	//
	var lBatsmen = aInningsXML.getElementsByTagName("Batsman");
	
	for (var i=0 ; i<lBatsmen.length ; ++i)
	{
		this.mBatsmen.push (new GGTRCC_BatsmanInningsO (lBatsmen[i]));
	}
	
	//
	// Extras
	//
	
	//
	// Fall of wickets
	//
	
	//
	// And the bowler information ...
	//
	var lBowlers = aInningsXML.getElementsByTagName("BowlerSummary");
	
	for (var i=0 ; i<lBowlers.length ; ++i)
	{
		this.mBowlers.push (new GGTRCC_BowlerSummaryO (lBowlers[i]));
	}
	
	//
	// Methods
	//
	this.HTML 		= GGTRCC_InningsO___HTML;
}


function GGTRCC_InningsO___HTML()
{
	var lRet="";
	
lRet = "<br>This is an innings<br>"

	//
	// Batting
	//
	for (var i=0 ; i<this.mBatsmen.length ; ++i)
	{
		lRet += this.mBatsmen[i].HTML();
	}

	//
	// Bowling
	//
	for (var i=0 ; i<this.mBowlers.length ; ++i)
	{
		lRet += this.mBowlers[i].HTML();
	}

	return (lRet);
}