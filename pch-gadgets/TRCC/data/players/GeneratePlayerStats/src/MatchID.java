import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.w3c.dom.Element;


public class MatchID
{
	boolean					mCountsTowardsStats;
	String					mOppo;
	Date					mDate;

	public MatchID ()
	{
		mCountsTowardsStats = true;
	}
	
	public boolean LoadFromMatchXML (Element aCricketMatchElement)
	{
		boolean lRet = true;
		
    	if (!aCricketMatchElement.getAttribute("notforstats").isEmpty())
    	{
    		mCountsTowardsStats = false;
    	}

    	if (!ParseDateAndOppo (aCricketMatchElement))
    	{
        	System.out.println ("ERROR: Failed to parse Date & Oppo from match data");
    		lRet = false;
    	}
		
		return (lRet);
	}

	public boolean parseFromYearStatsXML (Element aMID)
	{
		boolean	lRet = true;
		
		mCountsTowardsStats	= true;
		
    	if (!ParseDateAndOppo (aMID))
    	{
        	System.out.println ("ERROR: Failed to parse Date & Oppo from YearStats");
    		lRet = false;    		
    	}
		
		return (lRet);
	}


	public boolean	NotForStats ()		{ return (!mCountsTowardsStats);	}
	public String	Oppo ()				{ return (mOppo);					}
	public Date		Date ()				{ return (mDate);					}
	
	public String toXML ()
	{
		// SimpleDateFormat lSDF = new SimpleDateFormat("EEE MMM dd 12:00:00 z yyyy");
		SimpleDateFormat lSDF = new SimpleDateFormat("EEE MMM d 00:00:00");
		String lRet = "";
		
		lRet = lRet + "<MatchId ";
		lRet = lRet + "date=\"" + lSDF.format(mDate) + " UTC+0100 " + (mDate.getYear() + 1900) + "\" ";
		lRet = lRet + "oppo=\"" + mOppo + "\"";
		lRet = lRet + "/>";
		
		return (lRet);
	}
	
	private boolean ParseDateAndOppo (Element aEle)
	{
		boolean lRet = true;
		
    	mOppo = aEle.getAttribute("oppo");
    	
    	String 		lXmlDateStr = aEle.getAttribute("date");
    	
    	//
    	// To parse dates of the form "Sat Apr 30 00:00:00 UTC+0100 2018"
    	//
		DateFormat			lDF = new SimpleDateFormat ("EEE MMM dd HH:mm:ss 'UTC'z yyyy");
		try
		{
			mDate = (Date)lDF.parse (lXmlDateStr);
		} 
		catch (ParseException e)
		{
			//
			// To parse dates of the form Sat Sep 10 2011 00:00:00 GMT+0100 (BST)" 
			//
			DateFormat			lDF2 = new SimpleDateFormat ("EEE MMM dd yyyy HH:mm:ss Z (z)");
			
			try
			{
				mDate = (Date)lDF2.parse (lXmlDateStr);
				
				System.out.println("INFO: Succesfully parsed date string '" + lXmlDateStr + "'");
			} 
			catch (ParseException e1)
			{
				//
				// To parse dates in yet _Another_ format
				//
				String[]	lSplit = lXmlDateStr.split(" ");
		    	String		lDateStr = lSplit[0] + " " + lSplit[1] + " " + lSplit[2] + " " + lSplit[3] + " 12:00:00";
				DateFormat	lDF3 = new SimpleDateFormat ("EEE MMM dd yyyy HH:mm:ss");
		    	
		    	try
		    	{
					mDate = (Date)lDF3.parse (lDateStr);		    		
		    	}
				catch (ParseException e2)
		    	{
					System.out.println("ERROR: Unable to parse date '" + lDateStr + "'");
					e2.printStackTrace();
		        	lRet = false;
		    	}
			}
		}

		return (lRet);
	}
}
