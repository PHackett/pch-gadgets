//------------------------------------------------------------
// Object to hold sumamry information on a single batsman.
//
// @param aBowlerXML 	IN 	The bowler XML node
//
//------------------------------------------------------------
function GGTRCC_BatsmanSummaryO (aName)
{
	this.mGames			= 0;
	this.mInnings		= 0;
	this.mNotOuts		= 0;
	this.mRuns			= 0;
	this.mMaxRuns		= 0;
	this.m50s			= 0;
	this.m100s			= 0;
	this.mDucks			= 0;
	this.mMaxRunsNotOut = false;
	
	this.update		= GGTRCC_BatsmanSummaryO___update;
	this.getAverage = GGTRCC_BatsmanSummaryO___getAverage;
	this.HTML		= GGTRCC_BatsmanSummaryO___HTML;
}


//------------------------------------------------------------
// Updatye the object from the given GGTRCC_BatsmanInningsO
//------------------------------------------------------------
function GGTRCC_BatsmanSummaryO___update (aBatsmanInningsO)
{
	this.mGames++;
	
	if (null == aBatsmanInningsO.mHowOut)
	{
		// Did not bat
	}
	else
	{
		var lRuns	= aBatsmanInningsO.mRuns - 0;
		var lNotOut	= false;
		
		this.mInnings++;
		
		if (aBatsmanInningsO.mHowOut == "Not Out") /// @todo Retuered hurt also counts as not out
		{
			this.mNotOuts++;
			lNotOut = true;
		}
		else if (0 == lRuns)
		{
			this.mDucks++;
		}
		
		this.mRuns += lRuns;
		
		if (this.mMaxRuns < lRuns)
		{
			this.mMaxRuns		= lRuns;
			this.mMaxRunsNotOut	= lNotOut;
		}
		
		if (lRuns > 100)
		{
			this.m100s++;
		}
		else if (lRuns > 50)
		{
			this.m50s++;
		}
	}
}


function GGTRCC_BatsmanSummaryO___HTML()
{
	var lHTML="";
	
	lHTML += "	<td align='right'>" + this.mGames		+ "</td>";
	lHTML += "	<td align='right'>" + this.mInnings		+ "</td>";
	lHTML += "	<td align='right'>" + this.mNotOuts		+ "</td>";
	lHTML += "	<td align='right'>" + this.mRuns		+ "</td>";
	lHTML += "	<td align='right'>" + this.m100s		+ "</td>";
	lHTML += "	<td align='right'>" + this.m50s			+ "</td>";
	lHTML += "	<td align='right'>" + this.mDucks		+ "</td>";
	
	lHTML += "	<td align='right'>";
	
	if (this.mMaxRunsNotOut)
	{
		lHTML += this.mMaxRuns + "*";
	}
	else
	{
		lHTML += this.mMaxRuns;
	}

	lHTML += "</td>";
	lHTML += "	<td align='right'> average=" + this.getAverage()				+ "= </td>";
	lHTML += "	<td>&nbsp;</td>";
	
	return (lHTML);
}


function GGTRCC_BatsmanSummaryO___getAverage()
{
	var lOuts = this.mInnings - this.mNotOut;
	var lRet = 0.0;

	if (lOuts > 0)
	{
		lRet = this.mRuns / lOuts;

		if (lRet != 0)
		{
			// 2 decimal places for HTML
			lRet = GGUtils_numToString (lRet, 2); 
		}
		else
		{
			lRet = "0.00";
		}
	}
	else
	{
		lRet = "&nbsp;";
	}
	
	return (lRet);
}
