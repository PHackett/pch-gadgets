<?xml version="1.0" encoding="UTF-8" ?>
<Module>

	<ModulePrefs
		title="Match data"
		author="Paul Hackett"
		author_email="TRCCGadgets@paulhackett.com"
		description="For the rendering of TRCC fixure."
		thumbnail="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/images/TRCC-Shield.png"
		width="700"
		height="500"
		scrolling="true">
	</ModulePrefs>

	<UserPref name="linkTarget" display_name="Link URL target" datatype="string" default_value=""/>
	<UserPref name="year" display_name="For which year?" datatype="string" default_value=""/>
	<UserPref name="month" display_name="Which month?" datatype="enum" default_value="">
		<EnumValue value="" />
		<EnumValue value="January" />
		<EnumValue value="February" />
		<EnumValue value="March" />
		<EnumValue value="April" />
		<EnumValue value="May" />
		<EnumValue value="June" />
		<EnumValue value="July" />
		<EnumValue value="August" />
		<EnumValue value="September" />
		<EnumValue value="October" />
		<EnumValue value="November" />
		<EnumValue value="December" />
	</UserPref>
	<UserPref name="date" display_name="For which day?" datatype="string" default_value=""/>
	<UserPref name="oppo" display_name="Opposition?" datatype="string" default_value=""/>

	<Content type="html">

		<![CDATA[
			<style type="text/css">
				.GadgetFixtureAltLine { background-color: lightblue;}
				.GadgetContentHeading { font-family: "Comic Sans MS", "Arial Black", "Arial", "Helvetica", "helv", "sans-serif";
										font-size: x-large;
										color: DarkBlue;
									  }
			</style>

			<div id="content_div"></div>

			<!--
			Include my utilities libraries
			-->
			<script src="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/utils/GGUtils.js" type="text/javascript"></script>
			<script src="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/utils/GGGadget.js" type="text/javascript"></script>
			<script src="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/objects/CricketMatch.js" type="text/javascript"></script>
			<script src="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/objects/MatchReport.js" type="text/javascript"></script>
			<script src="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/objects/Innings.js" type="text/javascript"></script>
			<script src="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/objects/BatsmanInnings.js" type="text/javascript"></script>
			<script src="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/objects/BowlerSummary.js" type="text/javascript"></script>
			<script src="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/objects/Extras.js" type="text/javascript"></script>
			<script src="http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/objects/FOW.js" type="text/javascript"></script>

			<script type="text/javascript">

				var gYear="";
				var gMonth="";
				var gDate="";
				var gOppo="";
				
				var gXMLSrc="";
	
	
				//--------------------------------------------------------[getTRData]-
				// Returns the text for the "<TR>" string
				//
				// @param aIndex IN Line index
				//
				// @return Constructed <tr> line
				//--------------------------------------------------------------------
				function getTRData (aIndex)
				{
					var lRet="<tr>";
					
					if (!(aIndex % 2))
					{
						lRet = "<tr class='GadgetFixtureAltLine'>";
					}
		
					return (lRet);
				}

				//-------------------------------------------------------[renderData]-
				// Render the XML
				//
				// @param response IN The XML whose data we are to render as HTML
				//--------------------------------------------------------------------
				function renderData (response)
				{
					if (response == null || typeof(response) != "object" || response.firstChild == null)
					{
						_gel("content_div").innerHTML = "<i>Invalid data from '" + gXMLSrc + "'</i>";
						return;
					}
			
					//
					// Read the XML into objects
					//
					
					//
					// Display HTML string in <div>
					//
					_gel('content_div').innerHTML = lHTML;
				}


				//-------------------------------------------------[processSettings]-
				// Determine what year & team
				//--------------------------------------------------------------------
				function processSettings ()
				{
					var lPrefs=new _IG_Prefs();
					var lArgs=GGGadget_parseHostQuery();
					
					//
					// First the year - Any userPrefs?
					//
					if (null != (gYear = lPrefs.getString ("year")) && (0 != gYear.length))
					{
						// Year set in the userPrefs
					}
					
					//
					// How about in the hosting page query?
					//
					else if ((0 != lArgs.length) && (null != (gYear = lArgs["year"])) && (0 != gYear.length))
					{
						// Year from the page query string
					} 
					else
					{
						//
						// Fall back to a default year
						//
						gYear = "2008";
					}

var gOppo="";

					//
					// Now the opposition ...
					//
					if (null != (gOppo = lPrefs.getString ("oppo")) && (0 != gOppo.length))
					{
						// Oppo set in the userPrefs
					}
					
					//
					// How about in the hosting page query?
					//
					else if ((0 != lArgs.length) && (null != (gOppo = lArgs["oppo"])) && (0 != gOppo.length))
					{
						// Oppo from the page query string
					} 
					else
					{
						//
						// Fall back to a default Oppo
						//
						gOppo = "Welford_Park";
					}
					
					//
					// Now the date ...
					//
					if (null != (gDate = lPrefs.getString ("date")) && (0 != gDate.length))
					{
						// Date set in the userPrefs
					}
					
					//
					// How about in the hosting page query?
					//
					else if ((0 != lArgs.length) && (null != (gDate = lArgs["date"])) && (0 != gDate.length))
					{
						// Date from the page query string
					} 
					else
					{
						//
						// Fall back to a default date
						//
						gDate = "29th";
					}
					
					//
					// Now the month ...
					//
					if (null != (gMonth = lPrefs.getString ("month")) && (0 != gMonth.length))
					{
						// Month set in the userPrefs
					}
					
					//
					// How about in the hosting page query?
					//
					else if ((0 != lArgs.length) && (null != (gMonth = lArgs["month"])) && (0 != gMonth.length))
					{
						// Month from the page query string
					} 
					else
					{
						//
						// Fall back to a default month
						//
						gMonth = "April";
					}
					
					//
					// Lastly - Save away the "link target"
					//
					GGUtils_setLinkTarget (lPrefs.getString ("linkTarget"));
				}
				
				//----------------------------------------------------------[display]-
				// Load the XML & call the renderer
				//--------------------------------------------------------------------
				function display()
				{
					var lBaseURL = gGGGadget_Root + "TRCC/data/fixtures/";
					
					//
					// Read the user prefs & hosting URL
					//
					processSettings();
					
					gXMLSrc = lBaseURL + gYear + "/" + gMonth + "_" + gDate + "_" + gOppo + ".xml";
					
					//
					// Get the XML - Callback to function renderData when complete
					//
					_IG_FetchXmlContent(gXMLSrc, renderData);
				}
	
				_IG_RegisterOnloadHandler(display);

			</script>
		]]>
	</Content>
</Module>
