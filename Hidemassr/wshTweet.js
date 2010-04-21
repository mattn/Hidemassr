// 
//   	Hidematter
//   	by mobitan  2010/04/17
// 

// Usage: cscript.exe //U //nologo hidematt.js username password
// ïWèÄì¸óÕÇ Twitter Ç…ìäçeÇ∑ÇÈ

var args = WScript.Arguments;
var username = args(0);
var password = args(1);
var buf = "";
while (!WScript.StdIn.AtEndOfStream) {
	buf += WScript.StdIn.ReadAll();
}
buf = buf.replace(/^\s+|\s+$/g, "");
var res = http_post("http://twitter.com/statuses/update.json", username, password, "status=" + encodeURIComponent(buf));
var resjson = eval("(" + res.text + ")");
WScript.StdErr.WriteLine(res.status + " " + resjson.error);
WScript.Quit((res.status == 200) ? 0 : res.status);

function http_post(url, username, password, body) {
	if (body.length == 0) return;
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
	xmlhttp.open("POST", url, false, username, password);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(body);
	return {status:xmlhttp.status, header:xmlhttp.getAllResponseHeaders(), text:xmlhttp.responseText};
}
