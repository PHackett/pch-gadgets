//
// Functions for the auumumulation of Player Career stats data
// See also PlayerLifetime.js
//


//-------------------------------[GGTRCC_AccumulateBattingStats]-
// Accumulate summary batting stats for a given player 
//
// @param aPSO	IN 	The GGTRCC_PlayerLifetimeO object
//
//---------------------------------------------------------------
function GGTRCC_AccumulateLifetimeBatting (aPLSO)
{
	var lRet = new GGTRCC_PLBattingO (null);
	
	//
	// Do we have the David Downes "special" stats.
	// These are stats compiled by D Downes that strech back
	// a lot furthur in time that the surviving scorebookds.
	// If those stats are present for this player, then thay 
	// take precedence over the other stats (as they will be 
	// more complete.
	//
	if (null !=aPLSO.mBattingStats1969to1997)
	{
		lRet.Add (aPLSO.mBattingStats1969to1997);
	}
	
	//
	// Down all the years we have
	//
	for (var i=0 ; i<aPLSO.mYears.length ; ++i)
	{
		//
		// Do we have any batting data for this year?
		//
		if (null == aPLSO.mYears[i].mBatting)
		{
			// No batting data for this year
		}
		
		else if ((null != aPLSO.mBattingStats1969to1997) && ((aPLSO.mYears[i].mYear - 0) <= 1997))
		{
			// We have cumulative stats for 1969 to 1997, and this year falls into that range
		}
		else
		{
			lRet.Add (aPLSO.mYears[i].mBatting);
		}
	}
	
	return (lRet);
}


//-------------------------------[GGTRCC_AccumulateBowlingStats]-
// Accumulate summary bowling stats for a given player 
//
// @param aPSO	IN 	The GGTRCC_PlayerLifetimeO object
//
//---------------------------------------------------------------
function GGTRCC_AccumulateLifetimeBowling (aPLSO)
{
	var lRet = new GGTRCC_PLBowlingO (null);
	
	//
	// Do we have the David Downes "special" stats.
	// These are stats compiled by D Downes that strech back
	// a lot furthur in time that the surviving scorebookds.
	// If those stats are present for this player, then thay 
	// take precedence over the other stats (as they will be 
	// more complete.
	//
	if (null !=aPLSO.mBowlingStats1969to1997)
	{
		lRet.Add (aPLSO.mBowlingStats1969to1997);
	}
	
	//
	// Down all the years we have
	//
	for (var i=0 ; i<aPLSO.mYears.length ; ++i)
	{
		//
		// Do we have any batting data for this year?
		//
		if (null == aPLSO.mYears[i].mBowling)
		{
			// No batting data for this year
		}
		
		else if ((null != aPLSO.mBowlingStats1969to1997) && ((aPLSO.mYears[i].mYear - 0) <= 1997))
		{
			// We have cumulative stats for 1969 to 1997, and this year falls into that range
		}
		else
		{
			lRet.Add (aPLSO.mYears[i].mBowling);
		}
	}
	
	return (lRet);
}
