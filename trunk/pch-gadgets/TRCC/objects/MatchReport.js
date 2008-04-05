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
	this.mMatchReport	= null;
}
