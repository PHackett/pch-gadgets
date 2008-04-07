//-----------------------------------[GGTRCC_BatsmanInningsO]-
// Object to hold information on a single innings for a batsman.
//
//	A single innings XML will look like - 
//
//		<Batsman index="1" name="I Blair">
//          <HowOut how="Bowled"/>
//          <Bowler name="Paul Hackett"/>
//          <Runs value="3"/>
//        </Batsman>
//
// @param aBatsmanXML 	IN 	The innings XML node
//
//------------------------------------------------------------
function GGTRCC_BatsmanInningsO (aBatsmanXML)
{
	this.mIndex		= 999;
	this.mName		= null;
	this.mHowOut	= null;
	this.mBowler	= null;
	this.mRuns		= null;

	//
	// Get the always present batsman attributes
	//
	this.mIndex	= aBatsmanXML.getAttribute ("index");
	this.mName	= aBatsmanXML.getAttribute ("name");

	//
	// Methods
	//
	this.HTML 		= GGTRCC_BatsmanInningsO___HTML;
}


function GGTRCC_BatsmanInningsO___HTML()
{
	return ("Batsman (" + this.mIndex + ") " + this.mName + "<br>");
}

