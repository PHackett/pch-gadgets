
//
// Send the data to the clipboard & start off email client
//
function ForwardDataToOutput (aData, aDate, aFile)
{
	//
	// Put the data into the clipboard
	//
	document.ClipboardHelper.data.value = aData;
	var lTheRange = document.ClipboardHelper.data.createTextRange();
	lTheRange.execCommand ("Copy");

	//
	// Put up an email window
	//
	var lSubject = "Match report generated destined for year = " + aDate.getFullYear() + " filename = " + aFile;
	self.location = "mailto:match_data@paulhackett.com?subject=" + lSubject;
}