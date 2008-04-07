//-----------------------------------[GGTRCC_BatsmanInningsO]-
// Object to hold information on a single innings for a batsman.
//
//	A single innings XML will look like - 
//
//		<Batsman index="1" name="I Blair">
//          <HowOut how="Bowled"/>
//          <Bowler name="Paul Hackett"/>
//          <Runs value="3"/>
//        </Batsman>
//
// @param aBatsmanXML 	IN 	The innings XML node
//
//------------------------------------------------------------
function GGTRCC_BatsmanInningsO (aBatsmanXML)
{
	this.mName		= null;
	this.mHowOut	= null;
	this.mBowler	= null;
	this.mRuns		= null;

	//
	// Get the always present batsman attributes
	//
	this.mName	= aBatsmanXML.getAttribute ("name");

	//
	// Now the other stuff
	//
	var lData = aBatsmanXML.childNodes;

	for (var i=0 ; i<lData.length ; ++i)
	{
		if (lData.item(i).nodeName == "HowOut")
		{
			this.mHowOut = lData.item(i).nodeValue;
		}
		
		if (lData.item(i).nodeName == "Bowler")
		{
			this.mBowler = lData.item(i).nodeValue;
		}
		
		if (lData.item(i).nodeName == "Runs")
		{
			this.mRuns = lData.item(i).nodeValue;
		}
	}

	//
	// Methods
	//
	this.HTML 		= GGTRCC_BatsmanInningsO___HTML;
}


function GGTRCC_BatsmanInningsO___HTML()
{
	var lRet="Batsman " + this.mName;
	
	if (null != this.mHowOut)
	{
		lRet += " H/O=" + this.mHowOut;
	}
	
	if (null != this.mBowler)
	{
		lRet += " bwlr=" + this.mBowler;
	}
	
	if (null != this.mRuns)
	{
		lRet += " runs=" + this.mRuns;
	}
	
	return (lRet + "<br>");
}

