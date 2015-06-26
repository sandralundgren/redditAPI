var Hapi = require('hapi');
var request = require('request');
var Path = require('path');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

/* Sets up the views
server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'views')
});
*/


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

// Add the route
server.route({
    method: 'GET',
    path: '/', 
    handler: function (request, reply) {

       reply.file('index.html');
    }
});


// Start the server
server.start(); 
