//
// Functions for the renderingof Player Career stats data
// See also PlayerLifetime.js
//


//-------------------------------[GGTRCC_RenderBattingTotals]-
// Render the total sf the lifetime battng statistics
//
// @param	aPLBO	IN	Player lifetime batting object
//------------------------------------------------------------
function GGTRCC_RenderBattingTotals (aPLBO)
{
	var lRet="";
	var lCompletedInnings=(aPLBO.mInnings - 0) - (aPLBO.mNotOuts - 0);
	
	lRet += "<span class='GadgetStatsHeading'>Career Batting Summary</span>";
	
	lRet += "<table width='100%' cellSpacing='0' cellPadding='0' border='0'>";

	lRet +=   "<thead>";
	lRet +=     "<tr class=\"GadgetBatsHeader\">";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=       "<th align='right'>Innings</th>";
	lRet +=       "<th align='right'>Not Out</th>";
	lRet +=       "<th align='right'>Runs</th>";
	lRet +=       "<th align='right'>100s</th>";
	lRet +=       "<th align='right'>50s</th>";
	lRet +=       "<th align='right'>Average</th>";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=     "</tr>";
	lRet +=   "</thead>";

	lRet +=   "<tr>";
	lRet +=     "<td>&nbsp;</td>";
	lRet +=     "<td align='right'>"	+ aPLBO.mInnings													+ "</td>";
	lRet +=     "<td align='right'>"	+ aPLBO.mNotOuts													+ "</td>";
	lRet +=     "<td align='right'>"	+ aPLBO.mRuns														+ "</td>";
	lRet +=     "<td align='right'>"	+ aPLBO.mHundreds													+ "</td>";
	lRet +=     "<td align='right'>"	+ aPLBO.mFifties													+ "</td>";
	lRet +=     "<td align='right'>"	+ TRCCUtils_getHTMLAverage (lCompletedInnings, (aPLBO.mRuns - 0))	+ "</td>";
	lRet +=     "<td>&nbsp;</td>";
	lRet +=   "</tr>";

	lRet += "</table>";
	
	return (lRet);
}


//-------------------------------[GGTRCC_RenderBowlingTotals]-
// Render the total sf the lifetime bowlng statistics
//
// @param	aPLBO	IN	Player lifetime bowling object
//------------------------------------------------------------
function GGTRCC_RenderBowlingTotals (aPLBO)
{
	var lRet="";
	
	lRet += "<span class='GadgetStatsHeading'>Career Bowling Summary</span>";
	
	lRet += "<table width='100%' cellSpacing='0' cellPadding='0' border='0'>";
	lRet +=   "<thead>";
	lRet +=     "<tr class=\"GadgetBatsHeader\">";
	lRet +=       "<th>&nbsp;</th>";
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

	lRet +=   "<tr>";
	lRet +=     "<td>&nbsp;</td>";
	lRet +=     "<td align='right'>" + GGUtils_numToString ((aPLBO.mBowlingData.mOvers - 0), 1)													+ "</td>";
	lRet +=     "<td align='right'>" + aPLBO.mBowlingData.mMaidens																	+ "</td>";
	lRet +=     "<td align='right'>" + aPLBO.mBowlingData.mRuns																		+ "</td>";
	lRet +=     "<td align='right'>" + aPLBO.mBowlingData.mWickets																	+ "</td>";
	lRet +=     "<td align='right'>" + TRCCUtils_RunsPerOver ((aPLBO.mBowlingData.mRuns - 0), (aPLBO.mBowlingData.mOvers - 0))		+ "</td>";		
	lRet +=     "<td align='right'>" + TRCCUtils_getStrikeRate ((aPLBO.mBowlingData.mWickets - 0), (aPLBO.mBowlingData.mOvers - 0))	+ "</td>";		
	lRet +=     "<td align='right'>" + TRCCUtils_getHTMLAverage ((aPLBO.mBowlingData.mWickets - 0), (aPLBO.mBowlingData.mRuns - 0))	+ "</td>";
	lRet +=     "<td>&nbsp;</td>";
	lRet +=   "</tr>";

	lRet += "</table>";
	
	return (lRet);
}


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
	
	//
	// Are there any highlights to render?
	//
	if (!aPLSO.HasBowlingHighlights())
	{
		return (lRet);
	}
	
	lRet += "<span class='GadgetStatsHeading'>Bowling Highlights By Year</span>";
	
	lRet += "<table width='100%' cellSpacing='0' cellPadding='0' border='0'>";
	lRet +=   "<thead>";
	lRet +=     "<tr class=\"GadgetBatsHeader\">";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=       "<th align='left'>Fixture</th>";
	lRet +=       "<th>&nbsp;</th>";
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
				lRet +=   "<td align='left'  valign='top'>" + lBH.mMatchID.NeatDate()																	+ "</td>";
				lRet +=   "<td align='left'  valign='top'>" + lBH.mMatchID.LinkHML()																	+ "</td>";
				lRet +=   "<td align='right' valign='top'>" + GGUtils_numToString ((lBH.mBowlingData.mOvers - 0), 1)									+ "</td>";
				lRet +=   "<td align='right' valign='top'>" + lBH.mBowlingData.mMaidens																	+ "</td>";
				lRet +=   "<td align='right' valign='top'>" + lBH.mBowlingData.mRuns																	+ "</td>";
				lRet +=   "<td align='right' valign='top'>" + lBH.mBowlingData.mWickets																	+ "</td>";
				lRet +=   "<td align='right' valign='top'>" + TRCCUtils_RunsPerOver ((lBH.mBowlingData.mRuns - 0), (lBH.mBowlingData.mOvers - 0))		+ "</td>";		
				lRet +=   "<td align='right' valign='top'>" + TRCCUtils_getStrikeRate ((lBH.mBowlingData.mWickets - 0), (lBH.mBowlingData.mOvers - 0))	+ "</td>";		
				lRet +=   "<td align='right' valign='top'>" + TRCCUtils_getHTMLAverage ((lBH.mBowlingData.mWickets - 0), (lBH.mBowlingData.mRuns - 0))	+ "</td>";
		
				lRet += "</tr>";
			}
		}
	}

	lRet += "</table>";
	
	return (lRet);
}
 
 
//---------------------------[GGTRCC_RenderBowlingBeatByYear]-
// For the rendering of the best bowling in a year player stats 
//
// @param aPSO	IN 	The GGTRCC_PlayerLifetimeO object
//
//------------------------------------------------------------
function GGTRCC_RenderBowlingBestByYear (aPLSO)
{
	var lRet="";
	
	lRet += "<span class='GadgetStatsHeading'>Bowling Best By Year</span>";
	
	lRet += "<table width='100%' cellSpacing='0' cellPadding='0' border='0'>";
	lRet +=   "<thead>";
	lRet +=     "<tr class=\"GadgetBatsHeader\">";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=       "<th align='left'>Fixture</th>";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=       "<th align='right'>Overs</th>";
	lRet +=       "<th align='right'>Maidens</th>";
	lRet +=       "<th align='right'>Runs</th>";
	lRet +=       "<th align='right'>Wickets</th>";
	// lRet +=       "<th align='right'>Runs/Over</th>";
	// lRet +=       "<th align='right'>Strike Rate</th>";
	// lRet +=       "<th align='right'>Average</th>";
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
		else if (null == lBYS.mBowlingBest)
		{
			// No data
		}
		else
		{
			lBB = lBYS.mBowlingBest;
			
			lRet += "<tr>";
			
			lRet +=   "<td>&nbsp;</td>";
			lRet +=   "<td align='left'  valign='top'>" + lBB.mMatchID.NeatDate()																	+ "</td>";
			lRet +=   "<td align='left'  valign='top'>" + lBB.mMatchID.LinkHML()																	+ "</td>";
			lRet +=   "<td align='right' valign='top'>" + GGUtils_numToString ((lBB.mBowlingData.mOvers - 0), 1)									+ "</td>";
			lRet +=   "<td align='right' valign='top'>" + lBB.mBowlingData.mMaidens																	+ "</td>";
			lRet +=   "<td align='right' valign='top'>" + lBB.mBowlingData.mRuns																	+ "</td>";
			lRet +=   "<td align='right' valign='top'>" + lBB.mBowlingData.mWickets																	+ "</td>";
			// lRet +=   "<td align='right' valign='top'>" + TRCCUtils_RunsPerOver ((lBB.mBowlingData.mRuns - 0), (lBB.mBowlingData.mOvers - 0))		+ "</td>";		
			// lRet +=   "<td align='right' valign='top'>" + TRCCUtils_getStrikeRate ((lBB.mBowlingData.mWickets - 0), (lBB.mBowlingData.mOvers - 0))	+ "</td>";		
			// lRet +=   "<td align='right' valign='top'>" + TRCCUtils_getHTMLAverage ((lBB.mBowlingData.mWickets - 0), (lBB.mBowlingData.mRuns - 0))	+ "</td>";
			lRet +=   "<td>&nbsp;</td>";
	
			lRet += "</tr>";
		}
	}

	lRet += "</table>";
	
	return (lRet);
}

//
// ====================================================================
//

//-------------------------------[GGTRCC_RenderBattingByYear]-
// For the rendering of batting by year for player stats 
//
// @param aPSO	IN 	The GGTRCC_PlayerLifetimeO object
//
//------------------------------------------------------------
function GGTRCC_RenderBattingByYear (aPLSO)
{
	var lRet="";
	
	lRet += "<span class='GadgetStatsHeading'>Batting By Year</span>";
	
	lRet += "<table width='100%' cellSpacing='0' cellPadding='0' border='0'>";
	lRet +=   "<thead>";
	lRet +=     "<tr class=\"GadgetBatsHeader\">";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=       "<th align='left'>Year</th>";
	lRet +=       "<th align='right'>Innings</th>";
	lRet +=       "<th align='right'>Not Out</th>";
	lRet +=       "<th align='right'>Runs</th>";
	lRet +=       "<th align='right'>100s</th>";
	lRet +=       "<th align='right'>50s</th>";
	lRet +=       "<th align='right'>Ducks</th>";
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
		var lBYS=lYearData.mBatting;

		if (lBYS == null)
		{
			// Nothing to do
		}
		else
		{
			var lCompletedInnings=(lBYS.mInnings - 0) - (lBYS.mNotOuts - 0);
			
			lRet += "<tr>";
			
			lRet +=   "<td>&nbsp;</td>";
			lRet +=   "<td align='left'>"	+ lYearData.mYear													+ "</td>";
			lRet +=   "<td align='right'>"	+ lBYS.mInnings														+ "</td>";
			lRet +=   "<td align='right'>"	+ lBYS.mNotOuts														+ "</td>";
			lRet +=   "<td align='right'>"	+ lBYS.mRuns														+ "</td>";
			lRet +=   "<td align='right'>"	+ lBYS.mHundreds													+ "</td>";
			lRet +=   "<td align='right'>"	+ lBYS.mFifties														+ "</td>";
			lRet +=   "<td align='right'>"	+ lBYS.mDucks														+ "</td>";
			lRet +=   "<td align='right'>"	+ TRCCUtils_getHTMLAverage (lCompletedInnings, (lBYS.mRuns - 0))	+ "</td>";
			lRet +=   "<td>&nbsp;</td>";
			
			lRet += "</tr>";
		}
	}

	lRet += "</table>";
	
	return (lRet);
}


//---------------------[GGTRCC_RenderBattingHighlightsByYear]-
// For the rendering of the best (50+) batting for player stats 
//
// @param aPSO	IN 	The GGTRCC_PlayerLifetimeO object
//
//------------------------------------------------------------
function GGTRCC_RenderBattingHighlightsByYear (aPLSO)
{
	var lRet="";
	
	//
	// Are there any highlights to render?
	//
	if (!aPLSO.HasBattingHighlights())
	{
		return (lRet);
	}
	
	lRet += "<span class='GadgetStatsHeading'>Batting Highlights By Year</span>";
	
	lRet += "<table width='100%' cellSpacing='0' cellPadding='0' border='0'>";
	lRet +=   "<thead>";
	lRet +=     "<tr class=\"GadgetBatsHeader\">";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=       "<th align='left'>Fixture</th>";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=       "<th align='right'>Runs</th>";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=     "</tr>";
	lRet +=   "</thead>";

	//
	// Down all the years
	//
	for (var i=0 ; i<aPLSO.mYears.length ; ++i)
	{
		var lYearData=aPLSO.mYears[i];
		var lBYS=lYearData.mBatting;

		if (lBYS == null)
		{
			// No data
		}
		else if (0 == lBYS.mBattingHighlights.length)
		{
			// No data
		}
		else
		{
			for (var j=0 ; j<lBYS.mBattingHighlights.length ; ++j)
			{
				lBH = lBYS.mBattingHighlights[j];
				
				lRet += "<tr>";
				
				lRet +=   "<td>&nbsp;</td>";
				lRet +=   "<td align='left'  valign='top'>" + lBH.mMatchID.NeatDate()	+ "</td>";
				lRet +=   "<td align='left'  valign='top'>" + lBH.mMatchID.LinkHML()	+ "</td>";
				lRet +=   "<td align='right' valign='top'>" + lBH.mBattingData.mRuns	+ "</td>";
				if (0 == lBH.mBattingData.mNotOuts)
				{
					lRet += "<td>&nbsp;</td>";
				}
				else
				{
					lRet += "<td>*</td>";
				}
		
				lRet +=   "<td>&nbsp;</td>";
				
				lRet += "</tr>";
			}
		}
	}

	lRet += "</table>";
	
	return (lRet);
}


//---------------------[GGTRCC_RenderBattingHighlightsByYear]-
// For the rendering of the best (50+) batting for player stats 
//
// @param aPSO	IN 	The GGTRCC_PlayerLifetimeO object
//
//------------------------------------------------------------
function GGTRCC_RenderBattingBestByYear (aPLSO)
{
	var lRet="";
	
	lRet += "<span class='GadgetStatsHeading'>Batting Best By Year</span>";
	
	lRet += "<table width='100%' cellSpacing='0' cellPadding='0' border='0'>";
	lRet +=   "<thead>";
	lRet +=     "<tr class=\"GadgetBatsHeader\">";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=       "<th align='left'>Fixture</th>";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=       "<th align='right'>Runs</th>";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=       "<th>&nbsp;</th>";
	lRet +=     "</tr>";
	lRet +=   "</thead>";

	//
	// Down all the years
	//
	for (var i=0 ; i<aPLSO.mYears.length ; ++i)
	{
		var lYearData=aPLSO.mYears[i];
		var lBYS=lYearData.mBatting;

		if (lBYS == null)
		{
			// No data
		}
		else if (null == lBYS.mBattingBest)
		{
			// No data
		}
		else
		{
			lBB = lBYS.mBattingBest;
			
			lRet += "<tr>";
			
			lRet +=   "<td>&nbsp;</td>";
			lRet +=   "<td align='left'  valign='top'>" + lBB.mMatchID.NeatDate()	+ "</td>";
			lRet +=   "<td align='left'  valign='top'>" + lBB.mMatchID.LinkHML()	+ "</td>";
			lRet +=   "<td align='right' valign='top'>" + lBB.mBattingData.mRuns	+ "</td>";
			if (0 == lBB.mBattingData.mNotOuts)
			{
				lRet += "<td>&nbsp;</td>";
			}
			else
			{
				lRet += "<td>*</td>";
			}
	
			lRet +=   "<td>&nbsp;</td>";
			
			lRet += "</tr>";
		}
	}

	lRet += "</table>";
	
	return (lRet);
}


//---------------------------------[GGTRCC_RenderPlayerStats]-
// For the rendering of player stats 
//
// @param aPSO	IN 	The GGTRCC_PlayerLifetimeO object
//
//------------------------------------------------------------
function GGTRCC_RenderPlayerStats (aPLSO)
{
	var lRet="";
	var lRenderSummary=1;
	var lRenderBatting=2;
	var lRenderBowling=3;
	var lRenderItem=lRenderSummary;
	
	//
	// Determine what we are rendering - Summary, Batting or bowling
	//
	var lQueryA=GGGadget_parseHostQuery ("&");
	
	if (null == lQueryA["render"])
	{
		// Stick with rendering the summary
	}
	else if ("batting" == lQueryA["render"])
	{
		lRenderItem = lRenderBatting;
	}
	else if ("bowling" == lQueryA["render"])
	{
		lRenderItem = lRenderBowling;
	}
	else
	{
		// Unrecognised - Stick with rendering the summary
	}
	
	//
	// Create the heading links to the 3 different options
	//
	
	//
	// Render the specific option
	//
	if (lRenderBowling == lRenderItem)
	{
		lRet += GGTRCC_RenderBowlingByYear(aPLSO);
		lRet += GGTRCC_RenderBowlingBestByYear(aPLSO);
		lRet += GGTRCC_RenderBowlingHighlightsByYear(aPLSO);
	}
	else if (lRenderBatting == lRenderItem)
	{
		lRet += GGTRCC_RenderBattingByYear (aPLSO);
		lRet += GGTRCC_RenderBattingHighlightsByYear(aPLSO);
		lRet += GGTRCC_RenderBattingBestByYear(aPLSO);
	}
	else
	{
		var lXarr = GGTRCC_PlayerLTGraph_MakeBattingArray (aPLSO);
		var lBoarr = GGTRCC_PlayerLTGraph_MakeBowlingArray (aPLSO);
		
		lRet += GGTRCC_PlayerLTGraph_MakeBattingGraphHTML (lXarr) + "<br><br>";
		lRet += GGTRCC_PlayerLTGraph_MakeBowlingGraphHTML (lBoarr) + "<br><br>";
		
		lRet += GGTRCC_RenderBattingTotals (aPLSO.mLifetimeBattingTotals) + "<br><br><br>";
		lRet += GGTRCC_RenderBowlingTotals (aPLSO.mLifetimeBowlingTotals) + "<br>";
	}
	
	return (lRet);
}
