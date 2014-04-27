var express = require('express');
var app = express();
var fs = require('fs');
var cors = require('cors');
var headers = require("./headers");
var _ = require('underscore');


var TEMP_unwantedheaders = headers.unwanted.concat(headers.keep);

app.configure(function() {
	app.use(express.static(__dirname + '/static'));
	app.use(cors());
});

app.get('/index.html', function(req, res) {
  res.send("sending nothing"); // sending nothing
});

app.get('/getfiles', function(req, res) {
	console.log('/getfiles');
	
	fs.readdir("../mail", function(err, files) {
		if(err) {
			console.log(err);
			res.send(err);
			return;
		}
		res.send(files);
	})
});

var process = function(data) {
	var pairs = []; // key value pairs
	var pairregex = /^[a-zA-Z0-9-]+: /;
	var boundaryregex = /boundary="[a-zA-Z0-9-=_]+"/;
	var currentpair = null;
	var boundary = null;
	var boundaryStartFound = false;
	var mode = "normal";

	var lines = data.split("\r\n");

	// special treating of the first line
	var splitted = lines[0].split("From ");
	pairs.push({"key" : "From", "value" : splitted[1]});

	for (var i=1; i<lines.length; i++) {
		var line = lines[i];

		switch(mode) {

			case "normal" :
				var matchresult = line.match(pairregex);
				if(matchresult != null) {
					if (currentpair != null) {
						pairs.push(currentpair);
						currentpair = null;
					}
					var key = matchresult[0].slice(0,-2);

					if (key === "Content-Type" && line.indexOf("multipart/alternative" !== -1) && line.match(boundaryregex) != null) {
						boundary = line.match(boundaryregex)[0].substr(10, line.match(boundaryregex)[0].length-11);
						mode = "boundary";
						console.log("boundary: " + boundary + " at line: " + i);
					}

					currentpair = { "key" : key, "value" : "" };
					var splitted = line.split(matchresult[0]);
					currentpair.value += splitted[1];
				} else {
					currentpair.value += line;
				}
				break;

			case "boundary" :
				if (line.indexOf(boundary) !== -1) {
					if (boundaryStartFound) {
						boundaryStartFound = false;
						mode = "normal";
						console.log("end at line: " + i);
					} else {
						boundaryStartFound = true;
					}
				}
				break;
		}
	}

	// strip unwanted headers
	// pairs = pairs.filter(function(pair) { return TEMP_unwantedheaders.indexOf(pair.key) === -1; })

	return pairs;
}

app.get('/getitem', function(req, res) {
	var filename = req.query.id;
	console.log('/getitem ' + filename);

	fs.readFile("../mail/" + filename, "utf8", function (err, data) {
		if(err) {
			console.log(err);
			res.send(err);
			return;
		}

		var processed = process(data); 

		res.send({raw: data, processed: processed});
	});
});

app.listen(3002);
console.log("node app started and http://localhost:3002");