
var gTeamFOWDEA=new Array();
var gNumFOW=10;


function FOWDE (aForm)
{
	this.mForm				= aForm;
	this.mIndex				= gTeamFOWDEA.length;
	this.mName				= this.mForm + "-TeamFOWDE-" + this.mIndex;

	//
	// Batsman Fallen DE
	//
	this.mBatterOut			= new Array();
	for (var i=0 ; i< gNumFOW ; i++)
	{
		this.mBatterOut[i] = new IntegerInput (this.mForm, 1, 11);
		this.mBatterOut[i].SetDisplayClass ("InputAltLine");
	}

	//
	// Score at fall DE
	//
	this.mScore				= new Array();
	for (var i=0 ; i< gNumFOW ; i++)
	{
		this.mScore[i] = new IntegerInput (this.mForm, 0, 800);
		this.mScore[i].SetDisplayClass ("InputAltLine");
	}

	this.HTML					= FOWDE___HTML;
	this.GenerateData			= FOWDE___GenerateData;

	gTeamFOWDEA[this.mIndex] = this;
}


function FOWDE___HTML()
{
	dwln ("<table width='100%'cellspacing='0' cellpadding='2' border='0'>");

	dwln (	"<tr class=\"BatsHeader\">");
	dwln (		"<th>&nbsp;</th>");
	dwln (		"<th align='left'>Fall Of Wickets</th>");
	dwln (		"<th>&nbsp;</th>");

	for (var i=0 ; i<gNumFOW ; i++)
	{
		dwln (	"<th align='center'>" + (i+1) + " for</th>");
	}

	dwln (	"</tr>");


	dwln (	"<tr class=\"FixtureAltLine\">");
	dwln (		"<td>&nbsp;</td>");
	dwln (		"<td align='right'>Batsman Out</td>");
	dwln (		"<td>&nbsp;</td>");

	for (var i=0 ; i<gNumFOW ; i++)
	{
		dwln ("<td align='right'>");
			this.mBatterOut[i].HTML();
		dwln ("</td>");
	}

	dwln (	"</tr>");

	dwln (	"<tr class=\"FixtureAltLine\">");
	dwln (		"<td>&nbsp;</td>");
	dwln (		"<td align='right'>Score</td>");
	dwln (		"<td>&nbsp;</td>");

	for (var i=0 ; i<gNumFOW ; i++)
	{
		dwln ("<td align='right'>");
			this.mScore[i].HTML();
		dwln ("</td>");
	}

	dwln (	"</tr>");

	dwln ("</table");
}

function FOWDE___GenerateData (aPrefix)
{
	//
	// Do we have any data to display?
	//
	if (this.mBatterOut[0].GetValue() == "")
	{
		//
		// There is no data
		//
	}
	else
	{
		var lLine="\n\n";

		lLine += "\t//\n";
		lLine += "\t// Fall of wickets\n";
		lLine += "\t//\n";

		lLine += "\t" + aPrefix + ".addFOW (new FallOfWickets (";

		for (var i=0 ; i<gNumFOW ; i++)
		{
			if (this.mBatterOut[i].GetValue() == "")
			{
				break;
			}
			else
			{
				if (i > 0)
				{
					lLine += ", ";
				}

				lLine += this.mBatterOut[i].GetValue() + ", " + this.mScore[i].GetValue()
			}
		}

		lLine += "));";

		//
		// Add to the output data
		//
		MatchDE_AddLine (lLine);
	}
}
