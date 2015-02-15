'use strict';

require('../util');

var Server = require('./server');
var fs     = require('../node/fs');


function AssetServer(){
  var server = new Server();

  server.connections
    .onValue(function(c){
      c.receive
        .flatMap(function(filename){
          return fs.load(filename)
            .map(function(data){ return new Buffer(data).toString('base64'); })
            .map(function(data){
              return {filename: filename, data: data};
            });
        })
        .pipe(c.send);
    });

  return server;
}

module.exports = AssetServer;
