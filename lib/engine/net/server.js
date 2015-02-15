'use strict';

var Bacon           = require('baconjs');
var WebSocketServer = require('ws').Server;
var connection      = require('./connection');


function Server(port){
  var wss = new WebSocketServer({ port: port || 9000 });

  //Expose new connections as an event stream
  this.connections = Bacon.fromEventTarget(wss, 'connection')
    .map(connection);
  this.connections.subscribe(function(){}); //Force a subscription so we don't miss events

  //Close the server and terminate connections
  this.close = function(){ wss.close(); };
}

module.exports = Server;
