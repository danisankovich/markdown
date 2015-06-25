var fs = require("fs"),
http = require("http"),
request = require('request'),
marked = require('marked'),
url = require('url');

http.createServer(responseHandler).listen(8888);

//the parts of the url go into an http.get

function responseHandler(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  var matches = req.url.match(/(\/[a-z]+)?/);
  var path = matches[1] || '/';

  if (req.url.match("fav")) {
    res.end("");
    return;
  }

  if (path === "/marked") {
    var encodedText = req.url.match(/[^/]*$/g)[0];
    var decodedText = decodeURIComponent(encodedText);
    var convertedHtml = marked(decodedText);
    res.end(convertedHtml);
    return;
  } else {
    fs.readFile('index.html', 'utf8', function (err,data) {
      res.end(data);
    });
  }
}
