'use strict';

var Bacon = require('baconjs');
require('../../lib/engine/core/util');


//Controller
function sequenceController(segments, start){
  function runSequence(seq){
    var head = sequence(seq[0]());
    var tail = seq.slice(1);

    return tail.reduce(function(initial, next){
      return initial.then('.controller.end', next);
    }, head);
  }

  var segment  = runSequence(segments.slice(start));
  var progress = segment
    .skip(1)
    .count()
    .map(function(x){ return x+start; });
  var end      = segment
    .skip(segments.length - start - 1)
    .take(1)
    .flatMapLatest('.controller.end');

  //Subscribe so we always get the latest value
  progress.onValue(function(){});

  return {
    segment:  segment,
    progress: progress,
    end:      end
  };
}
function sequence(initial){
  function wrap(event){
    event.then = function(when, next){
      var becomes = event
        .take(1)
        .flatMap(when)
        .map(function(){ return next(); });

      return wrap(event
        .toEventStream()
        .concat(becomes)
        .toProperty()
      );
    };
    return event;
  }

  return wrap(Bacon.constant(initial));
}


module.exports = sequenceController;