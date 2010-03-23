//------------------------------------[GGTRCC_BowlerSummaryO]-
// Object to hold a collection of GGTRCC_BatsmanInningsO objects
//
//------------------------------------------------------------
function GGTRCC_BatsmanStatsCollectionO ()
{
	this.mCollection = new Array;
	
	//
	// Methods
	//
	this.add 	= GGTRCC_BatsmanStatsCollectionO___find;
	this.update	= GGTRCC_BatsmanStatsCollectionO___update;
}


//------------------------------------------------------------
// Find the GGTRCC_BatsmanStatsO object in the collection, or
// create a new one.
//
//------------------------------------------------------------
function GGTRCC_BatsmanStatsCollectionO___find (aName)
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
		lRet = new GGTRCC_BatsmanStatsO (aName);
		
		this.mCollection[this.mCollection.length] = lRet;
	}

	return (lRet);
}


//------------------------------------------------------------
// Update the batsman stats for the given user
//
// @param	aName			IN	Name of the batsman
// @param	aBatsInningData	IN	Information from a single innings
//
//------------------------------------------------------------
function GGTRCC_BatsmanStatsCollectionO___update (aName, aBatsInningData)
{
	this.find (aName).increment(aBatsInningData);
}
