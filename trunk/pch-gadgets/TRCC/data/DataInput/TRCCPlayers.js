// vars
var gTRCCPlayers = new Array ();

function GetTRCCPlayers ()			{	return (gTRCCPlayers);							}
function GetTRCCPlayersSorted ()	{	return (GetTRCCPlayers());						}

function TRCCRollcallComplete()
{
	// Sort the array
	GetPlayersSorted (GetTRCCPlayers());

	// Index the array on surname
}

// Player name of form "Peter Woodman"
function TRCCPlayer (aPlayerName, aFirstSeas, aLastSeas, aCatches, aMostCatchSeas, aHasPage)
{
	this.mPlayer		= new Player (aPlayerName, aHasPage);

	this.mFirstSeas		= aFirstSeas;
	this.mLastSeas		= aLastSeas;
	this.mCatches		= (aCatches != null) ? aCatches : 0;
	this.mMostCatchSeas	= (aMostCatchSeas != null) ? aMostCatchSeas : 0;

	this.HTML			= TRCCPlayer___HTML;
	this.Name			= TRCCPlayer___Name;
	this.toString		= TRCCPlayer___ToString;
	this.GetSurname		= TRCCPlayer___GetSurname;
	this.GetFirstname	= TRCCPlayer___GetFirstname;
	this.HasPage		= TRCCPlayer___HasPage;
	this.Number			= TRCCPlayer___Number;

	this.CatchesHTML	= TRCCPlayer___CatchesHTML;
	this.CatchesCSV		= TRCCPlayer___CatchesCSV;


	// Add to global array. Note - Not associative array as that will not sort
	gTRCCPlayers[gTRCCPlayers.length] = this;

	this.mNumber	= gTRCCPlayers.length;
}


function TRCCPlayer___HTML()			{	this.mPlayer.HTML(this.Number());			}
function TRCCPlayer___Name()			{	return (this.mPlayer.Name());				}
function TRCCPlayer___ToString()		{	return (this.mPlayer.ToString());			}
function TRCCPlayer___GetSurname()		{	return (this.mPlayer.GetSurname());			}
function TRCCPlayer___GetFirstname()	{	return (this.mPlayer.GetFirstname());		}
function TRCCPlayer___HasPage()			{	return (this.mPlayer.HasPage());			}
function TRCCPlayer___Number()			{	return (this.mNumber);						}

function TRCCPlayer___CatchesHTML()
{
	dwln ("<td>&nbsp;</th>");
	dwln ("<td align='left'>"  + this.Name()			+ "</td>");
	dwln ("<td align='right'>" + this.mCatches			+ "</td>");
	dwln ("<td align='right'>" + this.mMostCatchSeas	+ "</td>");
	dwln ("<td>&nbsp;</th>");
}

function TRCCPlayer___CatchesCSV()
{
	var lRet="";
	
	lRet += this.Name()			+ ", ";
	lRet += this.mCatches		+ ", ";
	lRet += this.mMostCatchSeas	+ "<br>";

	return (lRet);
}

function WrTRCCPlayers()		{	WrPlayers (GetTRCCPlayersSorted());					}
function WrTRCCPlayersIndex()	{	WrPlayersIndex (GetTRCCPlayersSorted());			}


function WrTRCCPlayersCatches()
{
	var lHeaderInt=15;
	var lData=GetTRCCPlayers().sort (OrderOnCatches);

	dwln ("<table width='100%' cellspacing='0' cellpadding='0' border='0'>");

	for (var i=0 ; i<lData.length ; i++)
	{
		if ((i % lHeaderInt) == 0)
		{
			WriteCatchesHeader()
		}

		var lDefaultTRClass="FixtureAltLine";

		if (i % 2)
		{
			lDefaultTRClass = "FixtureNotAltLine";
		}

		dwln ("<tr class='"							+ lDefaultTRClass	+ "' " +
				"onmouseout=\"this.className='"		+ lDefaultTRClass	+ "'\" " + 
				"onmouseover=\"this.className='"	+ "TableMouseOver"	+ "'\">");

		lData[i].CatchesHTML();

		dwln ("</tr>");
	}

	dwln ("</table>");
}

function WrTRCCPlayersCatchesCSV()
{
	var lData=GetTRCCPlayers().sort (OrderOnCatches);

	var lH=WriteCatchesHeaderCSV();

	for (var i=0 ; i<lData.length ; i++)
	{

		lH += lData[i].CatchesCSV();
	}

	dwln (lH);
}

function WriteCatchesHeader()
{
	dwln ("	<tr class=\"BatsHeader\">");
	dwln ("		<th>&nbsp;</th>");
	dwln ("		<th align='left' valign='top'>Name</th>");
	dwln ("		<th align='right' valign='top'>Total</th>");
	dwln ("		<th align='right' valign='top'>Most in<br>Season</th>");
	dwln ("		<th>&nbsp;</th>");
	dwln ("	</tr>");
}

function WriteCatchesHeaderCSV()
{
	var lRet="";
	
	lRet += "Name, ";
	lRet += "Total, ";
	lRet += "Most inSeason<br>";
	
	return (lRet);
}

function OrderOnCatches (aA, aB)
{
	var lRet=0;

	if (aB.mCatches != aA.mCatches)
	{
		lRet = aB.mCatches - aA.mCatches;
	}
	else if (aB.mMostCatchSeas != aA.mMostCatchSeas)
	{
		lRet = aB.mMostCatchSeas - aA.mMostCatchSeas;
	}

	return (lRet);
}