//
// Globals
//
var gGGGadget_MultiLoader_Object=null;

function GGGadget_MultiLoader_GlobalCB(aXML)
{
	gGGGadget_MultiLoader_Object.P___loaderCB(aXML);
}


//------------------------------------------[GGGadget_UrlXml]-
// Holds a URL and (when downloaded) the XML loaded from that URL 
//
//
//------------------------------------------------------------
function GGGadget_UrlXml ()
{
	this.mURL 			= null;
	this.mXML			= null;
}


//------------------------------------------[GGGadget_UrlXml]-
// Holds a URL and (when downloaded) the XML loaded from that URL 
//
//
//------------------------------------------------------------
function GGGadget_MultiLoader ()
{
	//
	// Members
	//
	this.mItems 	= new Array;
	this.mFinalCB	= null;
	
	//
	// Methods
	//
	this.add 			= GGGadget_MultiLoader___add;
	this.setCB 			= GGGadget_MultiLoader___setCB;
	this.invoke			= GGGadget_MultiLoader___invoke;

	//
	// Privatge members
	//
	this.mCurrentDownloadIndex	= 0;
	
	//
	// Private methods
	//
	this.P___performFinalCB		= GGGadget_MultiLoader___performFinalCB;
	this.P___loaderCB			= GGGadget_MultiLoader___loaderCB;

	//
	// Point to using the global
	//
	gGGGadget_MultiLoader_Object = this;
}


function GGGadget_MultiLoader___add (aURL)
{
	var lItem = new GGGadget_UrlXml();
	
	lItem.mURL = aURL;
	
	this.mItems[this.mItems.length] = lItem;
}


function GGGadget_MultiLoader___setCB (aCB)
{
	this.mFinalCB = aCB;
}


//--------------------------[GGGadget_MultiLoader___loaderCB]-
// Callback invoked when XML loaded 
//
//------------------------------------------------------------
function GGGadget_MultiLoader___loaderCB (aXML)
{
	if (aXML == null || typeof(aXML) != "object" || aXML.firstChild == null)
	{
		//
		// Download failed
		//
	}
	else
	{
		this.mItems[this.mCurrentDownloadIndex].mXML = aXML
	}

	//
	// And the next one please ...
	// 	
	this.mCurrentDownloadIndex++;
	this.invoke();

}


function GGGadget_MultiLoader___performFinalCB()
{
	this.mFinalCB (this.mItems);
}


function GGGadget_MultiLoader___invoke()
{
	if (this.mCurrentDownloadIndex >= this.mItems.length)
	{
		this.P___performFinalCB();
	}
	else
	{
		//
		// Get the XML
		//
		_IG_FetchXmlContent (this.mItems[this.mCurrentDownloadIndex], GGGadget_MultiLoader_GlobalCB);	
	}
}


