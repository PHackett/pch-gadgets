//------------------------------------[GGTRCC_BowlerSummaryO]-
// Object to hold a collection of GGTRCC_BowlerStatsO objects
//
//------------------------------------------------------------
function GGTRCC_BowlerStatsCollectionO ()
{
	this.mCollection = new Array;
	
	//
	// Methods
	//
	this.add	= GGTRCC_BowlerStatsCollectionO___find;
	this.update = GGTRCC_BowlerStatsCollectionO___update;
}


//------------------------------------[GGTRCC_BowlerSummaryO]-
// Find the GGTRCC_BowlerStatsO object in the collection, or
// create a new one.
//
//------------------------------------------------------------
function GGTRCC_BowlerStatsCollectionO___find (aName)
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
		lRet = new GGTRCC_BowlerStatsO (aName);
		
		this.mCollection[this.mCollection.length] = lRet;
	}

	return (lRet);
}


//------------------------------------------------------------
// Update the bowler stats for the given user
//
// @param	aName			IN	Name of the batsman
// @param	aBowlInningData	IN	Information from a single innings
//
//------------------------------------------------------------
function GGTRCC_BowlerStatsCollectionO___update (aName, aBowlInningData)
{
	this.find (aName).increment(aBowlInningData);
}
