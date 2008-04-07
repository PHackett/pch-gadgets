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
	this.mBattingTeam	= aInningsXML.getAttribute ("batting");;
	this.mBatsmen 		= new Array();
	this.mExtras		= null;
	this.mFOWs 			= new Array();
	this.mBowlers 		= new Array();
	
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
	var lExtras = aInningsXML.getElementsByTagName("Extras");
	
	if (null != lExtras)
	{
		this.mExtras = new GGTRCC_ExtrasO (lExtras[0]);
	}
	
	//
	// Fall of wickets
	//
	var lFOWs = aInningsXML.getElementsByTagName("FallOfWicket");
	
	for (var i=0 ; i<lFOWs.length ; ++i)
	{
		this.mFOWs.push (new GGTRCC_FOWO (lFOWs[i]));
	}
	
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


//-----------------------------------[GGTRCC_InningsO___HTML]-
// Render the object in HTML
//
// 	@return		The HTML
//
//------------------------------------------------------------
function GGTRCC_InningsO___HTML()
{
	var lRet="";
	var lExtras=0;
	
	if ((null != this.mExtras) && (null != this.mExtras.extras()))
	{
		lExtras = this.mExtras.extras()
	}
	
	
lRet = "<br>This is the innings of " + this.mBattingTeam + "<br>";

	//
	// Batting
	//
	lRet += GGTRCC_BatsmanInnings_MakeTable (this.mBatsmen, lExtras)
	
	//
	// Fow
	//
	lRet += GGTRCC_FOWO_MakeTable (this.mFOWs);
	
	for (var i=0 ; i<this.mFOWs.length ; ++i)
	{
		lRet += this.mFOWs[i].HTML();
	}

	//
	// Bowling
	//
	lRet += GGTRCC_BowlerSummary_MakeMatchTable (this.mBowlers);

	return (lRet);
}