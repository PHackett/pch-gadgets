
//-----------------------------------------[GGTRCC_TeamYearO]-
// Object to hold information on the teams that played in a 
// given year
//
// @param aYearXML 		IN 	The XML describing the teams that 
// 							 played in a single yeat
//
//------------------------------------------------------------
function GGTRCC_TeamYearO (aYearXML)
{
	//
	// Members
	//
	this.mYear     = "";
	this.mSaturday = false;
	this.mSunday   = false;
	this.mYouth    = false;
	this.m2020     = false;

	//
	// Methods
	//
	this.year 			= GGTRCC_TeamYearO___year;
	this.statsLink		= GGTRCC_TeamYearO___statsLink;
	
	this.haveSaturday 	= GGTRCC_TeamYearO___haveSaturday;
	this.haveSunday 	= GGTRCC_TeamYearO___haveSunday;
	this.haveYouth	 	= GGTRCC_TeamYearO___haveYouth;
	this.have2020	 	= GGTRCC_TeamYearO___have2020;
	
	this.saturdayHTML 	= GGTRCC_TeamYearO___saturdayHTML;
	this.sundayHTML 	= GGTRCC_TeamYearO___sundayHTML;
	this.youthHTML 		= GGTRCC_TeamYearO___youthHTML;
	this.x2020HTML 		= GGTRCC_TeamYearO___2020HTML;
	
	this.teamHTML 		= GGTRCC_TeamYearO___teamHTML;
	
	this.getTeams 		= GGTRCC_TeamYearO___getTeams;

	//
	// Parse the XML
	//
	this.mYear = aYearXML.getAttribute ("year");
	
	var lTeams = aYearXML.childNodes;
	
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
			else if (lTeams.item(j).firstChild.nodeValue == "Youth")
			{
				this.mYouth = true;
			}
			else if (lTeams.item(j).firstChild.nodeValue == "20-20")
			{
				this.m2020 = true;
			}
		}
	}
}

function GGTRCC_TeamYearO___year ()			{ return (this.mYear);		}
function GGTRCC_TeamYearO___haveSaturday()	{ return (this.mSaturday);	}
function GGTRCC_TeamYearO___haveSunday()	{ return (this.mSunday);	}
function GGTRCC_TeamYearO___haveYouth()		{ return (this.mYouth);		}
function GGTRCC_TeamYearO___have2020()		{ return (this.m2020);		}


//------------------------------------------[GGTRCC_teamHTML]-
// Return the HTML & link for this team
//
//	@param	aExists		IN	Does this team have a result in this year?
//	@param	aTeamLabel	IN	The team name
//
// @return 	The HMTL 
//
//------------------------------------------------------------
function GGTRCC_TeamYearO___teamHTML (aExists, aTeamLabel)
{
	var lRet="&nbsp";
	
	if (aExists)
	{
		var lURL=GGGadget_getHostingRoot();

		if (GGGadget_hostedOnSites())
		{
			lURL += "All-Fixtures";
			lURL += "/" + this.mYear;
			lURL += "/" + aTeamLabel;
		}
		else
		{
			lURL += "Fixtures/FixturesByYear.html";
			lURL += "?year=" + this.mYear + "&team=" + aTeamLabel;
		}
		
		lRet = GGUtils_makeHREF (aTeamLabel, lURL);
	}
	
	return (lRet);
}

function GGTRCC_TeamYearO___saturdayHTML()	{ return (this.teamHTML (this.haveSaturday(), "Saturday"));	}
function GGTRCC_TeamYearO___sundayHTML()	{ return (this.teamHTML (this.haveSunday(), "Sunday"));		}
function GGTRCC_TeamYearO___youthHTML()		{ return (this.teamHTML (this.haveYouth(), "Youth"));		}
function GGTRCC_TeamYearO___2020HTML()		{ return (this.teamHTML (this.have2020(), "20-20"));		}


//------------------------------------------------------------
// Create the HTML that links to the relevant year stats page
// for this object
//------------------------------------------------------------
function GGTRCC_TeamYearO___statsLink()
{
	var lURL=GGGadget_getHostingRoot();

	if (GGGadget_hostedOnSites())
	{
		lURL += "All-Fixtures/" + this.mYear + "/stats" + this.mDate.year();
	}
	else 
	{
		lURL += "Stats/YearStats.html?year=" + this.mYear;
	}
	
	return (GGUtils_makeHREF (this.mYear, lURL));
}

//------------------------------[GGTRCC_TeamYearO___getTeams]-
// Get an array detailing all the teams in the object 
//
//	@return		The array
//
//------------------------------------------------------------
function GGTRCC_TeamYearO___getTeams()
{
	var lTeams=new Array();
	
	if (this.haveSaturday())
	{
		lTeams.push("Saturday");
	}

	if (this.haveSunday())
	{
		lTeams.push("Sunday");
	}

	if (this.haveYouth())
	{
		lTeams.push("Youth");
	}
	
	if (this.have2020())
	{
		lTeams.push("20-20");
	}
	
	return (lTeams);
}


//
// The following are utility functions to help with the manipulation of TeamYears objects
//


//---------------------------------[GGTRCC_LoadTeamYearsXML]-
// Read the teams/years XML and add then call the supplied 
// callback. 
//
// 	@param	aXMLloaderFunc	IN	The funiton to load the XML. 
//	@param	aCallback		IN	callback funtion. Takes one
//								 parameter - The XML
//
//------------------------------------------------------------
function GGTRCC_LoadTeamYearsXML (aXMLloaderFunc, aCallback)
{
	//
	// XML data for TRCC fixure years
	//
	var lURL = gGGGadget_Root + "TRCC/data/fixtures/fixtureYearsDB.xml";
	
	//
	// Get the XML - Callback to function renderData when complete
	//
	aXMLloaderFunc (lURL, aCallback);	
}


//-----------------------------[GGTRCC_LoadTeamYearsFromXML]-
// Read the teams/years from the supplied XML and add then 
// to the end of the given array.
//
//	@param	aXML		IN	The XML to examine
//	@param	aOut		IN	The array of TeamYear objects 
// 							 we are to append to
//
// @return 	Number of TeamYears read in, or -1 upon error 
//
//------------------------------------------------------------
function GGTRCC_LoadTeamYearsFromXML (aXML, aOut)
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
		aOut[aOut.length] = new GGTRCC_TeamYearO (lYears.item(i));
	}
	
	return (lYears.length);
}


//-----------------------------------[GGTRCC_TeamYearsToHTML]-
// Render tha array of team/years obects in to XML 
//
//	@param	aTeamTearsA	IN	The objects
//
// @return 	HTML string 
//
//------------------------------------------------------------
function GGTRCC_TeamYearsToHTML (aTeamTearsA)
{
	//
	// Start building HTML string that will be displayed in <div>.
	//
	var lHTML = "<table border='0' cellpadding='5' cellspacing='0' width='100%'>";
	
	//
	// Now down all the entries ...
	//
	for (var i=0 ; i<aTeamTearsA.length ; ++i)
	{
		//
		// We can now write the line out
		//
		lHTML += (i % 2) ? "<tr>" : "<tr class='GadgetFixtureAltLine'>";
		
		lHTML += "<td";
		
		if (0 == i)
		{
			lHTML += " class='GadgetContentHeading'";
		}

		lHTML += ">" + aTeamTearsA[i].year() + "</td>";
		
		lHTML += "<td>" + aTeamTearsA[i].saturdayHTML() + "<td>"; 
		lHTML += "<td>" + aTeamTearsA[i].sundayHTML()   + "<td>"; 
		lHTML += "<td>" + aTeamTearsA[i].youthHTML()    + "<td>"; 
		lHTML += "<td>" + aTeamTearsA[i].x2020HTML()    + "<td>"; 

		lHTML += "</tr>";
	}

	//
	// End the table
	//
	lHTML += "</table>";
	
	return (lHTML);
}


//------------------------------------------------------------
// Render tha array of team/years obects so as to present a page
// allowing the user to select a year whose stats they wish to 
// view. 
//
//	@param	aTeamTearsA	IN	The objects
//
// @return 	HTML string 
//
//------------------------------------------------------------
function GGTRCC_TeamYearsToStatsHTML (aTeamYearsA)
{
	var lSPL=5;
	var lRet="";

	lRet += "<table width='100%' border='0' cellpadding='5' cellspacing='0'>";

	//
	// Current year first
	//
	lRet += "<tr>";
	lRet += "  <td>";
	lRet += aTeamYearsA[0].statsLink();
	lRet += "  </td>";
	for (var lPad=1 ; lPad<lSPL ; lPad++)
	{
		lRet += "<td>&nbsp;</td>";
	}

	lRet += "</tr>";
	lRet += "</table>";
	
	lRet += "<table width='100%' border='0' cellpadding='5' cellspacing='0'>";

	var lNumOtherFix=aTeamYearsA.length-1;
	var lIndex=1;

	while (lIndex < aTeamYearsA.length)
	{
		lRet += "<tr>";

		for (var r=0 ; r<lSPL ; r++)
		{
			if (lIndex<aTeamYearsA.length)
			{
				lRet += "<td>" + aTeamYearsA[lIndex].statsLink() + "</td>";

				lIndex++;
			}
			else
			{
				lRet += "<td>&nbsp;</td>";
			}
		}

		lRet += "</tr>";
	}

	lRet += "</table>";
	
	return (lRet);
}