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
			lRet = aArray[i];
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
