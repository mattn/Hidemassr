// 
//   	Hidematter
//   	by mobitan  2010/04/19
// 

// Usage: cscript.exe //U //nologo shorten-urls.js username apikey
// 標準入力に含まれる URL を短縮する

var domain = "j.mp";
var args = WScript.Arguments;
var username = args(0);
var apikey = args(1);
var urlchars = "[!#$%&'*+,\-./0-9:;=?@_a-z~]";
var urlregex = new RegExp("(https?|ftp)://(" + urlchars + "|\\(" + urlchars + "\\))+", "ig"); // 括弧はペアで 1 重まで
var buf = "";
while (!WScript.StdIn.AtEndOfStream) {
	buf += WScript.StdIn.ReadAll();
}
buf = buf.replace(urlregex, function($0) {
	var res = http_get("http://api." + domain + "/v3/shorten?login=" + username + "&apiKey=" + apikey + "&longUrl=" + encodeURIComponent($0) + "&format=txt", null, null);
	if (res.status == 200) {
		return res.text.replace(/^\s+|\s+$/g, "");
	}
	return $0;
});
WScript.StdOut.Write(buf);

function http_get(url, username, password) {
	var xmlhttp = (function() {
	    try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
	        try {
				return new ActiveXObject("Microsoft.XMLHTTP");
			} catch(ee) {
				return null;
			}
	    }
	})();
	if (!xmlhttp) return;
	xmlhttp.open("GET", url, false, username, password);
	xmlhttp.send(null);
	return {status:xmlhttp.status, header:xmlhttp.getAllResponseHeaders(), text:xmlhttp.responseText};
}
