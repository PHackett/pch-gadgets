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
	this.add	= GGTRCC_PlayerStatsCollectionO___find;
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
