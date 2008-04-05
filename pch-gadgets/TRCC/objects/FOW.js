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
	this.mBatsmanNo	= null;
	this.mScore		= null;
}
