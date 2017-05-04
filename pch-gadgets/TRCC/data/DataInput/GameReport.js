// This variable is where the game data is placed 
var gGameDataA = new Array();
var gTRCC="Twyford";
var gDNB="DidNotBat";
var gNotOut="Not Out";
var gRetHurt="Retired Hurt";
var gDefReport="There is no report for this game";

var gRTrail=10;

function IncludeGameData (aYear)
{
	var lDataURL=aYear + "/" + MakeGameURL();

	dwln ("<SCRIPT language=\"JavaScript\" src=\"./" + lDataURL + "\"></script>");
}

function MakeGameURL ()
{
	return (parseQuery().month + "_" + parseQuery().date + "_" + parseQuery().oppo + ".js");
}

function GetGameArray()
{
    return (gGameDataA);
}

function Game (aTeamBat1st, aTeamBat2nd, aDate, aCountsTowardsStats)
{
	this.mReport = gDefReport;
	this.mTeams = new Array(2);

	this.mTeams[0] = aTeamBat1st;
	this.mTeams[1] = aTeamBat2nd;

	this.mDate = aDate;
	
	this.mCountsTowardsStats = aCountsTowardsStats;
	if (null == this.mCountsTowardsStats)
	{
		this.mCountsTowardsStats = true;
	}

	this.MatchReport 		= Game___MatchReport;
	this.WrScorecard 		= Game___Scorecard;
	this.PageHeading 		= Game___PageHeading;
	this.GetOppo	 		= Game___GetOppo;
	this.GetTRCC	 		= Game___GetTRCC;
	this.toXML 		 		= Game___toXML;
	this.getXMLFilename		= Game___getXMLFilename;
	this.countsTowardsStats	= Game___countsTowardsStats;

	gGameDataA[gGameDataA.length] = this;
}


function Game___MatchReport (aReport)	{	this.mReport = aReport;														}

function Game___GetOppo()				{	return ((this.mTeams[0].mName == gTRCC) ? this.mTeams[1] : this.mTeams[0]);	}
function Game___GetTRCC()				{	return ((this.mTeams[0].mName == gTRCC) ? this.mTeams[0] : this.mTeams[1]);	}
function Game___countsTowardsStats()	{	return (this.mCountsTowardsStats);											}

function Game___PageHeading ()
{
	var lRet = "<span class='FixtureHead'>";

	lRet += gTRCC + " vs. " + this.GetOppo().mName + " - " + GetNiceDate (this.mDate);

	lRet += "</span>";

	return (lRet);
}

function Game___Scorecard ()
{
	dwln ("<p>");
	dwln (this.mReport);
	dwln ("<p>");

	dwln ("<p>");
	dwln ("<hr class='Scorecard'>");
	dwln ("<span class='Scorecard'>Scorecard</span>");
	dwln ("<p>");

	dwln ("<span class='ScorecardSm'>Innings of " + this.mTeams[0].mName + "</span>");
	this.mTeams[0].BatsHTML()
	dwln ("<p>");
	this.mTeams[1].BowlHTML()

	dwln ("<p>");
	dwln ("<hr class='ScorecardSm' size='1'>");

	dwln ("<span class='ScorecardSm'>Innings of " + this.mTeams[1].mName + "</span>");
	this.mTeams[1].BatsHTML()
	dwln ("<p>");
	this.mTeams[0].BowlHTML()
}


function Game___toXML ()
{
	var lRet="";
	
	//
	// Header
	//
	lRet += "<CricketMatch" 	+ 
			" oppo=\"" 			+ this.GetOppo().mName		+ "\"" + 
			" date=\"" 			+ this.mDate.toString() 	+ "\"" +
			" matchType=\""									+ "\"" +
			" team=\""										+ "\"" +
			" playCriketId=\""								+ "\"" +
			">\n";
	
	//
	// Match report
	//
	lRet += "  <MatchReport";
	if (this.mReport == gDefReport)
	{
		lRet += "/>";
	}
	else
	{
		lRet += ">\n";
		lRet += "    <![CDATA[\n";
		
		var lMR=this.mReport;
		
		//
		// Format the match report 'nicely', and in a form suitable for XML
		//
		lMR = stripMultipleSpaces (lMR);
		lMR = lMR.split("<p>").join("\n      <p>\n      ");
		lMR = lMR.split("�").join("-");						// This is a M$Word character that does not work in XML
		lMR = lMR.split("�").join("'");						// This is a M$Word character that does not work in XML
		lMR = lMR.split("�").join("'");						// This is a M$Word character that does not work in XML
		lMR = lMR.split("�").join("...");					// This is a M$Word character that does not work in XML
		lMR = breakStringIntoLines (lMR, 100, "      ");
		
		lRet += lMR;
		lRet += "\n    ]]>\n";
		lRet += "  </MatchReport>\n";
	}
	
	if (this.countsTowardsStats())
	{
		lRet += "<CountsToStats/>\n";
	}

	lRet += "  <Innings batting=\"" + this.mTeams[0].mName + "\">\n";
	lRet += this.mTeams[0].BatsXML();
	lRet += this.mTeams[1].BowlXML();
	lRet += "  </Innings>\n";

	lRet += "  <Innings batting=\"" + this.mTeams[1].mName + "\">\n";
	lRet += this.mTeams[1].BatsXML()
	lRet += this.mTeams[0].BowlXML()
	lRet += "  </Innings>\n";

	lRet += "</CricketMatch>\n";

	return (lRet);
}


function Team (aName)
{
	(aName == null) ? this.mName = gTRCC : this.mName = aName;

	this.mBatsmen	= new Array();
	this.mBowlers	= new Array();
	this.mExtras	= 0;
	this.mFOW		= null;

	this.addBatter	= Team___addBatter;
	this.addBowler	= Team___addBowler;
	this.addFOW		= Team___addFOW;
	this.HTML		= Team___HTML;
	this.BatsHTML	= Team___BatsHTML;
	this.BatsXML	= Team___BatsXML;
	this.BowlHTML	= Team___BowlHTML;
	this.BowlXML	= Team___BowlXML;
	this.GetBatTot	= Team___BatTot;
}

function Team___addBatter (aBatter)	{	this.mBatsmen[aBatter.mName] = aBatter;	}
function Team___addBowler (aBowler)	{	this.mBowlers[aBowler.mName] = aBowler;	}
function Team___addFOW (aFOW)		{	this.mFOW = aFOW;						}


function Team___HTML ()
{
	this.BatsHTML();
	this.BowlHTML();
}


function Team___BatsHTML ()
{
	dwln ("<p align='center'>");
	dwln ("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");

	dwln ("	<tr class=\"BatsHeader\">");
	dwln ("		<th>&nbsp;</th>"	+
				"<th align='left'>Batsman</th>"	+
				"<th align='left'>How Out</th>"	+
				"<th align='left'>Bowler</th>"	+
				"<th align='right'>Runs</th>"	+
				"<th width='" + gRTrail + "'>&nbsp;</th>");
	dwln ("	</tr>");

	var lNum=1;

	for (lBat in this.mBatsmen)
	{
		(lNum % 2) ? dwln ("<tr>") : dwln ("<tr class=\"FixtureAltLine\">");
				this.mBatsmen[lBat].HTML (lNum++);
		dwln ("</tr>");
	}

	//
	// Now the extras
	//
	dwln ("<tr>");
	dwln ("<td colspan='3'>&nbsp;<td align='center' class=\"FixtureAltLine\">Extras</td>");
	dwln ("<td align='right' class=\"FixtureAltLine\">" + this.mExtras + "</td><td class=\"FixtureAltLine\">&nbsp;</td>");
	dwln ("</tr>");

	//
	// Now the Total
	//
	var lTot = this.GetBatTot() + this.mExtras;

	dwln ("<tr>");
	dwln ("<td colspan='3'>&nbsp;<td align='center' class=\"FixtureAltLine\">Total</td>");
	dwln ("<td align='right' class=\"FixtureAltLine\">" + lTot + "</td><td class=\"FixtureAltLine\">&nbsp;</td>");
	dwln ("</tr>");

	dwln ("</table>");
	dwln ("</p>");

	//
	// Now the Fall Of Wickets
	//
	if (this.mFOW != null)
	{
		this.mFOW.HTML();
	}
}


function Team___BatsXML ()
{
	var lRet="";
	var lNum=1;
	
	// lRet += "    <batting>\n";
	
	//
	// Down the batsmen
	//
	for (lBat in this.mBatsmen)
	{
		lRet += this.mBatsmen[lBat].XML (lNum++);
	}

	//
	// Now the extras
	//
	lRet += "    <Extras value=\"" + this.mExtras + "\"/>\n";

	//
	// Now the Fall Of Wickets
	//
	if (this.mFOW != null)
	{
		lRet += this.mFOW.XML();
	}

	// lRet += "    </batting>\n";
	
	return (lRet);
}


function Team___BowlHTML ()
{
	dwln ("<p align='center'>");
	dwln ("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");

	dwln ("	<tr class=\"BatsHeader\">");
	dwln ("		<th align='center'>Bowler</th>"		+ 
				"<th align='right'>Overs</th>"		+
				"<th align='right'>Maidens</th>"	+
				"<th align='right'>Runs</th>"		+
				"<th align='right'>Wickets</th>"	+
				"<th width='" + gRTrail + "'>&nbsp;</th>");
	dwln ("	</tr>");

	var lNum=1;

	for (lBowl in this.mBowlers)
	{
		(lNum % 2) ? dwln ("<tr>") : dwln ("<tr class=\"FixtureAltLine\">");
				this.mBowlers[lBowl].HTML (lNum++);
		dwln ("</tr>");
	}

	dwln ("</table>");
	dwln ("</p>");	
}

function Team___BowlXML ()
{
	var lRet="";
	var lNum=1;

	// lRet += "  <bowling>\n";

	for (lBowl in this.mBowlers)
	{
		lRet += this.mBowlers[lBowl].XML (lNum++);
	}

	// lRet += "  </bowling>\n";
	
	return (lRet);
}


function Team___BatTot ()
{
	var lRet=0;

	for (lBat in this.mBatsmen)
	{
		if (this.mBatsmen[lBat].mRuns != "&nbsp;")
		{
			lRet += this.mBatsmen[lBat].mRuns;
		}
	}

	return (lRet);
}


function Batsman (aName, aHowOut, aBowler, aRuns)
{
	this.mName   = aName;

	if (aHowOut == null)
	{
		this.mHowOut = gNotOut;
	}
	else
	{
		this.mHowOut = aHowOut;
	}

	if ((aBowler == null) || (aBowler == ""))
	{
		this.mBowler = "&nbsp;";
	}
	else
	{
		this.mBowler = aBowler;
	}

	if (aRuns == null)
	{
		this.mRuns   = 0;
		this.mHowOut = gDNB;
	}
	else
	{
		this.mRuns   = aRuns;
	}

	this.HTML = Batsman___HTML;
	this.XML = Batsman___XML;
}


function Batsman___HTML (aNum)
{
	var lHowOut=this.mHowOut;

	if (this.mHowOut == gDNB)
	{
		lHowOut = "&nbsp;";
	}

	var lRuns=this.mRuns;

	if (this.mHowOut == gDNB)
	{
		lRuns = "&nbsp;";
	}

	dwln ("<td>" + aNum + "</td><td>" + this.mName + "</td>");
	dwln ("<td>" + lHowOut + "</td>");
	dwln ("<td>" + this.mBowler + "</td><td align='right'>" + lRuns + "</td><td>&nbsp;</td>");
}


function Batsman___XML (aNum)
{
	var lRet="";
	var lHaveDetails=false;
	
	lRet += "    <Batsman name=\"" + this.mName + "\"";
	
	if (this.mHowOut != gDNB)
	{
		if (!lHaveDetails)
		{
			lHaveDetails = true;
			
			lRet += ">\n";
		}
		
		lRet += "      <HowOut how=\"" + EscapeToHTML(this.mHowOut) + "\"/>\n";
	}
	
	if ("&nbsp;" != this.mBowler)
	{
		if (!lHaveDetails)
		{
			lHaveDetails = true;
			
			lRet += ">\n";
		}
		
		lRet += "      <Bowler name=\"" + this.mBowler + "\"/>\n";
	}

	if (this.mHowOut != gDNB)
	{
		if (!lHaveDetails)
		{
			lHaveDetails = true;
			
			lRet += ">\n";
		}
		
		lRet += "      <Runs value=\"" + this.mRuns + "\"/>\n";
	}

	if (lHaveDetails)
	{
		lRet += "    </Batsman>\n";
	}
	else
	{
		lRet += "/>\n";
	}
	
	return (lRet);
}


function Bowler (aName, aOvers, aMdns, aRuns, aWkts)
{
	this.mName	= aName;
	this.mOvers = aOvers;
	this.mMdns	= aMdns;
	this.mRuns	= aRuns;
	this.mWkts	= aWkts;

	this.HTML = Bowler___HTML;
	this.XML = Bowler___XML;
}


function Bowler___HTML ()
{
	dwln ("	 <td align='left'>"		+ this.mName + "</td>"	+
			"<td align='right'>"	+ this.mOvers + "</td>"	+ 
			"<td align='right'>"	+ this.mMdns + "</td>"	+ 
			"<td align='right'>"	+ this.mRuns + "</td>"	+ 
			"<td align='right'>"	+ this.mWkts + "</td>"	+
			"<td>&nbsp;</td>");
}


function Bowler___XML (aNum)
{
	var lRet="";
	
	lRet += "    <BowlerSummary name=\"" 		+ this.mName  	+ "\" " +
								"overs=\""  	+ this.mOvers 	+ "\" " +
								"maidens=\""	+ this.mMdns  	+ "\" " + 
								"runs=\""    	+ this.mRuns 	+ "\" " + 
								"wickets=\""	+ this.mWkts 	+ "\""	+
								"/>\n";
	
	return (lRet);
}


function FallOfWickets ()
{
	this.mFOW		= new Array();

	//
	// Read the arguments. They come in pairs of Batsman out (Number) & scaore
	//
	for (var i=0 ; i<(arguments.length/2) ; i++)
	{
		this.mFOW[i] = new FallOfSingleWicket (arguments[2*i], arguments[(2*i)+1]);
	}

	this.length		= FallOfWickets___length;
	this.HTML		= FallOfWickets___HTML;
	this.XML		= FallOfWickets___XML;
}

function FallOfWickets___length()	{	return (this.mFOW.length);	}

function FallOfWickets___HTML()
{
	if (this.length() > 0)
	{
		//
		// In a table ...
		//
		dwln ("<br>");

		dwln ("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
		dwln (	"<tr class=\"BatsHeader\">");
		dwln (		"<th>&nbsp;</th>");
		dwln (		"<th align='left'>Fall Of Wickets</th>");
		dwln (		"<th>&nbsp;</th>");

		for (var i=0 ; i<this.length() ; i++)
		{
			dwln (	"<th align='center'>" + (i+1) + " for</th>");
		}

		for (var i=this.length() ; i<10 ; i++)
		{
			dwln (	"<th align='center'>&nbsp</th>");
		}

		dwln (	"</tr>");

		dwln (	"<tr class=\"FixtureAltLine\">");
		dwln (		"<td>&nbsp;</td>");
		dwln (		"<td align='right'>Batsman Out</td>");
		dwln (		"<td>&nbsp;</td>");

		for (var i=0 ; i<this.length() ; i++)
		{
			dwln ("<td align='center'>" + this.mFOW[i].mBatsmanNo + "</td>");
		}

		for (var i=this.length() ; i<10 ; i++)
		{
			dwln (	"<td>&nbsp</th>");
		}

		dwln (	"</tr>");

		dwln (	"<tr class=\"FixtureAltLine\">");
		dwln (		"<td>&nbsp;</td>");
		dwln (		"<td align='right'>Score</td>");
		dwln (		"<td>&nbsp;</td>");

		for (var i=0 ; i<this.length() ; i++)
		{
			dwln ("<td align='center'>" + this.mFOW[i].mScore + "</td>");
		}

		for (var i=this.length() ; i<10 ; i++)
		{
			dwln (	"<td>&nbsp</th>");
		}

		dwln (	"</tr>");

		dwln ("</table>");

		dwln ("<br><br>");
	}
}


function FallOfWickets___XML()
{
	var lRet="";
	
	if (this.length() > 0)
	{
		for (var i=0 ; i<this.length() ; i++)
		{
			lRet += "    <FallOfWicket" + 
					" batsman=\"" + this.mFOW[i].mBatsmanNo + "\"" +
					" score=\"" + this.mFOW[i].mScore + "\"/>\n";
		}
	}
		
	return (lRet);
}


function FallOfSingleWicket (aBatsman, aScore)
{
	this.mBatsmanNo		= aBatsman;
	this.mScore			= aScore;
}


function Game___getXMLFilename()
{
	// var lRoot="Y:\\MyDocuments\\projects\\eclipse\\pch-gadgets\\TRCC\\data\\fixtures\\";
	// var lRoot="J:\\Projects\\eclipse\\TRCC\\pch-gadgets\\TRCC\\data\\fixtures\\";
	// var lRoot="Z:\\TRCCweb\\pch-gadgets\\TRCC\\data\\fixtures\\";
	var lRoot="";
	
	var lRet="";
	
	lRet += this.mDate.getFullYear() + "/";
	
	lRet += MonthNumToString(this.mDate);
	lRet += "_";
	lRet += NumberToOrdinal (this.mDate.getDate(), false);
	lRet += "_";
	lRet += SpacesToUnderline (this.GetOppo().mName);
	lRet += ".xml";

	return (lRoot + lRet.toLowerCase());
}
