'use strict';

var Bacon = require('baconjs');

Bacon.Observable.prototype.pipe = function(bus){
  return bus.plug(this);
};
Bacon.Observable.prototype.endEvent = function(){
  var semaphore = {};
  return this
    .mapEnd(semaphore)
    .filter(function(x){ return x === semaphore; })
    .take(1);
};
