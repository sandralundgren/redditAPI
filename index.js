var Hapi = require('hapi');
var request = require('request');
var reddit = require('redwrap');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Request - Simplified HTTP client

request({
url: 'https://www.reddit.com/r/Frontend/hot/.json',
json: true
}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    
    console.log(body);  

    var titles = ' ';
    for (var i = 0; i < 10; i++) {
        titles += i + 1 + ' ';
        titles += body.data.children[i].data.title;
        titles += ' / ';
    }

    console.log(titles);

    //response.send(titles);

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
