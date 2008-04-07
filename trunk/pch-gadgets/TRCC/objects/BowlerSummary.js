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


//-----------------------------[GGTRCC_BowlerSummaryO___HTML]-
// Render the object in HTML
//
//	@param		aNum	IN		Bowler number
//
// 	@return		The HTML
//
//------------------------------------------------------------
function GGTRCC_BowlerSummaryO___HTML (aNum)
{
	var lRet="";

	lRet +="<td align='left'>"		+ this.mName 	+ "</td>"	+
			"<td align='right'>"	+ this.mOvers 	+ "</td>"	+ 
			"<td align='right'>"	+ this.mMaidens + "</td>"	+ 
			"<td align='right'>"	+ this.mRuns 	+ "</td>"	+ 
			"<td align='right'>"	+ this.mWickets + "</td>"	+
			"<td>&nbsp;</td>";

	return (lRet);
}


//----------------------[GGTRCC_BowlerSummary_MakeMatchTable]-
// Render the object in HTML
//
//	@param		aBowlerSummary	IN	All the bowlers
//
// 	@return		The HTML
//
//------------------------------------------------------------
function GGTRCC_BowlerSummary_MakeMatchTable (aBowlerSummary)
{
	var lRet="";
	
	lRet += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>\n";

	lRet += "	<tr class=\"GadgetBatsHeader\">\n";
	lRet += "		<th align='center'>Bowler</th>"		+ 
					"<th align='right'>Overs</th>"		+
					"<th align='right'>Maidens</th>"	+
					"<th align='right'>Runs</th>"		+
					"<th align='right'>Wickets</th>"	+
					"<th width='" + gRTrail + "'>&nbsp;</th>";
	lRet += "	</tr>\n";

	//
	// Down all the bowlers
	//
	for (var i=0 ; i<aBowlerSummary.length ; ++i)
	{
		lRet += (i % 2) ? "<tr>" : "<tr class=\"GadgetFixtureAltLine\">";
		lRet += aBowlerSummary[i].HTML(i+1) + "\n";
		lRet += "</tr>\n";
	}

	lRet += "</table>\n";

	return (lRet);
}
