//
// Functions for the renderingof Player Career stats data
// See also PlayerLifetime.js
//


//-------------------------------[GGTRCC_RenderBowlingByYear]-
// For the rendering of bowling by year for player stats 
//
// @param aPSO	IN 	The GGTRCC_PlayerLifetimeO object
//
//------------------------------------------------------------
function GGTRCC_RenderBowlingByYear (aPLSO)
{
	var lRet="";
	
	lRet += "<span class='GadgetStatsHeading'>Bowling By Year</span>";
	
	lRet += "<table width='100%' cellSpacing='0' cellPadding='0' border='0'>";
	lRet +=   "<thead>";
	lRet +=     "<tr class=\"GadgetBatsHeader\">";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=       "<th align='left'>Year</th>";
	lRet +=       "<th align='right'>Games</th>";
	lRet +=       "<th align='right'>Overs</th>";
	lRet +=       "<th align='right'>Maidens</th>";
	lRet +=       "<th align='right'>Runs</th>";
	lRet +=       "<th align='right'>Wickets</th>";
	lRet +=       "<th align='right'>5+</th>";
	lRet +=       "<th align='right'>Runs/Over</th>";
	lRet +=       "<th align='right'>Strike Rate</th>";
	lRet +=       "<th align='right'>Average</th>";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=     "</tr>";
	lRet +=   "</thead>";

	//
	// Down all the years
	//
	for (var i=0 ; i<aPLSO.mYears.length ; ++i)
	{
		var lYearData=aPLSO.mYears[i];
		var lBYS=lYearData.mBowling;

		if (lBYS != null)
		{
			lRet += "<tr>";
			lRet +=   "<td>&nbsp;</td>";
			lRet +=   "<td>" + lYearData.mYear + "</td>";
			lRet +=   "<td align='right'>" + lBYS.mGames + "</td>";
			
			if (lBYS.mBowlingData != null)
			{
				lRet +=   "<td align='right'>" + GGUtils_numToString ((lBYS.mBowlingData.mOvers - 0), 1)									+ "</td>";
				lRet +=   "<td align='right'>" + lBYS.mBowlingData.mMaidens																	+ "</td>";
				lRet +=   "<td align='right'>" + lBYS.mBowlingData.mRuns																	+ "</td>";
				lRet +=   "<td align='right'>" + lBYS.mBowlingData.mWickets																	+ "</td>";
				lRet +=   "<td align='right'>" + lBYS.mFivePlus																				+ "</td>";
				lRet +=   "<td align='right'>" + TRCCUtils_RunsPerOver ((lBYS.mBowlingData.mRuns - 0), (lBYS.mBowlingData.mOvers - 0))		+ "</td>";		
				lRet +=   "<td align='right'>" + TRCCUtils_getStrikeRate ((lBYS.mBowlingData.mWickets - 0), (lBYS.mBowlingData.mOvers - 0))	+ "</td>";		
				lRet +=   "<td align='right'>" + TRCCUtils_getHTMLAverage ((lBYS.mBowlingData.mWickets - 0), (lBYS.mBowlingData.mRuns - 0))	+ "</td>";
			}
			else
			{
				lRet +=   "<td>&nbsp;</td>";
				lRet +=   "<td>&nbsp;</td>";
				lRet +=   "<td>&nbsp;</td>";
				lRet +=   "<td>&nbsp;</td>";
				lRet +=   "<td>&nbsp;</td>";
				lRet +=   "<td>&nbsp;</td>";
				lRet +=   "<td>&nbsp;</td>";
				lRet +=   "<td>&nbsp;</td>";
			}
			
			lRet += "</tr>";
		}
	}

	lRet += "</table>";
	
	return (lRet);
}


//---------------------[GGTRCC_RenderBowlingHighlightsByYear]-
// For the rendering of the best (5+) bowling for player stats 
//
// @param aPSO	IN 	The GGTRCC_PlayerLifetimeO object
//
//------------------------------------------------------------
function GGTRCC_RenderBowlingHighlightsByYear (aPLSO)
{
	var lRet="";
	
	lRet += "<span class='GadgetStatsHeading'>Bowling Highlights By Year</span>";
	
	lRet += "<table width='100%' cellSpacing='0' cellPadding='0' border='0'>";
	lRet +=   "<thead>";
	lRet +=     "<tr class=\"GadgetBatsHeader\">";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=       "<th align='left'>Fixture</th>";
	lRet +=       "<th align='right'>Overs</th>";
	lRet +=       "<th align='right'>Maidens</th>";
	lRet +=       "<th align='right'>Runs</th>";
	lRet +=       "<th align='right'>Wickets</th>";
	lRet +=       "<th align='right'>Runs/Over</th>";
	lRet +=       "<th align='right'>Strike Rate</th>";
	lRet +=       "<th align='right'>Average</th>";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=     "</tr>";
	lRet +=   "</thead>";

	//
	// Down all the years
	//
	for (var i=0 ; i<aPLSO.mYears.length ; ++i)
	{
		var lYearData=aPLSO.mYears[i];
		var lBYS=lYearData.mBowling;

		if (lBYS == null)
		{
			// No data
		}
		else if (0 == lBYS.mBowlingHighlights.length)
		{
			// No data
		}
		else
		{
			for (var j=0 ; j<lBYS.mBowlingHighlights.length ; ++j)
			{
				lBH = lBYS.mBowlingHighlights[j];
				
				lRet += "<tr>";
				lRet +=   "<td>&nbsp;</td>";
				lRet +=   "<td>" + lBH.mMatchID.LinkHML() + "</td>";
				lRet +=   "<td align='right'>" + GGUtils_numToString ((lBH.mBowlingData.mOvers - 0), 1)										+ "</td>";
				lRet +=   "<td align='right'>" + lBH.mBowlingData.mMaidens																	+ "</td>";
				lRet +=   "<td align='right'>" + lBH.mBowlingData.mRuns																		+ "</td>";
				lRet +=   "<td align='right'>" + lBH.mBowlingData.mWickets																	+ "</td>";
				lRet +=   "<td align='right'>" + TRCCUtils_RunsPerOver ((lBH.mBowlingData.mRuns - 0), (lBH.mBowlingData.mOvers - 0))		+ "</td>";		
				lRet +=   "<td align='right'>" + TRCCUtils_getStrikeRate ((lBH.mBowlingData.mWickets - 0), (lBH.mBowlingData.mOvers - 0))	+ "</td>";		
				lRet +=   "<td align='right'>" + TRCCUtils_getHTMLAverage ((lBH.mBowlingData.mWickets - 0), (lBH.mBowlingData.mRuns - 0))	+ "</td>";
		
				lRet += "</tr>";
			}
		}
	}

	lRet += "</table>";
	
	return (lRet);
}
 