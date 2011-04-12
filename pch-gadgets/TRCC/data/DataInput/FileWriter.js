function writeDataToFile (aData, aFile)
{
	var lRet=0;
	
	if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
	{
		alert ("You are using Firefox!");
		
		try 
		{
			//
			// Get priviledges to create file
			//
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		} 
		catch (e) 
		{
			alert ("Permission to save file was denied: e.description='" + e.description + "'");
			
			throw e;
		}

		//
		// Make a "local file" object
		// 		
		var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
		
		file.initWithPath (aFile);
		
		if ( file.exists() == false ) 
		{
			try
			{
				//
				// Create the file
				//
				file.create (Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420);
				
			}
			catch (err)
			{
				alert ("Failed to create file '" + aFile + "': err.description='" + err.description +"'");
			}
		}

		//
		// Get a atream to write with
		// 	
		var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance( Components.interfaces.nsIFileOutputStream );

		/* Open flags 
		#define PR_RDONLY       0x01
		#define PR_WRONLY       0x02
		#define PR_RDWR         0x04
		#define PR_CREATE_FILE  0x08
		#define PR_APPEND      0x10
		#define PR_TRUNCATE     0x20
		#define PR_SYNC         0x40
		#define PR_EXCL         0x80
		*/
		/*
		** File modes ....
		**
		** CAVEAT: 'mode' is currently only applicable on UNIX platforms.
		** The 'mode' argument may be ignored by PR_Open on other platforms.
		**
		**   00400   Read by owner.
		**   00200   Write by owner.
		**   00100   Execute (search if a directory) by owner.
		**   00040   Read by group.
		**   00020   Write by group.
		**   00010   Execute by group.
		**   00004   Read by others.
		**   00002   Write by others
		**   00001   Execute by others.
		**
		*/
		outputStream.init( file, 0x04 | 0x08 | 0x20, 420, 0 );
		
		var result = outputStream.write( aData, aData.length );
		
		outputStream.close();
	}
	else if ("Microsoft Internet Explorer" == navigator.appName)
	{
		var lFS= new ActiveXObject ("Scripting.FileSystemObject");

		if (!lFS.FileExists (aFile))
		{
			var lF=lFS.OpenTextFile (aFile, 8, true);
	
			lF.WriteLine (aData);
			lF.Close();
			
			lRet = 1;
		}
		else
		{
			alert ("=====================================================================================\n"	+ 
					"File\n"								+ 
					aFile + "\n"							+
					"Already exists - delete it first\n"	+ 
					"=====================================================================================");
		}
	}
	else
	{
		alert ("You must use Internet Explorer or FireFox for this page to work!\n" + 
			   "Stop now to avoid frustration!\n\n (/js/FileWriter.js)");
	}
	
	return (lRet);
}
