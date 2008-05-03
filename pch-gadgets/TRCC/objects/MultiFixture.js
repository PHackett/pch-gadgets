//
// This file is to aid in the loading of multiple fitures lists, i.e. fixtures for many team/year 
// combinations. This will come in handy hwen we want to load all the fixture information for a
// single year (Saturday, Sunday & possibly 'yoof').
//

//---------------------------------------[GGTRCC_FixtureTagO]-
// Object to hold information on a single team/year 
// combination (A fixture 'Tag').
//
//
// @param aYear 	IN 	The year
// @param aTeam 	IN 	The team (Saturday, Sunday, Youth)
//
//------------------------------------------------------------
function GGTRCC_FixtureTagO (aYear, aTeam)
{
	this.mYear = aYear;
	this.mTeam = aTeam;
	
	this.team = GGTRCC_FixtureTagO___team;
	this.year = GGTRCC_FixtureTagO___year;
}

function GGTRCC_FixtureTagO___team()	{ return (this.mTeam);	}
function GGTRCC_FixtureTagO___year()	{ return (this.mYear);	}


//
// Static data to help with the loading of the data
//
var s___FinalCB;
var s___XMLloaderFunc;
var s___FixtureTagA;
var s___LoadedFixturesA;

//
// 'Static' functions
//

//----------------------------------------[sFn___XMLLoaderCB]-
// Callback from loading an individual fixture file
//
//------------------------------------------------------------
function sFn___XMLLoaderCB (aXML)
{
	if ((aXML == null) || (typeof(aXML) != "object") || (aXML.firstChild == null))
	{
		//
		// Something wrong ...
		//
	}
	else
	{
		//
		// Read the XML into objects
		//
		var lFixtures=new Array();
	
		GGTRCC_LoadFixturesFromXML (aXML, lFixtures);
		
		//
		// Add it to what we already have
		//
		for (var i=0 ; i<lFixtures.length ; ++i)
		{
			s___LoadedFixturesA.push (lFixtures[i]);
		}
	}
	
	//
	// On to the next one 
	//
	sFn___LoadFromArray();
}


//--------------------------------------[sFn___LoadFromArray]-
// Load fixture data using the array
//
//------------------------------------------------------------
function sFn___LoadFromArray ()
{
	if (0 == s___FixtureTagA.length)
	{
		//
		// No more fixtures to load. Sort the array in to date order
		//
		s___FixtureTagA = s___FixtureTagA.sort(GGTRCC_SortFixturesByDate);
		
		//
		// Invoke the final (Original) callback
		//
		s___FinalCB (s___LoadedFixturesA);
	}
	else
	{
		//
		// Get an item to load
		//
		var lFT=s___FixtureTagA.pop();
		
		//
		// Load the XML
		//
		GGTRCC_LoadTeamYearFixtureXMLByDateAndTeam (lFT.year(), lFT.team(), s___XMLloaderFunc, sFn___XMLLoaderCB);
	}
}



//--------------------------[GGTRCC_loadMultipleFixtureLists]-
// Load the fixtures for multiple year/team combinations
//
// @param aFixtureTagA		IN 	Array of GGTRCC_FixtureTagO 
// 								 objects whose data we are to load 
// 	@param	aXMLloaderFunc	IN	The funiton to load the XML. 
//	@param	aCallback		IN	The callback to invoke once 
// 								 all the fixtures are loaded. 
//
//------------------------------------------------------------
function GGTRCC_loadMultipleFixtureLists (aFixtureTagA, aXMLloaderFunc, aCallback)
{
	//
	// Save away the calling data
	//
	s___FinalCB 		= aCallback;
	s___XMLloaderFunc 	= aXMLloaderFunc;
	s___FixtureTagA 	= new Array();
	
	for (var i=0 ; i<aFixtureTagA.length ; ++i)
	{
		s___FixtureTagA.push (aFixtureTagA[i]);
	}
	
	//
	// Initialise the return data
	//
	s___LoadedFixturesA = new Array();
	
	//
	// Start it off ...
	//
	sFn___LoadFromArray();
}