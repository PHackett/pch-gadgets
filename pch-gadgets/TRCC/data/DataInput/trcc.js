// vars
var gWebAddress="www.twyfordcc.org.uk";
var gWebHostSite="www.paulhackett.plus.com";
var gNavBA = new Array ();
var gLocNavB = null;

var gPageHeading=null;

var gPagePrintable=false;

//
// Set the web root
//
var gWebRoot="/websites/trcc/";	// PlusNet

if (0 == document.location.toString().indexOf ("http://trcc.paulhackett.com"))
{
	// gWebRoot="";							// Home
	gWebRoot="/TRCCweb/pch-gadgets/";	// QNAP homeNAS
}
else if (0 == document.location.toString().indexOf ("http://twyfordweb.googlecode.com"))
{
	gWebRoot="/svn/trunk";
}
else if (0 == document.location.toString().indexOf ("file:///Z:/TRCCweb/"))
{
	gWebRoot="file:///Z:/TRCCweb/twyford-google/";	// QNAP homeNAS via file:///
}



//
// Write the standard header
//
StdHead ();

// Determine the "local" navbutton
SetLocalNavBtn();

function StdHead ()
{
    dwln ("<title>Twyford &amp; Ruscombe Cricket Club</title>");

	inclFile ("./cookies.js");

	if (parseQuery().layout == "printable")
	{
		inclFile ("./PrintablePageLayout.js");
	}
	else if (parseQuery().layout == "contoured")
	{
		inclFile ("./ContouredPageLayout.js");
	}
	else if (parseQuery().layout == "plain")
	{
		inclFile ("./PageLayout.js");
	}
	else if (useCSSLayout())
	{
	    dwln ("<meta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\">");
		inclFile ("./CSSPageLayout.js");
	}
	else
	{
		inclFile ("./PageLayout.js");
	}
}

function WrContentHeading ()
{
	if (gLocNavB)
	{
		dwln ("<span class=\"contentHeading\">" + gLocNavB + "</span>");
		dwln ("<hr size=\"2\" class=\"contentHeading\">");
	}
	else if (gPageHeading != null)
	{
		dwln ("<span class=\"contentHeading\">" + gPageHeading + "</span>");
		dwln ("<hr size=\"2\" class=\"contentHeading\">");
	}
	else
	{
		dwln ("&nbsp;");
	}
}


function MkNavBtns ()
{
	new NavB ("Home",			"/index.html",																"Home Page");
	new NavB ("Fixtures",		"/Fixtures/Fixtures.html",													"Where are we playing?");
	new NavB ("Stats",			"/Stats/Stats.html",														"Player statistics");
	new NavB ("Players",		"/Players/players.html",													"Player profiles");
	new NavB ("Awards",			"/HallOfFame/HallOfFame.html",												"Club awards through the years");
	new NavB ("Committee",		"/Committee/Committee.html",												"Your Committee");
	new NavB ("Map",			"/Map/Map.html",															"Where are we?");
	// new NavB ("@Google",		"http://sites.google.com/a/trcc.paulhackett.com/trcc-cricket-club/Home",	"TRCC @ Google!");
	new NavB ("@Google",		"http://sites.twyfordcc.org.uk",											"TRCC @ Google!");

	// Special for the printable button
	var lPT=document.URL;

	if (lPT.indexOf ("?") == -1)
	{
		lPT += "?";
	}
	else
	{
		lPT += "&";
	}

	lPT += "layout=printable";

	new NavB ("(printable)",	lPT,				"Printable version of this page");

	//
	// Note: When working as a a filesystem website, for some reason
	// the cookie stuff does not work! Probably because there is no such 
	// thins as a cookie
	//
	var lMyCookie = GetMyCookieByName (document, "Secret");

	if (lMyCookie && (lMyCookie.mValue == "ItsMe"))
	{
		new NavB ("DataInput",		"/DataInput/index.html",	"Input of game data");
		new NavB ("Generate",		"/secret/Generate.html",	"Generation of summary data");
	}
}

function SetLocalNavBtn()
{
	var lURL=GetLocalURL();

	if (lURL)
	{
		// Now all the buttons
		for (lNB in gNavBA)
		{
			if (gNavBA[lNB].mLink.indexOf (lURL) == 0)
			{
				gLocNavB = lNB;
				gNavBA[lNB].mEnabled = false;
				break;
			}
		}
	}
}

function GoPrintable()
{
	alert ("HERE");
	document.URL = "/Committee/Committee.html";
}

function WrNavBtns ()
{
	if (gNavBA.length == 0)
	{
		//
		// Make the navbuttons
		//
		MkNavBtns ();
	}

	//
	// All in a table
	//
	dwln ("<table height=\"100%\" BORDER=\"0\" CELLPADDING=\"0\" CELLSPACING=\"0\" width=\"80\">");
	dwln ("	<tr height=\"47\">");
	dwln ("		<td width=\"100%\"><img src=\"" + toABS ("./Bails.gif") + "\" border=\"0\" height=\"47\"></td>");
	dwln ("	</tr>");
	dwln ("	<tr>");
	dwln ("		<td>");
	dwln ("			<table width=\"100%\" height=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" background=\"" + toABS ("./Middle.gif") + "\">");
	dwln ("				<tr>");
	dwln ("					<td>");
	dwln ("						<table width=\"100%\" cellspacing=\"9\" cellpadding=\"0\" border=\"0\">");

	// Now all the buttons
	for (lNB in gNavBA)
	{
		dwln ("						<tr>");
										gNavBA[lNB].HTML();
		dwln ("						</tr>");
	}
	dwln ("							<tr>");
	dwln ("								<td>&nbsp;</td>");
	dwln ("							</tr>");
	dwln ("						</table>");
	dwln ("					</td>");
	dwln ("				</tr>");
	dwln ("				<tr height=\"100%\">");
	dwln ("					<td>&nbsp;</td>");
	dwln ("				</tr>");
	dwln ("			</table>");
	dwln ("		</td>");
	dwln ("	</tr>");
	dwln ("	<tr height=\"82\">");
	dwln ("		<td><img src=\"" + toABS ("./base.gif") + "\" border=\"0\"></td>");
	dwln ("	</tr>");
	dwln ("</table>");
}

function NavB (aName, aLink, aDesc)
{
	this.mName				= aName;
	this.mLink				= toABS (aLink);
	this.mDesc				= aDesc;
	this.mEnabled			= true;
	this.mCurPage			= false;

	// Methods
	this.Register	= NavB___Register;
	this.Enable		= NavB___Enable;
	this.HTML		= NavB___HTML;
	this.Over		= NavB___Over;
	this.Leave		= NavB___Leave;
	this.Press		= NavB___Press;

	//
	// Register the button in the global array
	//
	this.Register ();
}

function NavB___Register ()
{
	gNavBA[this.mName] = this;
}

function NavB___Enable (aEnabled)
{
	this.mEnabled = aEnabled;
}

function NavB___HTML ()
{
	dwln ("<td width=\"40\"><img name=\"" + this.mName + "\" border=\"0\" src=\"" + toABS ("./empty.gif") + "\" width=\"23\"></td>");

	if (!this.mEnabled)
	{
		dwln ("<td align=\"middle\" class=\"NavBtnCur\" width=\"100%\">");
	}
	else
	{
		dwln ("<td align=\"middle\" class=\"NavBtnAno\" width=\"100%\">");

		dwln ("	<a href=\"" + this.mLink + "\" " +
					"OnMouseOver=\"return (NavButtonOver  ('" + this.mName + "'))\" " +
					"OnMouseOut =\"return (NavButtonLeave ('" + this.mName + "'))\" " +
					"OnMouseDown=\"return (NavButtonPress ('" + this.mName + "'))\" " +
					">");
	}

	dwln (	"<span class=\"pre\">" + this.mName + "<span>");

	if (this.mEnabled)
	{
		dwln ("	</a>");
	}

	dwln ("</td>");
}


function NavButtonEnable (aName, aEnabled)	{	gNavBA[aName].Enable(aEnabled);									}
function WriteNavButtonHTML (aName)			{	gNavBA[aName].HTML();											}
function NavButtonOver (aName)				{	return (gNavBA[aName].Over ());									}
function NavButtonLeave (aName)				{	return (gNavBA[aName].Leave ());								}
function NavButtonPress (aName)				{	return (gNavBA[aName].Press ());								}

function NavB___Over ()
{
	if (this.mDesc != "") 
	{
		window.status = this.mDesc; 
	}

	document[this.mName].src = toABS ("./redb.gif");

	return (true);
}

function NavB___Leave()
{
	window.status = ""; 
	document[this.mName].src = toABS ("./empty.gif");

	return (true);
}
function NavB___Press()						{	window.status = "";	return (true);						}


function SetWebRoot (aWebRoot)				{	gWebRoot = aWebRoot;																}
function GetWebRoot ()						{	return (gWebRoot);																	}
// function GetFileSystemRoot()				{	return ("D:\\Projects\\Websites\\www.twyfordcc.org.uk\\");				}
function GetFileSystemRoot()				{	return ("Z:\\TRCCweb\\twyford-google\\");				}
function GetFileSystemGadgetsRoot()			{	return ("Z:\\TRCCweb\\pch-gadgets\\");				}
function dwln (text)						{	document.writeln (text);															}
function toABS (aURL)
{
	if (aURL.charAt (0) == '.')
	{
		return (aURL);
	}
	else if (0 == aURL.indexOf ("http://"))
	{
		return (aURL);
	}
	else
	{
		return (gWebRoot + aURL);
	}
}

function toFullURL (aURL)
{
	var lURL=toABS (aURL);
	
	if (aURL.charAt (0) == '.')
	{
	}
	else if (0 == aURL.indexOf ("http://"))
	{
	}
	else
	{
		lURL = "http://" + gWebHostSite + lURL;
	}

	return (lURL);
}

function inclFile (aURL)					{	dwln ("<SCRIPT language=\"JavaScript\" src=\"" + toABS (aURL) + "\"></script>");	}
function mailTo (aText, aMail)				{	dwln ("<a href=\"" + aMail + "\">" + aText + "</a>");								}

// Mail
function emailTomFort ()					{	mailTo ("Tom Fort",     "mailto:tom.fort@virgin.net");			}
function emailPaulHackett ()				{	mailTo ("Paul Hackett", "mailto:trcc@paulhackett.com");			}
function emailNicDownes ()					{	mailTo ("Nic Downes", "mailto:nic@downes101.orangehome.co.uk");	}
function emailDavidDownes ()				{	mailTo ("David Downes", "mailto:dave.downes@virgin.net");		}
function emailWebMaster ()					{	mailTo ("webmaster", "mailto:TRCCWebMaster@paulhackett.com");	}

//
// Are we to use the new CSS layout if it is available?
//
function useCSSLayout ()
{
	var lRet=false;
	var lAllCookies=document.cookie;
	var lStart=-1;

	if (lAllCookies == "")
	{
		// No cookies at all
	}
	else if ((lStart = lAllCookies.indexOf ("layout=")) == -1)
	{
		// No layout cookie
	}
	else
	{
		lStart += 7;	// step over "layout="
		lTest = lAllCookies.substr (lStart, 3);
		
		if ("CSS" == lTest)
		{
			lRet = true;
		}
	}
	
	return (lRet);
}

function GetLocalURL ()
{
	var lThisURL=document.URL;

	// Get rid of the protocol
	if (lThisURL.indexOf ("//") != -1)
	{
		lThisURL = lThisURL.substr (lThisURL.indexOf ("//") + 2);

		// Get rid of the domain
		if (lThisURL.indexOf ("/") != -1)
		{
			lThisURL = lThisURL.substr (lThisURL.indexOf ("/"));
		}
		else
		{
			lThisURL = null;
		}
	}
	else
	{
		lThisURL = null;
	}

	return (lThisURL);
}


function GetNiceDate (aDate, aAsHTLM, aNoYear)
{
	var lRet=DateNumToString (aDate, aAsHTLM) + " " + MonthNumToString (aDate);
 
	if ((aNoYear == null) || (aNoYear == false))
	{
		lRet += " " + aDate.getFullYear();
	}

	return (lRet);
}

function DateNumToString (aDate, aAsHTLM)
{
	var lRet = NumberToOrdinal (aDate.getDate(), aAsHTLM);

	return (lRet);
}

function NumberToOrdinal (aNum, aAsHTLM)
{
	var lRet=aNum + "";

	if (aAsHTLM)
	{
		lRet += "<sup>";
	}

	if (((aNum % 10) == 1) && (aNum != 11))
	{
		lRet += "st";
	}
	else if (((aNum % 10) == 2) && (aNum != 12))
	{
		lRet += "nd";
	}
	else if (((aNum % 10) == 3) && (aNum != 13))
	{
		lRet += "rd";
	}
	else
	{
		lRet += "th";
	}

	if (aAsHTLM)
	{
		lRet += "</sup>"
	}

	return (lRet);
}

function MonthNumToString (aDate)
{
	var lMonths=new Array(12);

	lMonths[0]	= "January";
	lMonths[1]	= "February";
	lMonths[2]	= "March";
	lMonths[3]	= "April";
	lMonths[4]	= "May";
	lMonths[5]	= "June";
	lMonths[6]	= "July";
	lMonths[7]	= "August";
	lMonths[8]	= "September";
	lMonths[9]	= "October";
	lMonths[10] = "November";
	lMonths[11] = "December";

	return (lMonths[aDate.getMonth()]);
}

function DOWFromDate (aDate)
{
	return (DOWNumToString (aDate.getDay()));
}

function DOWNumToString (aDOW)
{
	var lDays=new Array ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

	return (lDays[aDOW]);
}

function parseQuery ()
{
	var lArgs = new Object();
	var lQuery = location.search.substring (1);
	var lPairs = lQuery.split ("&");

	for (var i=0 ; i<lPairs.length ; i++)
	{
		var lPos = lPairs[i].indexOf ("=");

		if (lPos != -1)
		{
			var lArgName = lPairs[i].substring (0, lPos);
			var lArgVal  = lPairs[i].substring (lPos + 1);

			lArgs[lArgName] = lArgVal;
		}
	}

	return (lArgs);
}

function OversAdd (aOne, aTwo)
{
	var lOOne = Math.round (aOne - 0.5);
	var lOTwo = Math.round (aTwo - 0.5);
	var lBOne = (aOne - lOOne) * 10;
	var lBTwo = (aTwo - lOTwo) * 10;

	// Sanity check
	if ((lBOne > 5) || (lBTwo > 5))
	{
		lOOne = lOTwo = 0;
		lBOne = lBTwo = 0;
	}

	var lOvrs=lOOne + lOTwo;
	var lBwls=lBOne + lBTwo;

	if (lBwls > 5.5)
	{
		lOvrs++;
		lBwls -= 6;
	}

	lRet = Math.round ((lOvrs * 10) + lBwls);

	return (lRet / 10);
}

function OversToBalls (aOvers)
{
	var lW=Math.floor (aOvers);
	var lP=(aOvers-lW) * 10;

	return ((lW * 6) + lP);
}

function SpacesToUnderline (aString)
{
	var lA = aString.split (" ");
	var lL = lA.length;
	var lRet="";

	for (i=0 ; i<lL ; i++)
	{
		lRet += lA[i];
		if (i+1 < lL)
		{
			lRet += "_";
		}
	}

	return (lRet);
}

function numToString (aNum, aPrecision)
{
	var lInt=Math.round (aNum * Math.pow (10, aPrecision)) + "";
	var lIntLen=lInt.length-aPrecision;

	return (lInt.substr (0, lIntLen) + "." + lInt.substr (lIntLen));
}

//
// Provides the HTML that may be incorporated to make a table sortable 
// by clicking on the column header
//
function SortableTableHTML()
{
	var lDHTMLfile=toABS ("/js/BowlerTableSort.HTC");

	return (" style=\"behavior:url(" + lDHTMLfile + ");\" ");
}

function TabIndent (aIndent)
{
	var lTabs="\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";

	return (lTabs.substr (0, aIndent));
}

function GetFixtureURL (aDate, aOppo)
{
	var lRet = "/Fixtures/GenericFixture.html?month=" + MonthNumToString (aDate);

	lRet += "&date=" + DateNumToString (aDate);
	lRet += "&year=" + aDate.getFullYear();
	lRet += "&oppo=" + aOppo;

	lRet = SpacesToUnderline (lRet);
	return (toABS (lRet));
}

function stripMultipleSpaces (aS)
{
	return (aS.replace (/\s+/g, " "));
}

function trimStringLandR (aS)
{
	return (aS.replace(/^\s+|\s+$/g, ""));
}

function collapseStringSpaces (aS)
{
	var lRet=aS;
	
	lRet = stripMultipleSpaces (lRet);
	lRet = trimStringLandR (lRet);
	
	return (lRet);
} 

function breakStringIntoLines (aString, aLineLength, aBreakExtra)
{
	var lRet="";
	var lStrlen=aString.length;
	var lLineLength=aLineLength;
	var lBreakExtra=aBreakExtra;
	
	if (null == lLineLength)
	{
		lLineLength = 80;
	}
	
	if (40 > lLineLength)
	{
		lLineLength = 40;
	}
	
	if (null == lBreakExtra)
	{
		lBreakExtra = "";
	}
	
	lRet += lBreakExtra;
	
	var lLineBeginOffset=0;
	
	while ((lStrlen - lLineBeginOffset) > aLineLength)
	{
		for (var i=aLineLength ; i>0 ; --i)
		{
			var lOff=lLineBeginOffset+i;

			if (" " == aString.charAt(lOff))
			{
				lRet += aString.substr (lLineBeginOffset, (lOff-lLineBeginOffset)) + "\n" + lBreakExtra;
				
				lLineBeginOffset = lOff + 1;
				break;
			}
		}
		
		if (0 == i)
		{
			lRet += aString.substr (lLineBeginOffset, aLineLength);
			
			lLineBeginOffset += aLineLength;
		}
	}
	
	lRet += aString.substr (lLineBeginOffset, (lStrlen - lLineBeginOffset));
	
	return (lRet);
}


//------------------------------------[GGUtils_EscapeToHTML]-
// Escape the given string for display in an HTML page
//
// @param aString IN The string to escape
//
// @return The HTML escaped string
//
//------------------------------------------------------------
function EscapeToHTML (aString)
{
    return (aString.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;"));
}
