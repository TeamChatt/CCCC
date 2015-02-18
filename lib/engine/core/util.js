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
Bacon.Observable.prototype.count = function(){
	return this
		.scan(0, function(x){ return x+1; });
};

Bacon.fix = function(f){
	var ref = new Bacon.Bus();
  var s   = f(ref);
	ref.plug(s);
	return s;
};