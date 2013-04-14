import java.io.FileNotFoundException;
import java.io.IOException;

import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;


public class PlayerRollcall 
{

	public boolean LoadFromUrl()
	{
		boolean 	lRet=true;
		String		lFragment = "players/Rollcall.xml";

		try 
		{
			Document lDoc = GeneratePlayerStats.LoadXMLFromURL(lFragment);
			
			if (!ParseRollcall(lDoc))
			{
				System.out.println ("ERROR: Failed to parse Rollcall");
				lRet = false;
			}
		}
		catch (FileNotFoundException e)
		{
			//
			// There is no data for this player on the web
			//
			System.out.println ("ERROR: Can't find the player rollcall!");
		}
		catch (IOException e) 
		{
			e.printStackTrace();
		} 
		catch (ParserConfigurationException e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (SAXException e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return (lRet);
	}
	
	private boolean ParseRollcall (Document aDoc)
	{
		boolean		lRet=true;
        NodeList	lPS	= aDoc.getElementsByTagName("Player");

        if (0 == lPS.getLength())
        {
        	System.out.println ("ERROR: Cant find <Player> in rollcall XML");
        	lRet = false;
        }
        else
        {
        	System.out.println ("DEBUG: total of " + lPS.getLength() + " entries in rollcall XML");
        	
        	//
        	// Load for all the players
        	//
	        for (int i=0 ; i<lPS.getLength() ; ++i)
	        {
            	Element lElement = (Element)lPS.item(i);
	        	String 	lSurname = lElement.getAttribute("surname");
	        	String 	lFirstname = lElement.getAttribute("firstname");
	        	String	lName = lFirstname + " " + lSurname;

	        	if (ShouldProcessPlayer(lName))
	        	{
		        	System.out.println ("DEBUG: Processing player '" + lName + "'");
	
		        	//
		        	// Get us a PlayerLifetimeStats object for this player
		        	//
					PlayerLifetimeStats lPLS = PlayerLifetimeStats.Get(lName);
	
					//
					// Load the stats from the web (XML)
					//
					if (!lPLS.LoadFromURL())
					{
						System.out.println ("ERROR: Failed to load PlayerLifetimeStats for player = '" + lName + "'");									
					}
	        	}
	        }
        }
        
		return (lRet);
	}
		
        
    private boolean ShouldProcessPlayer (String aName)
    {
    	boolean lRet = true;
    	
    	/*
    	if (aName.equals("Paul Hackett"))
    	{
    		lRet = true;
    	}
    	else if (aName.equals("Steve Beamish"))
    	{
    		lRet = true;
    	}
    	else if (aName.equals("Nic Downes"))
    	{
    		lRet = true;
    	}
    	*/
    	
    	return (lRet);
    }
}
