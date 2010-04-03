//------------------------------------------------------------
// Object to hold a collection of GGTRCC_PlayerStatsO objects
//
//------------------------------------------------------------
function GGTRCC_PlayerStatsCollectionO ()
{
	this.mCollection = new Array;
	
	//
	// Methods
	//
	this.find				= GGTRCC_PlayerStatsCollectionO___find;
	this.updateTRCCBatting	= GGTRCC_PlayerStatsCollectionO___updateTRCCBatting
	this.updateTRCCBowling	= GGTRCC_PlayerStatsCollectionO___updateTRCCBowling
	this.updateTRCCCatches	= GGTRCC_PlayerStatsCollectionO___updateTRCCCatches
	
	this.batsmanHTML		= GGTRCC_PlayerStatsCollectionO___batsmanHTML;
	
	this.batterOrderFn		= GGTRCC_PlayerStatsCollectionO___batterOrderFn;
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
}

function GGTRCC_PlayerStatsCollectionO___updateTRCCBowling (aBowlerSummaryO)
{
	
}

function GGTRCC_PlayerStatsCollectionO___updateTRCCCatches(aBowlerSummaryO)
{
	
}

function GGTRCC_PlayerStatsCollectionO___batsmanHTML()
{
	var lHTML="";
	
	//
	// Sort the play stats for by batting prowess
	//
	this.mCollection.sort (this.batterOrderFn);

	lHTML += "<table>";	
	//
	// Getnerate the HTML
	//
	for (var i=0 ; i<this.mCollection.length ; i++)
	{
		lHTML += "<tr>";
		lHTML += this.mCollection[i].batsmanHTML();
		lHTML += "</tr>";
	}
	lHTML += "</table>";	
	
	return (lHTML);
}


function GGTRCC_PlayerStatsCollectionO___batterOrderFn (aA, aB)
{
	var lRet = aA.mBatsmanSummary.getAverage() - aB.mBatsmanSummary.getAverage();

	if ((aA.mBatsmanSummary.getAverage() == 0) && (aB.mBatsmanSummary.getAverage() == 0))
	{
		var lAouts=aA.mInnings - aA.mNotOuts;
		var lBouts=aB.mInnings - aB.mNotOuts;

		lRet = lAouts - lBouts;

		if (lRet == 0)
		{
			lRet = aA.mRuns - aB.mRuns;
		}
	}

	return (lRet);
}
