//--------------------------------------[GGTRCC_MatchReportO]-
// Object to hold a match report.
//
//	A single Match report XML will look like - 
//
//		 <MatchReport>
//         <![CDATA[
//           ........
//         ]]>
//		 </MatchReport>
//
// 	If there is no match report, it will look like - 
//
//		 <MatchReport/>
//
// @param aMatchReportXML	IN 	The match report XML node
//
//------------------------------------------------------------
function GGTRCC_MatchReportO (aMatchReportXML)
{
	var lMR=aMatchReportXML.getElementsByTagName("MatchReport").item(0);
	
	var lC = lMR.childNodes;
	
	for (var j=0 ; j<lC.length ; ++j)
	{
		this.mMatchReport = lC.item(j).firstChild.nodeValue + "#";
	}
	
	// this.mMatchReport	= aMatchReportXML.getElementsByTagName("MatchReport").item(0).nodeValue;


	//
	// Methods
	//
	this.HTML 		= GGTRCC_MatchReportO___HTML;
}



function GGTRCC_MatchReportO___HTML()
{
	return (this.mMatchReport);
}