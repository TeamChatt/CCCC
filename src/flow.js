'use strict';

var Bacon = require('baconjs');


function sequence(initial){
  function wrap(first, last){
    first.then = function(when, next){
      var becomes = last
        .take(1)
        .flatMap(when)
        .map(function(){ return next(); });

      return wrap(first.merge(becomes), becomes);
    };
    return first;
  }

  var first = Bacon.once(initial).delay(0);
  return wrap(first, first);
}

function runSequence(steps, done){
  var head = sequence(steps[0]());
  var tail = steps.slice(1);

  return tail.reduce(function(initial, next){
    return initial.then(done, next);
  }, head);
}

function transition(initial){
  function wrap(start, current){
    current.then = function(when, next){
      var becomes = start
        .flatMap(when)
        .flatMap(next);

      return wrap(start, current.merge(becomes));
    };
    return current;
  }

  var first = Bacon.once(initial).delay(0);
  return wrap(first, first);
}


module.exports = {
  sequence:    sequence,
  runSequence: runSequence,
  transition:  transition
};