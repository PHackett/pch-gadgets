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
	this.mName		= null;
	this.mOvers		= null;
	this.mMaidens	= null;
	this.mRuns		= null;
	this.mWickets	= null;

	//
	// Get the always present bowler attributes
	//
	this.mName		= aBowlerXML.getAttribute ("name");
	this.mOvers		= aBowlerXML.getAttribute ("overs");
	this.mMaidens	= aBowlerXML.getAttribute ("maidens");
	this.mRuns		= aBowlerXML.getAttribute ("runs");
	this.mWickets	= aBowlerXML.getAttribute ("wickets");
	
	//
	// Methods
	//
	this.HTML 		= GGTRCC_BowlerSummaryO___HTML;
}


function GGTRCC_BowlerSummaryO___HTML()
{
	return ("Bowler " + this.mName + 
			" Overs=" + this.mOvers + 
			" Mdns=" + this.mMaidens + 
			" Runs=" + this.mRuns + 
			" Wkts=" + this.mWickets + "<br>");
}