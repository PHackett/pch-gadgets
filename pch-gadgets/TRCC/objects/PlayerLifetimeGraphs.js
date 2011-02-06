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
function GGTRCC_PlayerLTGraph_BattingItemO (aYear, aRuns, aAverage)
{
	//
	// Members
	//
	this.mYear		= aYear;
	this.mRuns		= aRuns;
	this.mAverage	= aAverage;
}


//
// Make the array of GGTRCC_PlayerLTGraph_BattingItemO objects 
// from the GGTRCC_PlayerLifetimeO
//
function GGTRCC_PlayerLTGraph_MakeBattingArray (aPLSO)
{
	var lRet  = new Array();
	var lTmpA = new Array();
	
	//
	// Down all the years
	//
	for (var i=0 ; i<aPLSO.mYears.length ; ++i)
	{
		if (null != aPLSO.mYears[i].mBatting)
		{
			var lCompInns = (aPLSO.mYears[i].mBatting.mInnings - 0) - (aPLSO.mYears[i].mBatting.mNotOuts - 0);
			
			lTmpA[length] = new GGTRCC_PlayerLTGraph_BattingItemO ((aPLSO.mYears[i].mYear - 0),
																   (aPLSO.mYears[i].mBatting.mRuns - 0),
																   TRCCUtils_getAverage (lCompInns, (aPLSO.mYears[i].mBatting.mRuns - 0)));
		}
	}
	
	//
	// Sort the array ascending
	//
	lTmpA.sort (Sort___ByDate);
	
	//
	// Go through the array, transferring to the return array, filling in any gaps in the years
	//
}