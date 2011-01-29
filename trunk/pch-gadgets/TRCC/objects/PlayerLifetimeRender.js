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
			lRet +=   "<td>" + lBYS.mGames + "</td>";
			
			if (lBYS.mBowlingData != null)
			{
				lRet +=   "<td>" + lBYS.mBowlingData.mOvers		+ "</td>";
				lRet +=   "<td>" + lBYS.mBowlingData.mMaidens	+ "</td>";
				lRet +=   "<td>" + lBYS.mBowlingData.mRuns		+ "</td>";
				lRet +=   "<td>" + lBYS.mBowlingData.mWickets	+ "</td>";
				lRet +=   "<td>" + lBYS.mFivePlus				+ "</td>";		
				
				lRet +=   "<td>R/O</td>";		
				lRet +=   "<td>S/R</td>";		
				lRet +=   "<td>Avg</td>";		
				
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
			
			
				lYearData.mBowlingYearStats.HTML();
			lRet += "</tr>";
		}
	}

	lRet += "</table>";
	
	return (lRet);
}
 