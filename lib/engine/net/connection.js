'use strict';

require('../util');

var Bacon = require('baconjs');

//Create an event stream from incoming websockets messages
function websocketAsEventStream(ws){
  return Bacon.fromBinder(function(sink){
    ws.onopen    = function(message){
      sink(new Bacon.Next(function(){ return message; }));
    };
    ws.onmessage = function(message){
      sink(new Bacon.Next(function(){ return message; }));
    };
    ws.onerror   = function(error){
      sink(new Bacon.Error(function(){ return error; }));
    };
    ws.onclose   = function(error){
      sink(new Bacon.End(function(){ return error; }));
    };

    return function(){
      ws.onopen = ws.onmessage = ws.onerror = ws.onclose = function(){};
    };
  });
}

//A reactive wrapper around a websocket
function connection(ws){
  var stream  = websocketAsEventStream(ws);
  stream.subscribe(function(){}); //Force a subscription so we don't miss events

  //Read incoming events, write outgoing events
  var send    = new Bacon.Bus();
  var receive = stream
    .filter(function(message){ return message.type === 'message' || message.type === 'Text'; })
    .map('.data')
    .map(JSON.parse);

  //Current state of the connection
  var disconnected = stream.endEvent();
  var connected    = Bacon
    .later(100, true) //Wait 100ms for the websocket to open
    .merge(disconnected.map(false))
    .toProperty(false);

  //Buffer messages until the websocket is opened, then send them all
  send.holdWhen(connected.not())
    .map(JSON.stringify)
    .onValue(function(m){ ws.send(m); });
  disconnected
    .onValue(function(){ send.end(); });

  return {
    send:      send,
    receive:   receive,
    connected: connected
  };
}

module.exports = connection;
