'use strict';

var Bacon    = require('baconjs');
var fs       = require('fs');
var chokidar = require('chokidar');


function read(filename){
  return Bacon.fromNodeCallback(fs.readFile, filename);
}
function watch(filename){
  var watcher = chokidar.watch(filename);

  return Bacon.fromEventTarget(watcher, 'change')
    .flatMapLatest(function(){
      return Bacon.fromNodeCallback(fs.readFile, filename);
    });
}
function load(filename){
  return read(filename)
    .concat(watch(filename))
    .toProperty();
}


module.exports = {
  read:  read,
  watch: watch,
  load:  load
};
