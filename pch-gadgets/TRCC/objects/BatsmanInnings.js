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
	this.mName		= null;
	this.mHowOut	= null;
	this.mBowler	= null;
	this.mRuns		= null;

	//
	// Get the always present batsman attributes
	//
	this.mName	= aBatsmanXML.getAttribute ("name");

	//
	// Now the other stuff
	//
	var lData = aBatsmanXML.childNodes;

	for (var i=0 ; i<lData.length ; ++i)
	{
		if ("HowOut" == lData.item(i).nodeName)
		{
			this.mHowOut = lData.item(i).getAttribute ("how");
		}
		else if ("Bowler" == lData.item(i).nodeName)
		{
			this.mBowler = lData.item(i).getAttribute ("name");
		}
		else if ("Runs" == lData.item(i).nodeName)
		{
			this.mRuns = lData.item(i).getAttribute ("value");
		}
	}

	//
	// Methods
	//
	this.HTML 		= GGTRCC_BatsmanInningsO___HTML;
	this.runs 		= GGTRCC_BatsmanInningsO___runs;
}


function GGTRCC_BatsmanInningsO___runs()	{ return (this.mRuns);	}


//-----------------------------[GGTRCC_BatsmanInningsO___HTML]-
// Render the object in HTML
//
//	@param		aNum	IN		Batter number
// 	@return		The HTML
//
//------------------------------------------------------------
function GGTRCC_BatsmanInningsO___HTML (aNum)
{
	var lRet="";
	
	lRet = 	"<td>" 					+ aNum 								+ "</td>" + 
			"<td>" 					+ this.mName 						+ "</td>" +
			"<td>" 					+ GGUtils_nbspIfNull (this.mHowOut) + "</td>" +
			"<td>" 					+ GGUtils_nbspIfNull (this.mBowler) + "</td>" +
			"<td align='right'>" 	+ GGUtils_nbspIfNull (this.mRuns) 	+ "</td>" +
			"<td>&nbsp;</td>";
	
	return (lRet);
}


//-----------------------------[GGTRCC_BatsmanInningsO___HTML]-
// Render the object in HTML
//
//	@param		aNum	IN		Batter number
// 	@return		The HTML
//
//------------------------------------------------------------
function GGTRCC_BatsmanInnings_MakeTable (aBatsmanInnings, aExtras)
{
	var lTotal=aExtras;
	var lRet="";

	lRet += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>\n";

	lRet += "	<tr class=\"GadgetBatsHeader\">\n";
	lRet += "		<th>&nbsp;</th>"	+
			"<th align='left'>Batsman</th>"	+
			"<th align='left'>How Out</th>"	+
			"<th align='left'>Bowler</th>"	+
			"<th align='right'>Runs</th>"	+
			"<th width='" + 10 + "'>&nbsp;</th>\n";
	lRet += "	</tr>";

	//
	// Down all the batsmen
	//
	for (var i=0 ; i<aBatsmanInnings.length ; ++i)
	{
		lRet += (i % 2) ? "<tr>" : "<tr class=\"GadgetFixtureAltLine\">";
		lRet += aBatsmanInnings[i].HTML(i+1) + "\n";
		lRet += "</tr>\n";
		
		lTotal += (aBatsmanInnings[i].runs() - 0);
	}
	
	//
	// Now the extras
	//
	lRet += "<tr>\n";
	lRet += "<td colspan='3'>&nbsp;<td align='center' class=\"GadgetFixtureAltLine\">Extras</td>\n";
	lRet += "<td align='right' class=\"GadgetFixtureAltLine\">" + aExtras + "</td><td class=\"GadgetFixtureAltLine\">&nbsp;</td>\n";
	lRet += "</tr>\n";
	
	//
	// Now the total
	//
	lRet += "<tr>\n";
	lRet += "<td colspan='3'>&nbsp;<td align='center' class=\"GadgetFixtureAltLine\">Total</td>\n";
	lRet += "<td align='right' class=\"GadgetFixtureAltLine\">" + lTotal + "</td><td class=\"GadgetFixtureAltLine\">&nbsp;</td>\n";
	lRet += "</tr>\n";

	lRet += "</table>";
	
	return (lRet);
}
