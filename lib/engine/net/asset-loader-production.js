'use strict';

var Bacon = require('baconjs');

function loadImage(path){
  var img    = new Image();
  var loaded = Bacon.fromCallback(function(c){
    img.onload = c;
  });

  img.src = '/' + path;

  return loaded.map(img).toProperty();
}
function loadText(path){
  //TODO: ajax load the content at 'path'
  return Bacon.constant(path);
}


function AssetLoader(){
  /* jshint indent:false */
  this.load = function(path,type){
    switch(type){
      case 'image': return loadImage(path);
      default:      return loadText(path);
    }
  };
}

module.exports = AssetLoader;
