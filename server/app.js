var express = require('express');
var app = express();
var fs = require('fs');
var cors = require('cors');
var headers = require("./headers");
var _ = require('underscore');
var MailParser = require("mailparser").MailParser;

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

var process = function(file, res) {
	var mailparser = new MailParser();

	mailparser.on("end", function(mail_object){
	    console.log("Subject:", mail_object.subject);
	    res.end(JSON.stringify({ 
	    	subject : mail_object.subject,
	    	from : mail_object.from
	    }));
	});

	fs.createReadStream(file).pipe(mailparser);
}

app.get('/getitem', function(req, res) {
	var filename = req.query.id;
	console.log('/getitem ' + filename);

	process("../mail/" + filename, res);
});

app.listen(3002);
console.log("node app started and http://localhost:3002");