//
// For the creation of graphs showing player lifetime stats
//


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
	this.mYear	= aYear;
	this.mOne	= aOne;
	this.mTwo	= aTwo;
}


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
			lRet[i].mOne = lRet[i].mOne + lCum;
			lCum = lRet[i].mOne;
		}
		
		//
		// Adjust the totals to take account of the statistice 
		// that david Downes compiled for the years 1969 to 1997
		// as these span a far wider time
		//
		if (null != aPLSO.mBattingStats1969to1997)
		{
lRet[lRet.length] = new GGTRCC_PlayerLTGraph_ItemO (2020, aPLSO.mBattingStats1969to1997.mRuns, -1);
			var lAdjust=-1;
			
			for (var i=0 ; i<lRet.length ; ++i)
			{
				if (lRet[i].mYear == 97)
				{
					lAdjust = (aPLSO.mBattingStats1969to1997.mRuns - 0) - lRet[i].mOne;
					
lRet[lRet.length] = new GGTRCC_PlayerLTGraph_ItemO (2021, lRet[i].mOne, -1);
					
					break;
				}
			}
			
			if (lAdjust > 0)
			{
				for (var i=0 ; i<lRet.length ; ++i)
				{
					lRet[i].mOne = lRet[i].mOne + lAdjust;
				}
			}
		}
	}
	
	return (lRet);
}