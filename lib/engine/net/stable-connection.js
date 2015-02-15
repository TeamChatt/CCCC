'use strict';

var Bacon      = require('baconjs');
var connection = require('./connection');


function asErrors(stream, error){
  return stream.flatMap(function(){
    return new Bacon.Error(error);
  });
}
function connectionWithError(url){
  var c          = connection(new WebSocket(url));
  var disconnect = c.connected
    .changes()
    .filter(function(x){ return x === false; });

  return Bacon.once(c).merge(asErrors(disconnect, 'disconnected'));
}


//A wrapper around a websocket that will attempt to reconnect on error
function stableConnection(url, options){
  options = options || {};
  var cs  = Bacon.retry({
    source:  function(){ return connectionWithError(url); },
    retries: options.retries || 100,
    delay:   options.delay   || function(){ return 5*1000; }
  }).toProperty();

  //Read incoming events, write outgoing events
  var send    = new Bacon.Bus();
  var receive = cs.flatMapLatest('.receive');

  receive.onValue(function(){}); //Force a subscription so we don't miss events

  //Current state of the connection
  var connected = cs.flatMapLatest('.connected').toProperty(false);

  //Pipe send messages through to the currently active connection
  send
    .holdWhen(connected.not())
    .combine(cs.map('.send'), function(e,s){
      return {event: e, send: s};
    })
    .onValue(function(ctx){
      ctx.send.push(ctx.event);
    });

  return {
    send:      send,
    receive:   receive,
    connected: connected
  };
}

module.exports = stableConnection;
