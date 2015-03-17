'use strict';

var Bacon = require('baconjs');
require('../../../lib/engine/core/util');

var V2    = require('../../../lib/engine/core/vector').V2;
var S     = require('../../../lib/engine/core/vector').S;


var START_DISTANCE  = 15;

//Controller
function lineController(events, target_line){
  events.drag.onValue(function(){});
  events.dragEnd.onValue(function(){});

  var startPoint   = Bacon.constant(target_line.start);
  var endPoint     = Bacon.constant(target_line.end);

  var currentPoint = Bacon.fix(function(currentPoint){
    var start = currentPoint
      .sampledBy(events.dragStart)
      .zip(events.dragStart, within(START_DISTANCE))
      .filter(function(x){ return x; })
      .map(currentPoint.toProperty());

    return start
      .flatMapLatest(function(){
        return events.drag
          .map(constrain(target_line))
          .takeUntil(events.dragEnd);
      })
      .toProperty(target_line.start);
  });

  var lineEnd = currentPoint
    .combine(endPoint, within(0))
    .filter(function(x){ return x; })
    .take(1);

  var line = currentPoint
    .scan([], '.concat')
    .skip(1)
    .takeUntil(lineEnd);

  return {
    line:         line,
    
    startPoint:   startPoint,
    currentPoint: currentPoint
      .takeUntil(lineEnd),
    endPoint:     endPoint,
    target:       Bacon.constant(target_line),
    
    isDragging:   Bacon.mergeAll(
        events.dragStart.map(true),
        events.dragEnd.map(false)
      )
      .toProperty(false)
      .takeUntil(lineEnd),
    
    lineEnd:      lineEnd,
    end:          lineEnd
  };
}
function within(distance){
  return function(p1, p2){
    return V2.fromTo(p1, p2).magnitude() <= distance;
  };
}
function constrain(line){
  return function(point){
    var start = line.start;
    var end   = line.end;

    var a = V2.fromTo(start, point);
    var b = V2.fromTo(start, end);

    var dist = clamp(V2.dot(a,b) / V2.dot(b,b));
    var proj = S(dist).times(b);
    
    return start.offset(proj);
  };
}
function clamp(x){
  return x < 0 ? 0 : x > 1 ? 1 : x;
}


module.exports = lineController;