//------------------------------------------------------------
// Object to hold a collection of GGTRCC_PlayerStatsO objects
//
//------------------------------------------------------------
function GGTRCC_PlayerStatsCollectionO ()
{
	this.mCollection = new Array;
	
	//
	// Cutoffs - How many innings/overs do you have to have 
	// before you count for the official "stats"
	//
	this.mBowlngOversCutoff	= 20.0;
	this.mBattingOutsCutoff	= 7;
	
	//
	// Methods
	//
	this.find				= GGTRCC_PlayerStatsCollectionO___find;
	this.updateTRCCBatting	= GGTRCC_PlayerStatsCollectionO___updateTRCCBatting;
	this.updateTRCCBowling	= GGTRCC_PlayerStatsCollectionO___updateTRCCBowling;
	this.updateTRCCCatching	= GGTRCC_PlayerStatsCollectionO___updateTRCCCatching;
	this.updateTRCCKeeping	= GGTRCC_PlayerStatsCollectionO___updateTRCCKeeping;
	
	this.getOrderedBattingStats		= GGTRCC_PlayerStatsCollectionO___getOrderedBattingStats;
	this.getOrderedBowlingStats		= GGTRCC_PlayerStatsCollectionO___getOrderedBowlingStats;
	this.getOrderedCatchingStats	= GGTRCC_PlayerStatsCollectionO___getOrderedCatchingStats;
	this.getOrderedKeepingStats		= GGTRCC_PlayerStatsCollectionO___getOrderedKeepingStats;
	
	//
	// Creation of HTML
	//
	this.batsmanHTML	= GGTRCC_PlayerStatsCollectionO___batsmanHTML;
	this.bowlerHTML		= GGTRCC_PlayerStatsCollectionO___bowlerHTML;
	this.catcherHTML	= GGTRCC_PlayerStatsCollectionO___catcherHTML;
	this.keeperHTML		= GGTRCC_PlayerStatsCollectionO___keeperHTML;

	//
	// Ordering functions
	// 	
	this.batterOrderFn		= GGTRCC_PlayerStatsCollectionO___batterOrderFn;
	this.bowlerOrderFn		= GGTRCC_PlayerStatsCollectionO___bowlerOrderFn;
	this.catcherOrderFn		= GGTRCC_PlayerStatsCollectionO___catcherOrderFn;
	this.keeperOrderFn		= GGTRCC_PlayerStatsCollectionO___keeperOrderFn;
}


//------------------------------------------------------------
// Find the GGTRCC_PlayerStatsO object in the collection, or
// create a new one.
//
//------------------------------------------------------------
function GGTRCC_PlayerStatsCollectionO___find (aName)
{
	var lRet=null;
	
	for (var i=0 ; i<this.mCollection.length ; i++)
	{
		if (this.mCollection[i].mName == aName)
		{
			lRet = this.mCollection[i];
			break;
		}
	}
	
	if (null == lRet)
	{
		lRet = new GGTRCC_PlayerStatsO (aName);
		
		this.mCollection[this.mCollection.length] = lRet;
	}

	return (lRet);
}

function GGTRCC_PlayerStatsCollectionO___updateTRCCBatting (aBatsmanInningsO)
{
	this.find (aBatsmanInningsO.mName).mBatsmanSummary.update(aBatsmanInningsO);
	
	if (aBatsmanInningsO.isKeeper())
	{
		this.find (aBatsmanInningsO.mName).mKeeperStats.incGames();
	}
}

function GGTRCC_PlayerStatsCollectionO___updateTRCCBowling (aBowlerSummaryO)
{
	this.find (aBowlerSummaryO.mName).mBowlerStats.update (aBowlerSummaryO);
}


//------------------------------------------------------------
// The incoming batsman _should_ be an oppo batter
//------------------------------------------------------------
function GGTRCC_PlayerStatsCollectionO___updateTRCCCatching (aBatsmanInningsO)
{
	var lHowOut = aBatsmanInningsO.mHowOut;
	var lCaught="Caught ";
	var lCandB="Caught & Bowled";
	
	if (null == lHowOut)
	{
		// Batsman did not bat
	}
	else if (lHowOut.length < lCaught.length) // was the person caught?
	{
		// Not caught - No stats update
	}
	else if (0 != lHowOut.indexOf(lCaught))
	{
		// Not caught
	}
	else if (0 == lHowOut.indexOf(lCandB))
	{
		//
		// Caught & bowled
		//
		this.find (aBatsmanInningsO.mBowler).mCatcherStats.update (true);
	}
	else
	{
		//
		// Regular catch
		//
		var lCatcher=GGUtils_collapseStringSpaces (lHowOut.slice (lCaught.length));
		
		this.find (lCatcher).mCatcherStats.update (false);
	}
}


//------------------------------------------------------------
// The incoming batsman _should_ be an oppo batter
//------------------------------------------------------------
function GGTRCC_PlayerStatsCollectionO___updateTRCCKeeping (aKeeperName, aBatsmanInningsO)
{
	var lHowOut = aBatsmanInningsO.mHowOut;
	var lStumped="Stumped";
	var lCaughtKeeper="Caught Keeper";
	
	if (null == lHowOut)
	{
		// Batsman did not bat
	}
	else if (0 == lHowOut.indexOf(lStumped))
	{
		this.find (aKeeperName).mKeeperStats.incStumpings();		
	}
	else if (0 == lHowOut.indexOf(lCaughtKeeper))
	{
		this.find (aKeeperName).mKeeperStats.incCatches();		
	}
}


//------------------------------------------------------------
// Render the HTML for the batsman
//
// @param	aGetAlsoBatted	IN	Show the "also batted" data
//
//------------------------------------------------------------
function GGTRCC_PlayerStatsCollectionO___batsmanHTML (aGetAlsoBatted)
{
	var lHTML="";
	
	//
	// Sort the play stats for by batting prowess
	//
	var lBatSum=this.getOrderedBattingStats(aGetAlsoBatted);
	
	lHTML += "<table width='100%' cellSpacing='0' cellPadding='0' border='0'>";
	lHTML += "	<thead>";
	lHTML += "	<tr class=\"GadgetBatsHeader\">";
	lHTML += "		<th>&nbsp;</th>";

	lHTML += "		<th align='left'>Name</th>";
	lHTML += "		<th align='right'>Games</th>";
	lHTML += "		<th align='right'>Innings</th>";
	lHTML += "		<th align='right'>Not Out</th>";
	lHTML += "		<th align='right'>Runs</th>";
	lHTML += "		<th align='right'>100s</th>";
	lHTML += "		<th align='right'>50s</th>";
	lHTML += "		<th align='right'>0s</th>";
	lHTML += "		<th align='right'>High</th>";
	lHTML += "		<th align='right'>Avg.</th>";

	lHTML += "		<th>&nbsp;</th>";
	lHTML += "	</tr>";
	lHTML += "	</thead>";
	lHTML += "	<tbody>";
	
	//
	// Getnerate the HTML
	//
	for (var i=0 ; i<lBatSum.length ; i++)
	{
		
		var lDefaultTRClass="GadgetFixtureAltLine";

		if (i % 2)
		{
			lDefaultTRClass = "GadgetFixtureNotAltLine";
		}

		lHTML += "<tr class='"							+ lDefaultTRClass	+ "' " +
				 "onmouseout=\"this.className='"		+ lDefaultTRClass	+ "'\" " + 
				 "onmouseover=\"this.className='"	+ "GadgetTableMouseOver"	+ "'\">";
		
		lHTML += lBatSum[i].batsmanHTML();
		
		lHTML += "</tr>";
	}
	
	lHTML += "	</tbody>";
	lHTML += "</table>";
	
	return (lHTML);
}


function GGTRCC_PlayerStatsCollectionO___batterOrderFn (aA, aB)
{
	var lRet = aB.mBatsmanSummary.getAverage() - aA.mBatsmanSummary.getAverage();

	if ((aA.mBatsmanSummary.getAverage() == 0) && (aB.mBatsmanSummary.getAverage() == 0))
	{
		var lAouts=aA.mBatsmanSummary.mInnings - aA.mBatsmanSummary.mNotOuts;
		var lBouts=aB.mBatsmanSummary.mInnings - aB.mBatsmanSummary.mNotOuts;

		lRet = lBouts - lAouts;

		if (lRet == 0)
		{
			lRet = aB.mBatsmanSummary.mRuns - aA.mBatsmanSummary.mRuns;
		}
	}

	return (lRet);
}


//------------------------------------------------------------
// Get batter stats ordered - either the true "stats", or 
// the "also batted"
//------------------------------------------------------------
function GGTRCC_PlayerStatsCollectionO___getOrderedBattingStats (aGetAlsoBatted)
{
	var lBS=new Array();

	for (var i=0 ; i<this.mCollection.length ; i++)
	{
		if (this.mCollection[i].mBatsmanSummary.mInnings > 0)
		{
			var lOuts=this.mCollection[i].mBatsmanSummary.mInnings - this.mCollection[i].mBatsmanSummary.mNotOuts;

			if (((lOuts >= this.mBattingOutsCutoff) && !aGetAlsoBatted)	||
				((lOuts <  this.mBattingOutsCutoff) && aGetAlsoBatted))
			{
				lBS[lBS.length] = this.mCollection[i];
			}

		}
	}

	lBS.sort (this.batterOrderFn);

	return (lBS);
}


//------------------------------------------------------------
// Render the HTML for the bowlers
//
// @param	aGetAlsoBowled	IN	Show the "also bowled" data
//
//------------------------------------------------------------
function GGTRCC_PlayerStatsCollectionO___bowlerHTML (aGetAlsoBowled)
{
	var lHTML="";
	
	//
	// Sort the play stats for by bowling prowess
	//
	var lBowlSum=this.getOrderedBowlingStats(aGetAlsoBowled);
	
	lHTML += "<table width='100%' cellSpacing='0' cellPadding='0' border='0'>";
	lHTML += "	<thead>";
	lHTML += "	<tr class=\"GadgetBatsHeader\">";
	lHTML += "		<th>&nbsp;</th>";
	lHTML += "		<th align='left'>Name</th>";
	lHTML += "		<th align='right'>Games</th>";
	lHTML += "		<th align='right'>Overs</th>";
	lHTML += "		<th align='right'>Maidens</th>";
	lHTML += "		<th align='right'>Runs</th>";
	lHTML += "		<th align='right'>Wickets</th>";
	lHTML += "		<th align='right'>5+</th>";
	lHTML += "		<th align='right'>Runs/Over</th>";
	lHTML += "		<th align='right'>Strike Rate</th>";
	lHTML += "		<th align='right'>Average</th>";
	lHTML += "		<th>&nbsp;</th>";
	lHTML += "	</tr>";
	lHTML += "	</thead>";
	lHTML += "	<tbody>";

	//
	// Getnerate the HTML
	//
	for (var i=0 ; i<lBowlSum.length ; i++)
	{
		
		var lDefaultTRClass="GadgetFixtureAltLine";

		if (i % 2)
		{
			lDefaultTRClass = "GadgetFixtureNotAltLine";
		}

		lHTML += "<tr class='"							+ lDefaultTRClass	+ "' " +
				 "onmouseout=\"this.className='"		+ lDefaultTRClass	+ "'\" " + 
				 "onmouseover=\"this.className='"	+ "GadgetTableMouseOver"	+ "'\">";
		
		lHTML += lBowlSum[i].bowlerHTML();
		
		lHTML += "</tr>";
	}
	
	lHTML += "	</tbody>";
	lHTML += "</table>";
	
	return (lHTML);
}


function GGTRCC_PlayerStatsCollectionO___getOrderedBowlingStats(aGetAlsoBowled)
{
	var lBS=new Array(0);
	
	for (var i=0 ; i<this.mCollection.length ; i++)
	{
		if (this.mCollection[i].mBowlerStats.mGames > 0)
		{
			if (((this.mCollection[i].mBowlerStats.mOvers <  this.mBowlngOversCutoff) && aGetAlsoBowled)	||
				((this.mCollection[i].mBowlerStats.mOvers >= this.mBowlngOversCutoff) && !aGetAlsoBowled))
			{
				lBS[lBS.length] = this.mCollection[i];
			}
		}		
	}

	lBS.sort (this.bowlerOrderFn);
	
	return (lBS);
}

function GGTRCC_PlayerStatsCollectionO___bowlerOrderFn (aA, aB)
{
	var lRet = aA.mBowlerStats.getAverage() - aB.mBowlerStats.getAverage();

	if (aA.mBowlerStats.getAverage() == 0)
	{
		lRet = 1;
	}
	else if (aB.mBowlerStats.getAverage() == 0)
	{
		lRet = -1;
	}

	return (lRet);
}


function GGTRCC_PlayerStatsCollectionO___catcherHTML ()
{
	var lHTML="";

	var lCatchers=this.getOrderedCatchingStats();
	
	lHTML += "<p align='center'>";
	lHTML += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	lHTML += "	<tr class=\"GadgetBatsHeader\">";
	lHTML += "		<th>&nbsp;</th>";
	lHTML += "		<th align='left'>Name</th>";
	lHTML += "		<th align='right'>Games as Keeper</th>";
	lHTML += "		<th align='right'>Total Catches</th>";
	lHTML += "		<th align='right'>Caught & Bowled</th>";
	lHTML += "		<th>&nbsp;</th>";
	lHTML += "	</tr>";

	for (var i=0 ; i<lCatchers.length ; i++)
	{
		var lDefaultTRClass="GadgetFixtureAltLine";

		if (i % 2)
		{
			lDefaultTRClass = "GadgetFixtureNotAltLine";
		}

		lHTML += "<tr class='"						+ lDefaultTRClass	+ "' " 		+
				 "onmouseout=\"this.className='"	+ lDefaultTRClass	+ "'\" " 	+ 
				 "onmouseover=\"this.className='"	+ "GadgetTableMouseOver"	+ "'\">";

		lHTML += lCatchers[i].catcherHTML();
			
		lHTML += "</tr>";
	}
	
	lHTML += "</table>";
	
	return (lHTML);
}


function GGTRCC_PlayerStatsCollectionO___getOrderedCatchingStats()
{
	var lBS=new Array(0);
	
	for (var i=0 ; i<this.mCollection.length ; i++)
	{
		if (this.mCollection[i].mCatcherStats.mCatches > 0)
		{
			lBS[lBS.length] = this.mCollection[i];
		}		
	}

	lBS.sort (this.catcherOrderFn);
	
	return (lBS);
}


function GGTRCC_PlayerStatsCollectionO___catcherOrderFn (aA, aB)
{
	return (aB.mCatcherStats.mCatches - aA.mCatcherStats.mCatches);
}



function GGTRCC_PlayerStatsCollectionO___keeperHTML()
{
	var lHTML="";

	var lKeepers=this.getOrderedKeepingStats();

	lHTML += "<p align='center'>";
	lHTML += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	lHTML += "	<tr class=\"GadgetBatsHeader\">";
	lHTML += "		<th>&nbsp;</th>";
	lHTML += "		<th align='left'>Name</th>";
	lHTML += "		<th align='right'>Catches</th>";
	lHTML += "		<th align='right'>Stumpings</th>";
	lHTML += "		<th>&nbsp;</th>";
	lHTML += "	</tr>";

	for (var i=0 ; i<lKeepers.length ; i++)
	{
		var lDefaultTRClass="GadgetFixtureAltLine";

		if (i % 2)
		{
			lDefaultTRClass = "GadgetFixtureNotAltLine";
		}

		lHTML += "<tr class='"						+ lDefaultTRClass	+ "' " 		+
				 "onmouseout=\"this.className='"	+ lDefaultTRClass	+ "'\" " 	+ 
				 "onmouseover=\"this.className='"	+ "GadgetTableMouseOver"	+ "'\">";

		lHTML += lKeepers[i].keeperHTML();
			
		lHTML += "</tr>";
	}
	
	lHTML += "</table>";
	
	return (lHTML);
}


function GGTRCC_PlayerStatsCollectionO___getOrderedKeepingStats()
{
	var lBS=new Array(0);
	
	for (var i=0 ; i<this.mCollection.length ; i++)
	{
		if (this.mCollection[i].mKeeperStats.mGames > 0)
		{
			lBS[lBS.length] = this.mCollection[i];
		}		
	}

	lBS.sort (this.keeperOrderFn);
	
	return (lBS);
}


function GGTRCC_PlayerStatsCollectionO___keeperOrderFn (aA, aB)
{
	return ((aB.mKeeperStats.mCatches + aB.mKeeperStats.mStumpings) - (aA.mKeeperStats.mCatches + aA.mKeeperStats.mStumpings));
}
