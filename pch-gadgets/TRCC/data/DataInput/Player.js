// vars

function GetPlayersSorted (aArray)
{
	aArray.sort (surnameorder);

	return (aArray);
}

function GetPlayerSurnames(aPlayers)
{
	var lRet=new Array();
	var lPA=aPlayers;

	for (lP in lPA)
	{
		lRet[lRet.length] = lPA[lP].GetSurname();
	}

	return (lRet);
}

function GetFirstNamesMatchingSurname (aPlayers, aSurname)
{
	var lRet=new Array();
	var lPA=aPlayers;

	for (lP in lPA)
	{
		if (lPA[lP].GetSurname() == aSurname)
		{
			lRet[lRet.length] = lPA[lP].GetFirstname();
		}
	}

	return (lRet);
}

// Player name of form "Peter Woodman"
function Player (aPlayerName, aHasPage)
{
	var lOff=aPlayerName.lastIndexOf (" ");

	if (lOff == -1)
	{
		// No surname?
		this.mSurname	= aPlayerName;
		this.mFirstname	= "";
	}
	else
	{
		this.mSurname	= aPlayerName.substring (lOff+1);
		this.mFirstname	= aPlayerName.substring (0, lOff);
	}

	if (aHasPage != null)
	{
		this.mHasPage = true;
	}
	else
	{
		this.mHasPage = false;
	}

	this.HTML			= Player___HTML;
	this.Name			= Player___Name;
	this.toString		= Player___ToString;
	this.GetSurname		= Player___GetSurname;
	this.GetFirstname	= Player___GetFirstname;
	this.HasPage		= Player___HasPage;
	this.Number			= Player___Number;
}


function Player___HTML (aNumber)
{
	//
	// Testing only
	//
	// var lMyCookie = GetMyCookieByName (document, "Secret");
	var lItsMe=false;

	/*
	if (lMyCookie && (lMyCookie.mValue == "ItsMe"))
	{
		lItsMe = true;
	}
	*/

	lItsMe = true;

	if (!lItsMe)
	{
		if (this.HasPage())
		{
			dwln ("<a href=\"" + this.GetFirstname() + "_" + this.GetSurname() + ".html?No=" + aNumber + "\">" + this.Name() + "<br>");
		}
		else
		{
			dwln ("<a href=\"./GenericPlayer.html?" + this.GetFirstname() + "_" + this.GetSurname() + ";No=" + aNumber + "\">" + this.Name() + "<br>");
		}
	}
	else
	{
		var lText="<a href=\"";

		lText += toABS ("/Stats/GeneratedCareer/RenderCareer.html");
		lText += "?playerName=";
		lText += escape (this.Name());
		lText += "&playerNumber=";
		lText += aNumber;
		lText += "\">";
		lText += this.Name();
		lText += "</a>"

		dwln (lText);
	}
}

function Player___GetSurname()		{	return (this.mSurname);										}
function Player___GetFirstname()	{	return (this.mFirstname);									}
function Player___HasPage()			{	return (this.mHasPage);										}
function Player___Name()			{	return (this.GetFirstname() + " " + this.GetSurname());		}
function Player___ToString()		{	return (this.GetFirstname() + " " + this.GetSurname());		}
function Player___Number()			{	return (88);												}

function surnameorder (aA, aB)
{
	var lRet=0;

	if (aA.GetSurname() != aB.GetSurname())
	{
		lRet = (aA.GetSurname() > aB.GetSurname()) ? 1 : -1;
	}
	else
	{
		lRet = (aA.GetFirstname() > aB.GetFirstname()) ? 1 : -1;
	}

	return (lRet);
}

function WrPlayers (aPlayers)
{
	var lPA=aPlayers;
	var lNperLine=3;
	var lHaveRow=false;
	var lWir=0;

	dwln ("<p align='center'>");
	WrPlayersIndex (aPlayers);
	dwln ("</p>");

	var lCurIndex="";

	dwln ("<table width='100%' border='0'>");

	for (lP in lPA)
	{
		var lSfl=lPA[lP].GetSurname().substring (0, 1).toUpperCase();

		if (lSfl != lCurIndex)
		{
			if (lHaveRow)
			{
				//
				// Close off previous row
				//
				for (var i=0 ; i< (lNperLine - (lWir % (lNperLine+1))) ; i++)
				{
					dwln ("<td>&nbsp;</td>");
				}

				dwln (			"</td>");
				dwln (		"</tr>");
				dwln (	"</table>");
				dwln ("</tr>");
			}

			//
			// Blank line
			//
			dwln ("<tr>");
			dwln ("	<td>&nbsp;</td>");
			dwln ("</tr>");

			//
			// Alphabet header
			//
			dwln ("<tr class='NavBtnCur'>");
			dwln ("	<td>");
			dwln ("		<a name=\"" + lSfl + "\"><b>" + lSfl + "</b>");
			dwln ("	</td>");
			dwln ("</tr>");

			//
			// Where the names live ...
			//
			dwln ("<tr>");
			dwln (	"<td>");
			dwln (		"<table width='100%' border='0'>");
			dwln (			"<tr>");
			dwln (				"<td width='10%'>&nbsp;</td>");

			lHaveRow = true;
			lWir = 0;	// No entries in this row 

			lCurIndex = lSfl;
		}

		if (lWir == lNperLine)
		{
			// Close off this row & start another
			dwln ("</tr>");
			dwln ("<tr>");
			dwln (	"<td width='10%'>&nbsp;</td>");

			lWir = 0;
		}

		dwln ("	<td>");
			lPA[lP].HTML();
		dwln ("	</td>");

		++lWir;
	}

	if (lHaveRow)
	{
		//
		// Close off previous row
		//
		for (var i=0 ; i< (lNperLine - (lWir % (lNperLine + 1))) ; i++)
		{
			dwln ("<td>&nbsp;</td>");
		}

		dwln ("</tr>");

		dwln ("</table>");
	}

	dwln ("</table>");
}

function WrPlayersIndex (aPlayers)
{
	var lAlpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var lAindex=0;

	for (i=0 ; i<aPlayers.length ; i++)
	{
		var lSfl=aPlayers[i].GetSurname().substring (0, 1).toUpperCase();

		while (lAlpha.substring (lAindex, lAindex+1) < lSfl)
		{
			dwln (lAlpha.substring (lAindex, lAindex+1).toLowerCase() + "&nbsp;");
			lAindex++;
		}

		if (lAlpha.substring (lAindex, lAindex+1) == lSfl)
		{
			dwln ("<a href=\"#" + lAlpha.substring (lAindex, lAindex+1) + "\">" +
								  lAlpha.substring (lAindex, lAindex+1) + "<a>");
			lAindex++;
		}
	}

	// write out trailing letters ...
	for (i=lAindex ; i<lAlpha.length ; i++)
	{
		dwln (lAlpha.substring (i, i+1).toLowerCase() + "&nbsp;");
	}

	dwln ("<br>");
}
