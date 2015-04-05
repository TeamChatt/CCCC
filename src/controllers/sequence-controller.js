'use strict';

var flow  = require('../flow');
require('../../lib/engine/core/util');


//Controller
function sequenceController(segments, start){
  function runSequence(seq){
    var head = flow.sequence(seq[0]());
    var tail = seq.slice(1);

    return tail.reduce(function(initial, next){
      return initial.then('.controller.end', next);
    }, head);
  }

  var segment  = runSequence(segments.slice(start)).toProperty();
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


module.exports = sequenceController;