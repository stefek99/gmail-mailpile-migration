var express = require('express');
var app = express();
var fs = require('fs');
var cors = require('cors');

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

app.get('/getitem', function(req, res) {
	var filename = req.query.id;
	console.log('/getitem ' + filename);

	fs.readFile("../mail/" + filename, function (err, data) {
		if(err) {
			console.log(err);
			res.send(err);
			return;
		}
		res.send(data);
	});
});

app.listen(3002);
console.log("node app started and http://localhost:3002");