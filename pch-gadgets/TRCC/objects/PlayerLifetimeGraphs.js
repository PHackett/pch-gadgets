//
// For the creation of graphs showing player lifetime stats
//

var gPLTG_RunsIdx = 0;
var gPLTG_WktsIdx = 0;
var gPLTG_AvgIdx  = 1;


//
// For sorting by date
//
function Sort___ByDate (aOne, aTwo)
{
	return (aOne.mYear - aTwo.mYear);
}


function PLTG___getYearsString (aData, aSep)
{
	var lRet="";

	for (i=0 ; i<aData.length ; ++i)
	{
		if (0 != i)
		{
			lRet += aSep;
		}
		
		var lYear = aData[i].mYear + "";
		
		// Two digits only in the year
		if (lYear.length >2)
		{
			lYear = lYear.slice (-2);
		}
		
		lRet += lYear;
	}
	
	return (lRet);
}


function PLTG___getWithSep (aData, aIdx, aSep)
{
	var lRet="";

	for (i=0 ; i<aData.length ; ++i)
	{
		if (0 != i)
		{
			lRet += aSep;
		}
		
		lRet += GGUtils_numToString (aData[i].mValuesA[aIdx], 1);
	}
	
	return (lRet);
}


//
// Get a nice round value to be the to of the graph Y axis
//
function PLTG___getAbovePeak (aValue)
{
	var lRet=0;
	var lValue=aValue-0;

	if (lValue < 5)
	{
		lRet = 5;
	}
	else if (lValue < 10)
	{
		lRet = 10;
	}
	else if (lValue < 100)
	{
		lRet = (lValue + 5) / 10;
		lRet = Math.round (lRet);
		lRet *= 10;
	}
	else if (lValue < 1000)
	{
		lRet = (lValue + 50) / 100;
		lRet = Math.round (lRet);
		lRet *= 100;
	}
	else if (lValue < 10000)
	{
		lRet = (lValue + 500) / 1000;
		lRet = Math.round (lRet);
		lRet *= 1000;
	}
	else if (lValue < 100000)
	{
		lRet = (lValue + 5000) / 10000;
		lRet = Math.round (lRet);
		lRet *= 10000;
	}
	else
	{
		lRet = lValue;
	}

	return (lRet);
}


//
// Get the largest value in the array of GGTRCC_PlayerLTGraph_ItemO
// Onkects at the given index
//
function PLTG___getLargestValue (aData, aIdx)
{
	var lHighestValue=0;
	
	for (i=0 ; i<aData.length ; ++i)
	{
		var lVal = aData[i].mValuesA[aIdx] - 0;
		
		if (lVal > lHighestValue)
		{
			lHighestValue = lVal;
		}
	}

	return (lHighestValue);
}


//
//
//	@param	aData	IN	Array of GGTRCC_PlayerLTGraph_ItemO objects
//	@param	aIdx	IN	Index of values to scale
//	@param	aSteps	IN	Number of steps in scale
//	@param	aUpper	IN	Upper Y value on graph
//
function PLTG___scaleArray (aData, aIdx, aSteps, aUpper)
{
	var lHighestValue=PLTG___getLargestValue (aData, aIdx);
	var lPrecision=1;
	
	if (0 != lHighestValue)
	{
		var lScaleFactor=(aSteps/lHighestValue) * (lHighestValue/aUpper);
	
		for (i=0 ; i<aData.length ; ++i)
		{
			var lVal = aData[i].mValuesA[aIdx] - 0;
			
			if (0 > lVal)
			{
				aData[i].mValuesA[aIdx] = "-1";
			}
			else
			{
				lVal *= lScaleFactor;
				
				aData[i].mValuesA[aIdx] = lVal;
			}
		}
	}
}


//
//	Scale the values in the array aData at aIdx
//
//	@param	aData	IN	Array of GGTRCC_PlayerLTGraph_ItemO objects
//	@param	aIdx	IN	Index of values to scale
//
function PLTG___scaleYValues (aData, aIdx)
{
	var lTopY=PLTG___getAbovePeak (PLTG___getLargestValue (aData, aIdx));

	//
	// Scale the array
	//
	PLTG___scaleArray (aData, aIdx, 100, lTopY);
	
	return (lTopY);
}


//
// For some years there is no data. In that case, the array value
// will be -1. However, this kind of braks the line graph up in an
// ugly manner. So interpolate a value for these missing data.
//
function PLTG___interpolateArray (aData, aIdx)
{
	for (var i=1 ; i<(aData.length-1) ; ++i)
	{
		if (-1 == aData[i].mValuesA[aIdx])
		{
			//
			// Find the next non-missing data
			//			
			for (j=i+1 ; j<aData.length ; ++j)
			{
				if (-1 != aData[j].mValuesA[aIdx])
				{
					break;
				}
			}
			
			if (j < aData.length)
			{
				var lD=((aData[j].mValuesA[aIdx] - 0) - (aData[i-1].mValuesA[aIdx] - 0)) / (j - i + 1);
				var lInterpolatedVal=(aData[i-1].mValuesA[aIdx] - 0) + lD - 0;
				
				aData[i].mValuesA[aIdx] = lInterpolatedVal;
			}
		}
	}
}


function PLTG___makeYAxisLabels (aMax, aLabel, aLabelToLeft)
{
	var lRet="";
	var lNumLabels=5; // Actually one more that this

	for (var i=0 ; i<=lNumLabels ; ++i)
	{
		lRet += "|";
		
		if (aLabelToLeft && (lNumLabels == i))
		{
			lRet += aLabel + " ";
		}
		
		lRet += (aMax * i) / lNumLabels;

		if (!aLabelToLeft && (lNumLabels == i))
		{
			lRet += " " + aLabel;
		}
	}
	
	return (lRet);
}


//
// This object represents an entry for a single year of data on the graph
// we shall be drawing for the Player Lifetime batting performance
//
//	@param	aYear		IN	Year for which this data appliaes
//	@param	aRuns		IN	Runs in year
//	@param	aAverage	IN	Batting average for this year
//
function GGTRCC_PlayerLTGraph_ItemO (aYear, aOne, aTwo)
{
	//
	// Members
	//
	this.mYear							= aYear;
	this.mValuesA						= new Array();
	this.mValuesA[this.mValuesA.length]	= aOne;
	this.mValuesA[this.mValuesA.length]	= aTwo;
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------

//
// Make the array of GGTRCC_PlayerLTGraph_ItemO objects 
// from the GGTRCC_PlayerLifetimeO
//
function GGTRCC_PlayerLTGraph_MakeBattingArray (aPLSO)
{
	var lRet  = new Array();
	var lTmpA = new Array();
	
	//
	// Down all the years creating the GGTRCC_PlayerLTGraph_ItemO objects
	//
	for (var i=0 ; i<aPLSO.mYears.length ; ++i)
	{
		if (null != aPLSO.mYears[i].mBatting)
		{
			var lCompInns = (aPLSO.mYears[i].mBatting.mInnings - 0) - (aPLSO.mYears[i].mBatting.mNotOuts - 0);
			
			lTmpA[lTmpA.length] = new GGTRCC_PlayerLTGraph_ItemO ((aPLSO.mYears[i].mYear - 0),
																  (aPLSO.mYears[i].mBatting.mRuns - 0),
																  TRCCUtils_getAverage (lCompInns, (aPLSO.mYears[i].mBatting.mRuns - 0)));
		}
	}
	
	//
	// Did we get anything?
	//
	if (0 != lTmpA.length)
	{
		//
		// Sort the array ascending
		//
		lTmpA.sort (Sort___ByDate);
		
		//
		// Go through the array, transferring to the return array, filling in any gaps in the years
		//
		lRet[0] = lTmpA[0];
		var lPrevItem = lRet[0];
		
		for (var i=1 ; i<lTmpA.length ; ++i)
		{
			for (var j=(lPrevItem.mYear + 1) ; j<lTmpA[i].mYear ; ++j)
			{
				lRet[lRet.length] = new GGTRCC_PlayerLTGraph_ItemO (j, 0, -1);
			}
			
			lPrevItem = lRet[lRet.length] = lTmpA[i];
		}
		
		//
		// Turn the "runs" into "cumulative runs"
		//
		var lCum=0;
		
		for (var i=0 ; i<lRet.length ; ++i)
		{
			lRet[i].mValuesA[gPLTG_RunsIdx] += lCum;
			
			lCum = lRet[i].mValuesA[gPLTG_RunsIdx];
		}
		
		//
		// Adjust the totals to take account of the statistice 
		// that david Downes compiled for the years 1969 to 1997
		// as these span a far wider time
		//
		if (null != aPLSO.mBattingStats1969to1997)
		{
			var lAdjust=-1;
			
			for (var i=0 ; i<lRet.length ; ++i)
			{
				if (lRet[i].mYear == 1997)
				{
					lAdjust = (aPLSO.mBattingStats1969to1997.mRuns - 0) - lRet[i].mValuesA[gPLTG_RunsIdx];
					
					break;
				}
			}
			
			//
			// Add on any adjustment
			//
			if (lAdjust > 0)
			{
				for (var i=0 ; i<lRet.length ; ++i)
				{
					lRet[i].mValuesA[gPLTG_RunsIdx] += lAdjust;
				}
			}
		}
	}
	
	return (lRet);
}


//
// Make the array of GGTRCC_PlayerLTGraph_ItemO objects 
// from the GGTRCC_PlayerLifetimeO for bowling
//
function GGTRCC_PlayerLTGraph_MakeBowlingArray (aPLSO)
{
	var lRet  = new Array();
	var lTmpA = new Array();
	
	//
	// Down all the years creating the GGTRCC_PlayerLTGraph_ItemO objects
	//
	for (var i=0 ; i<aPLSO.mYears.length ; ++i)
	{
		if (null != aPLSO.mYears[i].mBowling)
		{
			lTmpA[lTmpA.length] = new GGTRCC_PlayerLTGraph_ItemO ((aPLSO.mYears[i].mYear - 0),
																  (aPLSO.mYears[i].mBowling.mBowlingData.mWickets - 0),
																  TRCCUtils_getAverage ((aPLSO.mYears[i].mBowling.mBowlingData.mWickets	- 0), 
																  						(aPLSO.mYears[i].mBowling.mBowlingData.mRuns	- 0)));
		}
	}
	
	//
	// Did we get anything?
	//
	if (0 != lTmpA.length)
	{
		//
		// Sort the array ascending
		//
		lTmpA.sort (Sort___ByDate);
		
		//
		// Go through the array, transferring to the return array, filling in any gaps in the years
		//
		lRet[0] = lTmpA[0];
		var lPrevItem = lRet[0];
		
		for (var i=1 ; i<lTmpA.length ; ++i)
		{
			for (var j=(lPrevItem.mYear + 1) ; j<lTmpA[i].mYear ; ++j)
			{
				lRet[lRet.length] = new GGTRCC_PlayerLTGraph_ItemO (j, 0, -1);
			}
			
			lPrevItem = lRet[lRet.length] = lTmpA[i];
		}
		
		//
		// Turn the "wickets" into "cumulative wickets"
		//
		var lCum=0;
		
		for (var i=0 ; i<lRet.length ; ++i)
		{
			lRet[i].mValuesA[gPLTG_WktsIdx] += lCum;
			
			lCum = lRet[i].mValuesA[gPLTG_WktsIdx];
		}
		
		//
		// Adjust the totals to take account of the statistice 
		// that david Downes compiled for the years 1969 to 1997
		// as these span a far wider time
		//
		if (null != aPLSO.mBowlingStats1969to1997)
		{
			var lAdjust=-1;
			
			for (var i=0 ; i<lRet.length ; ++i)
			{
				if (lRet[i].mYear == 1997)
				{
					lAdjust = (aPLSO.mBowlingStats1969to1997.mBowlingData.mWickets - 0) - lRet[i].mValuesA[gPLTG_WktsIdx];
					
					break;
				}
			}
			
			//
			// Add on any adjustment
			//
			if (lAdjust > 0)
			{
				for (var i=0 ; i<lRet.length ; ++i)
				{
					lRet[i].mValuesA[gPLTG_WktsIdx] += lAdjust;
				}
			}
		}
	}
	
	return (lRet);
}


// -----------------------------------------------------------------------------------------------------------------------------------------------------------



//
// Make the URL for the Google Graph
//
//	@param	aLabels	IN	Labels for axes & title - An array of arrays
//	@param	aData	IN	Array of GGTRCC_PlayerLTGraph_ItemO objects
//
//	@return Constructed URL for the graph
//
function GGTRCC_PlayerLTGraph_MakeGraphURL (aLabels, aData)
{
	//
	// Do draw a graph we need at least two points!
	//
	if (2 > aData.length)
	{
		return ("");
	}
	
	var lAmp="&amp;";
	var lBase="http://chart.apis.google.com/chart?";
	var lChtWidth=700;
	var lChtHeight=200;
	var lChtType="cht=lc";
	var lRet=lBase;
	
	lRet += "chxt=x,y,r" + lAmp;
	lRet += lChtType + lAmp;
	lRet += "chs=" + lChtWidth + "x" + lChtHeight + lAmp;
	lRet += "chg=0,20,1,5"  + lAmp;
	lRet += "chco=0000ff,00ff00" + lAmp;
	lRet += "chf=bg,s,FFFFFF80" + lAmp;		// Transparent background
	lRet += "chdl=" + aLabels[0][0] + "|" + aLabels[1][0] + lAmp;
	
	//
	// Scale the array & get the top Y value
	//
	var lTopY1=PLTG___scaleYValues (aData, gPLTG_RunsIdx);
	var lTopY2=PLTG___scaleYValues (aData, gPLTG_AvgIdx);

	//
	// For line graphs, interpolate the data
	//
	PLTG___interpolateArray (aData, gPLTG_RunsIdx);
	PLTG___interpolateArray (aData, gPLTG_AvgIdx);
	
		//
	// Add in the data
	//
	lRet += "chxl=" + 	"0:|" + PLTG___getYearsString (aData, "|") + 
						"|1:" + PLTG___makeYAxisLabels(lTopY1, aLabels[0][1], true) + 
						"|2:" + PLTG___makeYAxisLabels(lTopY2, aLabels[1][1], false) + 
						lAmp;
						
	lRet += "chd=t:" 	+ PLTG___getWithSep (aData, gPLTG_RunsIdx, ",") + 
						"|" 
						+ PLTG___getWithSep (aData, gPLTG_AvgIdx, ",");
	
	return (lRet);
}


//
// Make the URL for the Google Graph Batting stats
//
//	@param	aData	IN	Array of GGTRCC_PlayerLTGraph_ItemO objects
//
//	@return Constructed URL for the graph
//
function GGTRCC_PlayerLTGraph_MakeBattingGraphURL (aData)
{
	var lRunsLab	= ["Cumulative runs", "Runs"];
	var lAvgLab		= ["Average", "Avg."];
	var lLabels = [lRunsLab, lAvgLab];
	
	return (GGTRCC_PlayerLTGraph_MakeGraphURL (lLabels, aData));
}


//
// Make the URL for the Google Graph Batting stats
//
//	@param	aData	IN	Array of GGTRCC_PlayerLTGraph_ItemO objects
//
//	@return Constructed URL for the graph
//
function GGTRCC_PlayerLTGraph_MakeBattingGraphHTML (aData)
{
	
	return ("<img src=\"" + GGTRCC_PlayerLTGraph_MakeBattingGraphURL (aData) + "\">");
}


//
// Make the URL for the Google Graph Bowling stats
//
//	@param	aData	IN	Array of GGTRCC_PlayerLTGraph_ItemO objects
//
//	@return Constructed URL for the graph
//
function GGTRCC_PlayerLTGraph_MakeBowlingGraphURL (aData)
{
	var lRunsLab	= ["Cumulative wickets", "Wkts"];
	var lAvgLab		= ["Average", "Avg."];
	var lLabels = [lRunsLab, lAvgLab];
	
	return (GGTRCC_PlayerLTGraph_MakeGraphURL (lLabels, aData));
}


//
// Make the URL for the Google Graph Bowling stats
//
//	@param	aData	IN	Array of GGTRCC_PlayerLTGraph_ItemO objects
//
//	@return Constructed URL for the graph
//
function GGTRCC_PlayerLTGraph_MakeBowlingGraphHTML (aData)
{
	
	return ("<img src=\"" + GGTRCC_PlayerLTGraph_MakeBowlingGraphURL (aData) + "\">");
}
