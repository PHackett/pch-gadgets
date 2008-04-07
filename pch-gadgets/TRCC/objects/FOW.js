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
	this.mBatsmanNo	= aFOWXML.getAttribute ("batsman");
	this.mScore		= aFOWXML.getAttribute ("score");

	//
	// Methods
	//
	this.HTML 		= GGTRCC_FOWO___HTML;
	this.batsmanNo	= GGTRCC_FOWO___batsmanNo;
	this.score 		= GGTRCC_FOWO___score;
}


function GGTRCC_FOWO___HTML()
{
	return ("FOW: Bats=" + this.mBatsmanNo + " score=" + this.mScore + "<br>");
}

function GGTRCC_FOWO___batsmanNo()	{ return (this.mBatsmanNo);	}
function GGTRCC_FOWO___score()		{ return (this.mScore);		}

//------------------------------------[GGTRCC_FOWO_MakeTable]-
// Render the object in HTML
//
//	@param		aFOWs	IN	All the Fall-of-wickets
//
// 	@return		The HTML
//
//------------------------------------------------------------
function GGTRCC_FOWO_MakeTable (aFOWs)
{
	var lRet="";
	
	if (0 != aFOWs.length)
	{
		//
		// Table & header
		//
		lRet += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>\n";
		lRet += "  <tr class=\"GadgetBatsHeader\">\n";
		lRet += "    <th>&nbsp;</th>";
		lRet += "<th align='left'>Fall Of Wickets</th>";
		lRet += "<th>&nbsp;</th>";
		
		//
		// Mark as many wickets as we have ...
		//
		for (var i=0 ; i<aFOWs.length ; i++)
		{
			lRet += "<th align='center'>" + (i+1) + " for</th>";
		}

		//
		// And fill the rest with blanks
		//
		for (var i=aFOWs.length ; i<10 ; i++)
		{
			lRet += "<th align='center'>&nbsp</th>";
		}

		lRet += "</tr>\n";
		
		//
		// Now the line saying which batsmen were out
		//
		lRet += "<tr class=\"GadgetFixtureAltLine\">";
		lRet += "<td>&nbsp;</td>";
		lRet += "<td align='right'>Batsman Out</td>";
		lRet += "<td>&nbsp;</td>";

		for (var i=0 ; i<aFOWs.length ; i++)
		{
			lRet += "<td align='center'>" + aFOWs[i].batsmanNo() + "</td>";
		}

		for (var i=aFOWs.length ; i<10 ; i++)
		{
			lRet += "<td>&nbsp</th>";
		}

		lRet += "</tr>\n";
		
		//
		// Now the line saying what the score was
		//
		lRet += "<tr class=\"FixtureAltLine\">";
		lRet += "<td>&nbsp;</td>";
		lRet += "<td align='right'>Score</td>";
		lRet += "<td>&nbsp;</td>";

		for (var i=0 ; i<aFOWs.length ; i++)
		{
			lRet += "<td align='center'>" + aFOWs[i].score() + "</td>";
		}

		for (var i=aFOWs.length ; i<10 ; i++)
		{
			lRet += "<td>&nbsp</th>";
		}

		lRet += "</tr>";

		lRet += "</table>";
	}
	
	return (lRet);
}
