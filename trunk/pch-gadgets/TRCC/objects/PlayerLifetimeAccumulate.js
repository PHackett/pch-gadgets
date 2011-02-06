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
	// These are stats compiled by D DOwnes that strech back
	// a lot furthur in time that the surviving scorebookds.
	// If those stats are present for this player, then thay 
	// take precedence over the other stats (as they will be 
	// more complete.
	//
	if (null !=aPLSO.mBattingStats1969to1997)
	{
		lRet.Add (aPLSO.mBattingStats1969to1997);
	}
	
	
	return (lRet);
}
