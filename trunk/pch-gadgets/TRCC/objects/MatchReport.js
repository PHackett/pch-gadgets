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
	this.mMatchReport = null;

	//
	// Attempto tread the CDATA section, if present
	//	
	var lC = aMatchReportXML.childNodes;
	
	for (var i=0 ; i<lC.length ; ++i)
	{
		//
		// 4 is CDATA
		//
		if (4 == lC.item(i).nodeType)
		{
			this.mMatchReport = lC.item(i).data; 
			
			break;
		}
	}

	//
	// Methods
	//
	this.HTML 		= GGTRCC_MatchReportO___HTML;
}


//-------------------------------[GGTRCC_MatchReportO___HTML]-
// Return the HTML from this object
//
// @return		The match report HTML
//
//------------------------------------------------------------
function GGTRCC_MatchReportO___HTML()
{
	var lRet=this.mMatchReport;
	
	if (null == lRet)
	{
		lRet = "There is no match report available for this game."
	}
	
	return (lRet);
}