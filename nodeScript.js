/*
cd C:\Users\William\Desktop
learnyounode //Start App
learnyounode verify Hey.js //Check for Correct
learnyounode run Hey.js //Run Test
learnyounode print //Directions

/*var answer = 0;
for (var i = 2; i < process.argv.length; i++){
	//console.log(process.argv[i]);
	answer += Number(process.argv[i]);
}
console.log( answer );*/

/*MY FIRST I/O
var fs = require('fs');
var answer = process.argv[2];

var str = fs.readFileSync(answer).toString();

var buf = str.split('\n');
//console.log(buf.length);
console.log( (buf.length - 1) );
*/

/*MY FIRST I/O ASYNC
var fs = require('fs');
var answer = process.argv[2];
var value = process.argv[3];

fs.readFile(answer, 'utf-8', function(err, data){
	if (err) throw err;
	var str = data.split('\n');
	console.log( (str.length - 1) ); 
});*/

/*FILTERED LS
var fs = require('fs');
var path = require('path');

var directory = process.argv[2];
var filter = process.argv[3];

fs.readdir(directory, function(err, list){
	if (err) throw err;
	for (var i = 0; i < list.length; i++){
		var ext = path.extname(list[i]).split('.')[1];
		//console.log(ext + " " + filter);
		if (ext === filter) {
			console.log(list[i]);
		}
	}
});*/

/*MAKE IT MODULAR
var mymodule = require('./mymodule');
var directory = process.argv[2];
var filter = process.argv[3];

mymodule(directory, filter, function(err, data){
	//for (var i = 0; i < data.length; i ++){
	//	console.log(data[i]);
	//}
	if (err)
		return console.error('There was an error:', err);
	data.forEach(function (file) {
		console.log(file);
	})
});*/

/*HTTP CLIENT
var http = require('http');
var url = process.argv[2];

/*http.get(url, function(res){
	//console.log("Got response: " + res.statusCode);
	res.setEncoding('utf8');
	res.on('data', function (chunk) {
    	//console.log('BODY: ' + chunk);
    	console.log(chunk);
	});
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});*/

/*http.get(process.argv[2], function(res){
	res.setEncoding('utf8');
	res.on('data', console.log);
	res.on('error', console.error);
});*/

/*HTTP COLLECT
var http = require('http');
var bl = require('bl');
http.get(process.argv[2], function(res){
	res.pipe(bl(function (err, data){
		if (err)
			return console.error(err);
		var i = data.toString();
		console.log(i.length);
		console.log(i);
	}));
});*/

/*JUGGLING ASYNC
var http = require('http');
var async = require('async');
var bl = require('bl');

var url1 = process.argv[2];
var url2 = process.argv[3];
var url3 = process.argv[4];

async.parallel([
    function(callback){
    	http.get(url1, function(res){
			res.pipe(bl(function (err, data){
				if (err)
					return console.error(err);
				var i = data.toString();
				callback( null, i);
			}));
		});
    },
    function(callback){
        http.get(url2, function(res){
			res.pipe(bl(function (err, data){
				if (err)
					return console.error(err);
				var i = data.toString();
				callback( null, i);
			}));
		});
    },
    function(callback){
        http.get(url3, function(res){
			res.pipe(bl(function (err, data){
				if (err)
					return console.error(err);
				var i = data.toString();
				callback( null, i);
			}));
		});
    }
],

function(err, results){
    for (var i = 0; i < results.length; i ++){
    	console.log(results[i]);
    }
});*/

/*TIME SERVER
var net = require('net');

var server = net.createServer(function(socket) {
	var date = new Date();
	
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	var hours = date.getHours();
	var mins = date.getMinutes();

	var fullDate = createTens(year) + "-" + createTens(month + 1) + "-" + createTens(day) + " " + createTens(hours) + ":" + createTens(mins);
	socket.end(fullDate + "\n");
})
server.listen( process.argv[2] );

function createTens(i){
	return (i < 10 ? '0' : '') + i.toString()
}*/

/*HTTP FILE SERVER
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
	// This line opens the file as a readable stream
	var readStream = fs.createReadStream( process.argv[3] );
	// This will wait until we know the readable stream is actually valid before piping
	readStream.on('open', function () {
		// This just pipes the read stream to the response object (which goes to the client)
		readStream.pipe(res);
	});
	// This catches any errors that happen while creating the readable stream (usually invalid names)
	readStream.on('error', function(err) {
		res.end(err);
	});
});

server.listen( process.argv[2] );
*/