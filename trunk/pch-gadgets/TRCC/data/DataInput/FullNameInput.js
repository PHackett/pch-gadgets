// For validated Surname & first name input
var gFullNameInputA=new Array();

function FullNameInput (aForm, aPlayers, aBlurCB, aBlurCBParam)
{
	this.mForm				= aForm;
	this.mIndex				= gFullNameInputA.length;
	this.mName				= this.mForm + "-FullNameInput-" + this.mIndex;

	this.HTML				= FullNameInput___HTML;
	this.GetName			= FullNameInput___GetName;
	this.GetSurname			= FullNameInput___GetSurname;
	this.GetFirstname		= FullNameInput___GetFirstname;
	this.SetFirstname		= FullNameInput___SetFirstname;
	this.SetFirstnameOpts	= FullNameInput___SetFirstnameOpts;
	this.MakeFNIPName		= FullNameInput___MakeFNIPName;
	this.MakeSNIPName		= FullNameInput___MakeSNIPName;
	this.SetPlayers			= FullNameInput___SetPlayers;
	this.SetDisplayClass	= FullNameInput___SetDisplayClass;

	this.SurnameChangeCB	= FullNameInput___SurnameChangeCB;

	this.mIPSurname			= new PredictiveInput (this.MakeSNIPName(), 
													aForm, 
													GetPlayerSurnames (this.mPlayers), 
													SURNAMECHANGECB, this.mIndex, 
													12, 30);
	this.mIPFirstname		= new PredictiveInput (this.MakeFNIPName(), 
													aForm, 
													null, 
													null, null, 
													10, 30,
													aBlurCB, aBlurCBParam);

	this.mPlayersIndex = null;
	this.SetPlayers (aPlayers);


	gFullNameInputA[this.mIndex] = this;
}

function FullNameInput___HTML()
{
	dwln ("<table cellspacing='0' cellpadding='0' border='0'>");
	dwln ("	<tr>");
	dwln ("		<td>");
					this.mIPSurname.HTML();
	dwln ("		</td>");

	dwln ("		<td>&nbsp;</td>");

	dwln ("		<td>");
					this.mIPFirstname.HTML();
	dwln ("		</td>");
	dwln ("	</tr>");
	dwln ("</table>");
}

function FullNameInput___SetPlayers (aPlayers)
{
	this.mPlayers = aPlayers;

	if (this.mPlayers == null)
	{
		this.mPlayers = new Array();
	}

	var lSurnames=GetPlayerSurnames (this.mPlayers)

	if (lSurnames.length > 20)
	{
		//
		// Lets have an index to speed up lookups
		//
		this.mPlayersIndex = PredictiveInputOptionsIndex (lSurnames);
	}
	else
	{
		this.mPlayersIndex = null;
	}

	this.mIPSurname.SetOptions (lSurnames);
}

function FullNameInput___GetName()
{
	lRet="";

	if (this.GetFirstname() != "")
	{
		lRet += this.GetFirstname() + " ";
	}

	lRet += this.GetSurname();

	//
	// Trim leading, trailing & multiple spaces
	//
	lRet = collapseStringSpaces (lRet);

	return (lRet);
}

function FullNameInput___GetSurname()				{	return (this.mIPSurname.GetValue());						}
function FullNameInput___GetFirstname()				{	return (document[this.mForm][this.MakeFNIPName()].value);	}
function FullNameInput___SetFirstname(aN)			{	document[this.mForm][this.MakeFNIPName()].value = aN;		}
function FullNameInput___SetFirstnameOpts(aOpts)	{	this.mIPFirstname.SetOptions (aOpts);						}
function FullNameInput___MakeFNIPName()				{	return (this.mName + "FirstName");							}
function FullNameInput___MakeSNIPName()				{	return (this.mName + "SurName");							}
function FullNameInput___SetDisplayClass (aClass)
{
	this.mIPFirstname.SetDisplayClass (aClass);
	this.mIPSurname.SetDisplayClass (aClass);
}

function FullNameInput___SurnameChangeCB()
{
	var lPA=this.mPlayers;
	var i;
	var lSearchBegin=0;
	var lSearchEnd=lPA.length;

	if (this.mPlayersIndex != null)
	{
		var lA="a";
		var lBO=lA.charCodeAt (0);
		var lKey=this.GetSurname().substr(0, 1).toLowerCase();
		var lIndex=lKey.charCodeAt(0) - lBO;

		if ((lIndex < this.mPlayersIndex.length) && (lIndex >= 0))
		{
			lSearchBegin	= this.mPlayersIndex[lIndex][0];
			lSearchEnd		= this.mPlayersIndex[lIndex][1];
		}
	}

	for (i=lSearchBegin ; i<lSearchEnd ; i++)
	{
		if (lPA[i].GetSurname() == this.GetSurname())
		{
			this.SetFirstname (lPA[i].GetFirstname());

			this.SetFirstnameOpts (GetFirstNamesMatchingSurname (this.mPlayers, this.GetSurname()));
			break;
		}
	}
}

function SURNAMECHANGECB (aIndex)
{
	return (gFullNameInputA[aIndex].SurnameChangeCB());
}