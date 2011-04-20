// The output data string
var gMatchDE_Output="";

function MatchDE_Generate (aOpposition, aDate, aVenue, aResult, aFirstInnings, aSecondInnings)
{
	//
	// Initialise
	//
	gMatchDE_Output = "";

	//
	// Filename that this data is destined for
	//
	var lFile = MonthNumToString (aDate) + "_" + DateNumToString (aDate) + "_" + aOpposition;
	lFile = SpacesToUnderline (lFile)
	lFile += ".js";
	
	lFile = lFile.toLowerCase();

	//
	// Start with the preable
	//
	MatchDE_AddLine ("//", false);
	MatchDE_AddLine ("// Match report generated " + (new Date()).toString(), false);
	MatchDE_AddLine ("// destined for year = " + aDate.getFullYear() + " filename = " + lFile, false);
	MatchDE_AddLine ("//", false);
	MatchDE_AddLine ("// Fixure entry of the form -", false);

	var lFixtureData = "new Fixture (new Date (\"" + aDate.toString() + "\"), \"" 
													+ aOpposition + "\",	"
													+ "null, " 
													+ aVenue + ", " 
													+ aResult + ", true);";

	MatchDE_AddLine ("// " + lFixtureData, false);

	MatchDE_AddLine ("//", false);

	// Surrounding brackets
	MatchDE_AddLine ("{", false);

		MatchDE_AddLine ("//");
		MatchDE_AddLine ("// Create the teams");
		MatchDE_AddLine ("//");
		MatchDE_AddLine ("var lTRCC = new Team();");
		MatchDE_AddLine ("var lOppo = new Team (\"" + aOpposition + "\");");
		MatchDE_AddLine ("");

		MatchDE_AddLine ("//");
		MatchDE_AddLine ("// Create the game - First team batted first, second team batted second");
		MatchDE_AddLine ("//");
		if (aFirstInnings.IsTRCC)
		{
			MatchDE_AddLine ("var lGame = new Game (lTRCC, lOppo, new Date (\"" + aDate.toString() + "\"));");
		}
		else
		{
			MatchDE_AddLine ("var lGame = new Game (lOppo, lTRCC, new Date (\"" + aDate.toString() + "\"));");
		}

		MatchDE_AddLine ("");

		//
		// Match report
		//
		MatchDE_AddLine ("//");
		MatchDE_AddLine ("// Match report");
		MatchDE_AddLine ("//");
		MatchDE_AddLine ("lGame.MatchReport (\"There is no report for this game\");");
		MatchDE_AddLine ("");

		//
		// First innings
		//
		aFirstInnings.GenerateData();
		MatchDE_AddLine ("");
		MatchDE_AddLine ("");

		//
		// Second innings
		//
		aSecondInnings.GenerateData();

	// Surrounding brackets
	MatchDE_AddLine ("}", false);

	//
	//
	//
	// ForwardDataToOutput (MatchDE_GetOutput(), aDate, lFile, lFixtureData);
	return (MatchDE_GetOutput());
}

function MatchDE_GetOutput()
{
	return (gMatchDE_Output);
}

function MatchDE_AddLine (aLine, aIndent)
{
	if ((aIndent == null) || (aIndent))
	{
		// Could not get tabbing to work in outlook
		gMatchDE_Output += "\t";
		// gMatchDE_Output += "%09";
	}

	gMatchDE_Output += aLine;
	gMatchDE_Output += "\n";
	// gMatchDE_Output += "%0d%0a";
}

function MatchDE_DisplayData ()
{
	var lWindowprops="directories=no,menubar=yes,resizable=yes,scrollbars=yes,status=no,toolbar=no";

	lPreview = window.open ("", "preview", lWindowprops);
	lPreview.document.open ("text/plain; charset=windows-1252");
	lPreview.document.write (MatchDE_GetOutput());
	lPreview.document.close ();
}
