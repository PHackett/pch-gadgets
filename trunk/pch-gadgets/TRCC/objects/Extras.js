//-------------------------------------------[GGTRCC_ExtrasO]-
// Object to hold information on extras.
//
//	A single Extras XML will look like - 
//
//		 <Extras value="24"/>
//
// @param aExtrasXML 	IN 	The extras XML node
//
//------------------------------------------------------------
function GGTRCC_ExtrasO (aExtrasXML)
{
	this.mExtras	= aExtrasXML.getAttribute ("value");

	//
	// Methods
	//
	this.extras 	= GGTRCC_ExtrasO___extras;
}


function GGTRCC_ExtrasO___extras()
{
	return (this.mExtras);
}