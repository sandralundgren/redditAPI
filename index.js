/*------------------------------------*\
    $REDDIT API
\*------------------------------------*/

var Hapi    = require('hapi');
var request = require('request');
var Path    = require('path');
var debug   = require('util').debug;

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

/**
 * We need to wrap the request in a asynchronous function
 */

function fetchPosts(callback) {
    debug('Fetching posts…');
    request({
        url: 'https://www.reddit.com/r/Frontend/hot/.json',
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            // Let's push the titles into an array instead
            var items = [];
            for (var i = 0; i < 5; i++) {

                // Let's just keep the url and title in an own object
                var objects = {
                    title: body.data.children[i].data.title,
                    url: body.data.children[i].data.url
                }

                // And then push them to the items array
                items.push(objects);
            }

            debug('We got ' + items.length + ' items');

            callback(items);
        }
    });
}

// Add the route
server.route({
    method: 'GET',
    path: '/', 
    handler: function (request, reply) {
       reply.file(__dirname + '/views/index.html');
    }
});

server.route({
    method: 'GET',
    path: '/reddit',
    handler: function (request, reply) {
        // Run the function before se send the response…
        fetchPosts(function (ret) { 
            // …and when reply is ready, return the callback from fetchPosts
            reply(ret);
        });
    }
});


// Start the server
server.start(); 
