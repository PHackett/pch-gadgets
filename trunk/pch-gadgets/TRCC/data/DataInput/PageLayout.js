//
// This file does the layout for a page
//
var gDecTopGap="20";
var gDecLeftGap="3%";

function WrPgTop (aOnLoad)
{
    dwln ("<body marginheight=\"0\" marginwidth=\"0\" topmargin=\"0\" leftmargin=\"0\"");
	if (aOnLoad != null)
	{
		dwln (" onLoad=\"" + aOnLoad + "()\"");
	}
	dwln (">");
	dwln ("<link href=\"" + toABS ("./trcc.css") + "\" rel=\"stylesheet\" type=\"text/css\">");

	dwln ("<a name=\"top\">");

	// Start the main table
	dwln ("<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\">");

	// Top Gap
	dwln (" <tr height=\"" + gDecTopGap + "\">");
	dwln ("     <td width=\"" + gDecLeftGap + "\">");
	dwln ("     </td>");
	dwln ("     <td class=\"NavBtns\">");
	dwln ("     </td>");
	dwln ("     <td width=\"100%\">");
	dwln ("     </td>");
 	dwln (" </tr>");

	// Top Banner
	dwln (" <tr>");
	dwln ("     <td class=\"PgTop\">");
	dwln ("     </td>");
	dwln ("     <td valign=\"top\" align=\"left\" width=\"100%\" colspan=\"2\" class=\"PgTop\">");
	dwln ("			<img src=\"" + toABS ("./shield2007.gif") + "\" align=\"left\">");
	dwln ("			Twyford & Ruscombe Cricket Club");
	dwln ("     </td>");
	dwln (" </tr>");

	// Next comes the navbuttons
 	dwln (" <tr height=\"100%\">");
	dwln ("     <td>");
	dwln ("     </td>");
	dwln ("     <td valign=\"top\" width=\"199\" class=\"NavBtns\">");
	dwln ("         <table width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");
	dwln ("             <tr>");
	dwln ("                 <td>");
								WrNavBtns();
	dwln ("                 </td>");
	dwln ("             </tr>");
	dwln ("         </table>");
	dwln ("     </td>");

	// Main content in its own <table>
	dwln ("     <td align=\"left\" valign=\"top\">");
	// <table> for padding
	dwln ("         <table width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\">");
	dwln ("				<tr>");
	dwln ("					<td align=\"right\" valign=\"top\">");
								WrContentHeading();
	dwln ("					</td>");
	dwln ("				</tr>");
	dwln ("				<tr height=\"100%\">");
	dwln ("					<td align=\"left\" valign=\"top\">");
}


function WritePageMiddleGlue ()
{
	dwln ("					</td>");
	dwln ("				</tr>");

	dwln ("				<tr>");
	dwln ("					<td align=\"center\">");
	dwln ("						<hr size=\"2\" class=\"contentHeading\">");
	dwln ("						<br>");

}


function WritePageTrailer ()
{
	dwln ("					</td>");
	dwln ("				</tr>");
	dwln ("			</table>");
	dwln ("    </td>");
	dwln ("  </tr>");
	dwln ("</table>");
	
	//
	// And finally, just before the end of the page we write out the 
	// Google analytics information
	//
	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
	
	dwln ("<script type=\"text/javascript\">");
    dwln ("  var pageTracker = _gat._getTracker(\"UA-3837378-1\");");
	dwln ("  pageTracker._initData();");
	dwln ("  pageTracker._trackPageview();");
	dwln ("</script>");
}
