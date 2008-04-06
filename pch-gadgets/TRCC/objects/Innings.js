//------------------------------------------[GGTRCC_InningsO]-
// Object to hold an innings data.
//
//	A single innings XML will look like - 
//
//		 <Innings batting="Twyford">
//        <batting>
//          ....
//        </batting>
//        <bowling>
//        </bowling>
//
// @param aInningsXML	IN 	The match report XML node
//
//------------------------------------------------------------
function GGTRCC_InningsO (aInningsXML)
{
	//
	// Methods
	//
	this.HTML 		= GGTRCC_InningsO___HTML;
}


function GGTRCC_InningsO___HTML()
{
	var lRet="";
	
lRet = "This is an innings<br>"

	return (lRet);
}