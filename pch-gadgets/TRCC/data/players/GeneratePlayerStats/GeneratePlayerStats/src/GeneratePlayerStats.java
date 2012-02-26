import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;

/**
 * 
 */

/**
 * @author paul
 *
 */
public class GeneratePlayerStats 
{
	public static final String	mRootURL = "http://pch-gadgets.googlecode.com/svn/trunk/pch-gadgets/TRCC/data/";

	private static int 			mYear = 2011;
	
	/**
	 * @param args
	 */
	public static void main(String[] args) 
	{
		// TODO Auto-generated method stub
		ReadFixtureYearData();

	}
	
	private static boolean ReadFixtureYearData ()
	{
		boolean lRet = false;
		try
		{
			DocumentBuilderFactory	lDocBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder 		lDocBuilder = lDocBuilderFactory.newDocumentBuilder();
            
			URL			lURL = new URL (mRootURL + "fixtures/fixtureYearsDB.xml");
			InputStream	lStream = lURL.openStream();
            Document 	lDoc = lDocBuilder.parse(lStream);
            
            lDoc.getDocumentElement ().normalize ();
            System.out.println ("Root element of the doc is " + lDoc.getDocumentElement().getNodeName());
            
            lRet = true;
		} 
		catch (MalformedURLException e)
		{
			e.printStackTrace();
		} 
		catch (ParserConfigurationException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (IOException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (SAXException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		System.out.println("Hi there");
		
		return (lRet);
	}

}
