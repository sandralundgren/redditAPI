var Hapi = require('hapi');

	reddit = require('redwrap');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Request - Simplified HTTP client
var request = require('request');
request('https://www.reddit.com/r/Frontend/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})

// redwrap  /
/*
reddit.r('Frontend', function(error, response, body){
  if (!error && response.statusCode == 200) {
    console.log(body) //outputs json for first page of Frontend subreddit 
  }
});*/


// Add the route
server.route({
    method: 'GET',
    path:'/reddit', 
    handler: function (request, reply) {
       reply('hello world');
    }
});


// Start the server
server.start();