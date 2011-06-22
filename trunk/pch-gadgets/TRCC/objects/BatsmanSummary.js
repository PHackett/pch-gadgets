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
	
	this.update			= GGTRCC_BatsmanSummaryO___update;
	this.getAverage		= GGTRCC_BatsmanSummaryO___getAverage;
	this.getHTMLAverage = GGTRCC_BatsmanSummaryO___getHTMLAverage;
	this.HTML			= GGTRCC_BatsmanSummaryO___HTML;
}


//------------------------------------------------------------
// Updatye the object from the given GGTRCC_BatsmanInningsO
//------------------------------------------------------------
function GGTRCC_BatsmanSummaryO___update (aBatsmanInningsO)
{
	this.mGames++;
	
	if ((null == aBatsmanInningsO.mHowOut) || ("Did Not Bat" == aBatsmanInningsO.mHowOut))
	{
		// Did not bat
	}
	else
	{
		var lRuns	= aBatsmanInningsO.mRuns - 0;
		var lNotOut	= false;
		
		this.mInnings++;
		
		if ((aBatsmanInningsO.mHowOut == "Not Out") ||(aBatsmanInningsO.mHowOut == "Retired Hurt"))
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
	lHTML += "	<td align='right'>" + this.getHTMLAverage()				+ "</td>";
	
	return (lHTML);
}


function GGTRCC_BatsmanSummaryO___getAverage()
{
	var lOuts = this.mInnings - this.mNotOuts;
	var lRet = 0.0;

	if (lOuts > 0)
	{
		lRet = this.mRuns / lOuts;
	}
	
	return (lRet);
}


function GGTRCC_BatsmanSummaryO___getHTMLAverage()
{
	var lOuts = this.mInnings - this.mNotOuts;
	var lRet = "&nbsp;";

	if (lOuts > 0)
	{
		lAvg = this.getAverage();
		
		if (lAvg != 0)
		{
			// 2 decimal places for HTML
			lRet = GGUtils_numToString (lAvg, 2);
		}
		else
		{
			lRet = "0.00";
		}
	}

	return (lRet);
}
