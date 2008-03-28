
//-----------------------------------------[GGTRCC_TeamYearO]-
// Object to hold information on the teams that played in a 
// given year
//
// @param aYearXML 		IN 	The XML describing the teams that 
// 							 played in a single yeat
//
//------------------------------------------------------------
function GGTRCC_TeamYearO (aFixtureXML, aLinkTarget)
{
	//
	// Members
	//
	this.mYear = "";
	this.mSaturday = false;
	this.mSunday = false;
	this.mLinkTarget = aLinkTarget;
	if (null == this.mLinkTarget)
	{
		this.mLinkTarget = "";
	}

	//
	// Methods
	//
	this.year 			= GGTRCC_TeamYearO___year;
	this.haveSaturday 	= GGTRCC_TeamYearO___haveSaturday;
	this.haveSunday 	= GGTRCC_TeamYearO___haveSunday;
	this.saturdayHTML 	= GGTRCC_TeamYearO___saturdayHTML;
	this.sundayHTML 	= GGTRCC_TeamYearO___sundayHTML;
	this.teamHTML 		= GGTRCC_TeamYearO___teamHTML;

	//
	// Parse the XML
	//
	this.mYear = aFixtureXML.getAttribute ("year");
	
	var lTeams = aFixtureXML.childNodes;
	
	for (var j=0 ; j<lTeams.length ; ++j)
	{
		if (lTeams.item(j).nodeName == "Team")
		{
			if (lTeams.item(j).firstChild.nodeValue == "Saturday")
			{
				this.mSaturday = true;
			}
			else if (lTeams.item(j).firstChild.nodeValue == "Sunday")
			{
				this.mSunday = true;
			}
		}
	}
}

function GGTRCC_TeamYearO___year ()			{ return (this.mYear);		}
function GGTRCC_TeamYearO___haveSaturday()	{ return (this.mSaturday);	}
function GGTRCC_TeamYearO___haveSunday()	{ return (this.mSunday);	}

function GGTRCC_TeamYearO___teamHTML (aExists, aTeamLabel)
{
	var lRet="&nbsp";
	
	if (aExists)
	{
		var lBaseURL="http://www.paulhackett.plus.com/websites/trcc/Fixtures/FixturesByYear.html";

		if (GGGadget_hostedOnSites())
		{
			lBaseURL = gGGGadget_SitesRoot + "FixturesForYear";
		}		

		var lURL=lBaseURL + "?year=" + this.mYear + "+DOW=" + aTeamLabel;
		
		lRet = GGUtils_makeHREF (aTeamLabel, lURL, this.mLinkTarget);
	}
	
	return (lRet);
}

function GGTRCC_TeamYearO___saturdayHTML()	{ return (this.teamHTML (this.haveSaturday(), "Saturday"));	}
function GGTRCC_TeamYearO___sundayHTML()	{ return (this.teamHTML (this.haveSunday(), "Sunday"));		}


//
// The following are utility functions to help with the manipulation of TeamYears objects
//


//-----------------------------[GGTRCC_LoadTeamYearsFromXML]-
// Read the teams/years from the supplied XML and add then 
// to the end of the given array.
//
//	@param	aXML		IN	The XML to examine
//	@param	aOut		IN	The array of TeamYear objects 
// 							 we are to append to
//	@param	aLinkTarget	IN	For the generation of URLs
//
// @return 	Number of TeamYears read in, or -1 upon error 
//
//------------------------------------------------------------
function GGTRCC_LoadTeamYearsFromXML (aXML, aOut, aLinkTarget)
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
	var lYears = aXML.getElementsByTagName("TeamsInYear");
	
	for (var i=0 ; i<lYears.length ; ++i)
	{
		aOut[aOut.length] = new GGTRCC_TeamYearO (lYears.item(i), aLinkTarget);
	}
	
	return (lYears.length);
}
