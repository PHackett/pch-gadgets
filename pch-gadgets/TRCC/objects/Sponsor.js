//-----------------------------------------[GGTRCC_SponsorO]-
// Object to hold information on a sponsor
//
// @param aYearXML 		IN 	The XML describing the sponsor
//
//------------------------------------------------------------
function GGTRCC_SponsorO (aSponsorXML)
{
	//
	// Members
	//
	this.mName 		= "";
	this.mImage 	= false;
	this.mURL 		= false;

	//
	// Methods
	//
	this.name 	= GGTRCC_SponsorO___name;
	this.image 	= GGTRCC_SponsorO___image;
	this.URL 	= GGTRCC_SponsorO___URL;

	//
	// Parse the XML
	//
	var lXMLElement;
	
	if (1 == (lXMLElement = aSponsorXML.getElementsByTagName ("Name")).length)
	{
		this.mName = lXMLElement[0].firstChild.nodeValue;
	}

	if (1 == (lXMLElement = aSponsorXML.getElementsByTagName ("Image")).length)
	{
		this.mImage = lXMLElement[0].firstChild.nodeValue;
	}

	if (1 == (lXMLElement = aSponsorXML.getElementsByTagName ("URL")).length)
	{
		this.mURL = lXMLElement[0].firstChild.nodeValue;
	}
}


function GGTRCC_SponsorO___name()	{ return (this.mName);		}
function GGTRCC_SponsorO___image()	{ return (this.mImage);		}
function GGTRCC_SponsorO___URL()	{ return (this.mURL);		}


//--------------------------------[GGTRCC_LoadSponsorsFromXML]-
// Read the sponsorfrom the supplied XML and add then 
// to the end of the given array.
//
//	@param	aXML		IN	The XML to examine
//	@param	aOut		IN	The array of Sponsor objects 
// 							 we are to append to
//
// @return 	Number of TeamYears read in, or -1 upon error 
//
//------------------------------------------------------------
function GGTRCC_LoadSponsorsFromXML (aXML, aOut)
{
	//
	// Validate the XML
	//
	if ((aXML == null) || (typeof(aXML) != "object") || (aXML.firstChild == null))
	{
		return (-1);
	}

	//
	// Down all the fixtures
	//
	var lSponsors = aXML.getElementsByTagName("Sponsor");
	
	for (var i=0 ; i<lSponsors.length ; ++i)
	{
		aOut[aOut.length] = new GGTRCC_SponsorO (lSponsors.item(i));
	}
	
	return (lSponsors.length);
}


