
//
// Send the fixute data to the clipboard & write directly to file
//
function ForwardDataToOutput (aData, aDate, aFile, aFixtureData)
{
	// alert ("In ForwardDataToOutput");
	//
	// Put the fixture data into the clipboard
	//
//	document.ClipboardHelper.data.value = aFixtureData;
//	var lTheRange = document.ClipboardHelper.data.createTextRange();
//	lTheRange.execCommand ("Copy");

	//
	// Generate the full name of the file we want to create
	//
	var lOutFile=GetFileSystemRoot() + "fixtures\\";

	lOutFile += aDate.getFullYear() + "\\" + aFile;

	alert ("Output to file " + lOutFile);

	writeDataToFile (aData, lOutFile);
}
