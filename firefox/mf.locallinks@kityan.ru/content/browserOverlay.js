function onLoad()
{
	gBrowser.removeEventListener("load", onLoad, false); //remove listener, no longer needed


	var allowedHosts = ['', 'localhost'];
	var selector =  'a.myLocallink';
	var path2Explorer = "C:\\windows\\explorer.exe";

	if (allowedHosts.indexOf(this.contentWindow.location.host) > -1)
	{
		$(this.contentWindow.document).find('body').delegate(selector, "click",	function(e) 
			{
		
				e.preventDefault(); 
				var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);
				file.initWithPath(path2Explorer);
				var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
				process.init(file);
				var converter = Components.classes['@mozilla.org/intl/scriptableunicodeconverter'].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
				converter.charset = "windows-1251";
				var path = [converter.ConvertFromUnicode(jQuery(this).data('path'))];
				var args = [path];
				process.run(false, args, args.length);
			}

		);
	}
}

gBrowser.addEventListener("load", onLoad, true);