//------------------------------------[GGTRCC_BowlerSummaryO]-
// Object to hold a collection of GGTRCC_CatcherStatsO objects
//
//------------------------------------------------------------
function GGTRCC_CatcherStatsCollectionO ()
{
	this.mCollection = new Array;
	
	//
	// Methods
	//
	this.add 	= GGTRCC_CatcherStatsCollectionO___find;
	this.update = GGTRCC_CatcherStatsCollectionO___update;
}


//------------------------------------------------------------
// Find the GGTRCC_CatcherStatsO object in the collection, or
// create a new one.
//
//------------------------------------------------------------
function GGTRCC_CatcherStatsCollectionO___find (aName)
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
		lRet = new GGTRCC_CatcherStatsO (aName);
		
		this.mCollection[this.mCollection.length] = lRet;
	}

	return (lRet);
}


//------------------------------------------------------------
// Update the catcher stats for the given user - I.e. increment 
// the number of catches for the given player by one
//
//------------------------------------------------------------
function GGTRCC_CatcherStatsCollectionO___update (aName)
{
	this.find (aName).increment();
}
