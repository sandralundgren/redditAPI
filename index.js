var Hapi = require('hapi');
var request = require('request');
var reddit = require('redwrap');
//var rest = require('./restler');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Request - Simplified HTTP client

request('https://www.reddit.com/r/Frontend/hot/.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    
    console.log(body);  

    var titles = ' ';
    for (var i = 0; i < 10; i++) {
        titles += reddit.data.children[i].data.title;
    }

    response.send(titles);

  }
})


// redwrap  

reddit.r('Frontend', function(error, response, body){
  if (!error && response.statusCode == 200) {
		reddit.list('hot', function(error, response, body){
			console.log(body); // for the frontend subreddit w/ 'hot' filter 
		});
  }
});

// Restler
/*
restler.get('http://www.reddit.com/r/Frontend/hot/.json').on('complete', function(reddit) {

	var titles = ' ';
    for (var i = 0; i < 10; i++) {
        titles += reddit.data.children[i].data.title;
    }

	response.send(titles);
});*/


// Add the route
server.route({
    method: 'GET',
    path:'/r/frontend/hot', 
    handler: function (request, reply) {
       console.log(reply); //reply(console.log(body));
    }
});


// Start the server
server.start(); 
