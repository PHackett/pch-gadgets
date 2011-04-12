var lPredictiveInputOptionsIndexDebug=false;


//
// This class is used as an index into the predictive input options array, 
// for inproved speed of lookup. This becam necessary when I got round to
// adding all the TRCC player - Over 200 - which was a bit of a load for 
// JavaScript. It could take ~1/2 second to search in the rather ham-fisted
// manner!
// 
function PredictiveInputOptionsIndex (aOptions)
{
	var i;
	var lIndexSize=26;

	// Array for the alphabet
	lAlphabet = new Array (lIndexSize);

	// Initialise the array
	for (i=0 ; i<lAlphabet.length ; i++)
	{
		//                             Lower Index
		//                                Upper index
		lAlphabet[i] = new Array (0, 0);
	}

	// Down the ORDERED! list
	var lCurCode=-1;
	var lA="a";
	var lBO=lA.charCodeAt (0);

	for (i=0 ; i<aOptions.length ; i++)
	{
		var lThisCode=aOptions[i].toLowerCase().charCodeAt(0);
		var lIndex=lThisCode-lBO;

		if (lIndex >= lIndexSize)
		{
			alert ("Index size exceeded for " + aOptions[i]);
		}
		else
		{
			lAlphabet[lIndex][1] = i + 1;

			if (lCurCode != lThisCode)
			{
				lAlphabet[lIndex][0] = i;

				lCurCode = lThisCode;
			}
		}
	}

	//
	// Debug only
	//
	if (lPredictiveInputOptionsIndexDebug && (aOptions.length > 30))
	{
		lPredictiveInputOptionsIndexDebug = false;
		var lO="";

		for (i=0 ; i<lAlphabet.length ; i++)
		{
			var lC=lBO+i;
			var lS=String.fromCharCode(lC);

			lO += "lAlphabet[" + i + "][0] (" + lS + ") = " + lAlphabet[i][0];
			lO += "\n";
			lO += "lAlphabet[" + i + "][1] (" + lS + ") = " + lAlphabet[i][1];
			lO += "\n";
		}

		alert (lO);
	}

	return (lAlphabet);
}