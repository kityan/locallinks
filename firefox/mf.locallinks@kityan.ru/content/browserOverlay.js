function onLoad()
{
	gBrowser.removeEventListener("load", onLoad, false); //remove listener, no longer needed


	var allowedHosts = ['', 'localhost'];
	var selector =  'a.myLocallink';
	var path2Explorer = "C:\\windows\\explorer.exe";

	if (allowedHosts.indexOf(this.contentWindow.location.host) > -1)
	{
		$(this.contentWindow.document).find('body').undelegate(selector, "click");
		$(this.contentWindow.document).find('body').delegate(selector, "click",	function(e) 
			{
		
				e.preventDefault(); 

				var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);
				file.initWithPath(path2Explorer);

				var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
				process.init(file);

				var converter = Components.classes['@mozilla.org/intl/scriptableunicodeconverter'].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
				converter.charset = "windows-1251";

				var path_cp1251 = [converter.ConvertFromUnicode(jQuery(this).data('path'))];
				var path = [jQuery(this).data('path')];

				
				// executable files are denied! lets check.
				var file2 = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);
				file2.initWithPath(path);


				if (!file2.exists())
				{
				       alert('Путь не существует!');
				}
				else
				{
					if (file2.isExecutable()) // 2do: is this check 
					{
						alert('Запрещено. Исполняемый файл.');
					}
					else
					{
						
						var args = [path_cp1251];
						process.run(false, args, args.length);
					}
				}
			}

		);
	}
}

gBrowser.addEventListener("load", onLoad, true);