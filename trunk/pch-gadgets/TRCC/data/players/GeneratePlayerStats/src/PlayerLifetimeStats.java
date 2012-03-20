import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Map;
import java.util.TreeMap;

import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;


public class PlayerLifetimeStats 
{
	static Map<String, PlayerLifetimeStats> sPlayerDB = new TreeMap<String, PlayerLifetimeStats>();
	
	public static PlayerLifetimeStats Get (String aName)
	{
		PlayerLifetimeStats lRet = sPlayerDB.get(aName);
		
		if (null == lRet)
		{
			lRet = new PlayerLifetimeStats(aName);
			
			sPlayerDB.put(aName, lRet);
		}
		
		return (lRet);
	}

	
	//
	// Members
	//
	String							mName;
	Map<String, PlayerYearStats>	mPlayerStatsDB;

	
	/**
	 * Ctor
	 * 
	 * @param aName
	 */
	public PlayerLifetimeStats (String aName)
	{
		mName = aName;
		mPlayerStatsDB = new TreeMap<String, PlayerYearStats>();
	}

	
	/**
	 * Load the Player Year Stats from the XML online
	 * 
	 * @return
	 */
	public boolean LoadFromURL ()
	{
		boolean lRet = false;
		String	lURL = GetURLFragment ();
		
		try 
		{
			Document lDoc = GeneratePlayerStats.LoadXMLFromURL(lURL);
			
			if (!ParsePlayerYearStats (lDoc))
			{
				System.out.println ("ERROR: Failed to parse lifetime stats for player = '" + mName + "'");				
			}
		} 
		catch (ParserConfigurationException e) 
		{
			e.printStackTrace();
		} 
		catch (SAXException e) 
		{
			e.printStackTrace();
		} 
		catch (FileNotFoundException e)
		{
			//
			// There is no data for this player on the web
			//
			System.out.println ("INFO: No PlayerLifetimeStats on web for player = '" + mName + "'");
		}
		catch (IOException e) 
		{
			e.printStackTrace();
		}
		
		return (lRet);
	}


	/**
	 * Parse the year stats XML 
	 * @param aDoc
	 * @return
	 */
	public boolean ParsePlayerYearStats (Document aDoc)
	{
		boolean 	lRet = false;
        NodeList	lPS	= aDoc.getElementsByTagName("PlayerStats");

        if (1 != lPS.getLength())
        {
        	System.out.println ("ERROR: Cant find <PlayerStats>in XML");
        	lRet = false;
        }
        else
        {
        	Element lPSElement = (Element)lPS.item(0);

        	//
        	// Load the first recorded data
        	//
        	
			//
			// Now load the year data
			//
	        NodeList	lYearList	= lPSElement.getElementsByTagName("YearData");
	        
	        for (int i=0 ; i<lYearList.getLength() ; ++i)
	        {
            	Element 		lYearElement = (Element)lYearList.item(i);
            	PlayerYearStats	lPYS = new PlayerYearStats(mName);
	        }
	        
	        //
	        // Load the old, incomplete data
	        //
        }
		
		return (lRet);
	}
	
	
	/**
	 * The URL of this player data on the web
	 * 
	 * @param aBaseURL
	 * @return
	 */
	public String GetURLFragment ()
	{
		String	lRet = "players/";
		int		lIndex=mName.indexOf(" ");
		
		if (-1 == lIndex)
		{
			System.out.println ("ERROR: Can parse player name " + mName);
		}
		else
		{
			String lFirstName	= mName.substring(0, lIndex);
			String lSurName		= mName.substring(lIndex+1);
			
			// System.out.println ("DEBUG: Player: FirstName='" + lFirstName + "' SurName='" + lSurName + "'");
			
			String lName = lSurName + "_" + lFirstName;
			
			lName = lName.toLowerCase().replace(" ", "_") + ".xml";
			
			lRet = lRet + lName;
		}
		
		return (lRet);
	}
}
