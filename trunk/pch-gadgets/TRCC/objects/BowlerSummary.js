//------------------------------------[GGTRCC_BowlerSummaryO]-
// Object to hold information on a single bowler.
//
//	A single bowler XML will look like - 
//
//		<Bowler index="1" name="Gerwyn Leigh" overs="6" maidens="1" runs="16" wickets="0"/>
//
// @param aBowlerXML 	IN 	The bowler XML node
//
//------------------------------------------------------------
function GGTRCC_BowlerSummaryO (aBowlerXML)
{
	this.mIndex		= null;
	this.mName		= null;
	this.mOvers		= null;
	this.mMaidens	= null;
	this.mRuns		= null;
	this.mWickets	= null;

	//
	// Methods
	//
	this.HTML 		= GGTRCC_BowlerSummaryO___HTML;
}


function GGTRCC_BowlerSummaryO___HTML()
{
	return ("Bowler!<br>");
}