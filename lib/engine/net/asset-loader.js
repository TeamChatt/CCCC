'use strict';

var Bacon      = require('baconjs');
var connection = require('./stable-connection');
require('../core/util');


function convert(type){
  /* jshint indent: false */
  //TODO: support more types
  switch(type){
    case 'image': return convertImage;
    default:      return convertString;
  }

  function convertImage(buffer){
    var image  = new Image();
    image.src  = 'data:image/jpeg;base64,' + buffer.toString('base64');

    return image;
  }
  function convertString(buffer){
    return buffer.toString('ascii');
  }
}

function AssetLoader(url){
  var c      = connection(url);
  var assets = new Bacon.Bus();

  //Send requests as they become available
  assets.pipe(c.send);
  //On reconnect, resend all requests
  var reconnects = c.connected
    .filter(function(x){ return x; })
    .skip(1);
  assets
    .scan([], '.concat')
    .sampledBy(reconnects)
    .flatMap(Bacon.fromArray)
    .pipe(c.send);


  this.load = function(path, type){
    assets.push(path);

    return c.receive
      .filter(function(message){
        return message.filename === path;
      })
      .map('.data')
      .map(function(data){ return new Buffer(data, 'base64'); })
      .map(convert(type));
  };
}

module.exports = AssetLoader;
