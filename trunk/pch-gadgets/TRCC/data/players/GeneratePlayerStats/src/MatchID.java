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
		
    	mOppo = aCricketMatchElement.getAttribute("oppo");
    	
    	if (!aCricketMatchElement.getAttribute("notforstats").isEmpty())
    	{
    		mCountsTowardsStats = false;
    	}
    	
    	String lDateStr = aCricketMatchElement.getAttribute("date");
    	
    	//
    	// To parse dates of the form "Sat Apr 30 00:00:00 UTC+0100 2011"
    	//
		DateFormat			lDF = new SimpleDateFormat ("EEE MMM dd HH:mm:ss 'UTC'z yyyy");
		try
		{
			mDate = (Date)lDF.parse (lDateStr);
		} 
		catch (ParseException e)
		{
			//
			// To parse dates of the form Sat Sep 10 2011 00:00:00 GMT+0100 (BST)" 
			//
			DateFormat			lDF2 = new SimpleDateFormat ("EEE MMM dd yyyy HH:mm:ss 'GMT'z");
			
			try
			{
				mDate = (Date)lDF2.parse (lDateStr);
			} 
			catch (ParseException e1)
			{
				e1.printStackTrace();
	        	lRet = false;
			}
		}
		
		return (lRet);
	}

	public boolean	NotForStats ()		{ return (!mCountsTowardsStats);	}
	public String	Oppo ()				{ return (mOppo);					}
	public Date		Date ()				{ return (mDate);					}
	
	public String toXML ()
	{
		SimpleDateFormat lSDF = new SimpleDateFormat("EEE MMM dd 12:00:00 z");
		String lRet = "";
		
		lRet = lRet + "<MatchId ";
		lRet = lRet + "Date=\"" + lSDF.format(mDate) + "\" ";
		lRet = lRet + "oppo=\"" + mOppo + "\"";
		lRet = lRet + "/>";
		
		return (lRet);
	}
}
