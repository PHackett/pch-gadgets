
//
// Send the fixute data to the clipboard & write directly to file
//
function ForwardDataToOutput (aData, aDate, aFile)
{
	// alert ("In ForwardDataToOutput (" + aData + ", " + aDate + ", " + aFile +")");

	//
	// Generate the full name of the file we want to create
	//
	// var lOutFile=GetFileSystemRoot() + "fixtures\\";

	// lOutFile += aDate.getFullYear() + "\\" + aFile;

	alert ("Output to file " + aFile);

	writeDataToFile (aData, aFile);
}
