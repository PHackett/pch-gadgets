//
// For the creation of graphs showing player lifetime stats
//

var gPLTG_RunsIdx = 0;
var gPLTG_AvgIdx = 1;

//
// For sorting by date
//
function Sort___ByDate (aOne, aTwo)
{
	return (aOne.mYear - aTwo.mYear);
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
			// Add o any adjustment
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

// -----------------------------------------------------------------------------------------------------------------------------------------------------------

//
// Make the URL for the Google Graph
//
function GGTRCC_PlayerLTGraph_MakeGraphURL (aTitle, aAxisLabel, aData)
{
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
	lRet += "chdl=" + aTitle[0] + "|" + aTitle[1] + lAmp;
	
	
	return (lRet);
}
