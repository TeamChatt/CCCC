'use strict';

var Bacon = require('baconjs');
var flow  = require('../../flow');
require('../../../lib/engine/core/util');

var V2    = require('../../../lib/engine/core/vector').V2;
var S     = require('../../../lib/engine/core/vector').S;


var START_DISTANCE  = 15;

//Controller
function lineController(events, target_line){
  events.drag.onValue(function(){});
  events.dragEnd.onValue(function(){});

  var startPoint   = Bacon.constant(target_line.start);
  var currentPoint = dragPoint(events, target_line.start, target_line)
    .toProperty(target_line.start);

  var lineEnd = currentPoint
    .filter(within(0), target_line.end)
    .take(1);

  var line = currentPoint
    .scan([], '.concat')
    .skip(1)
    .takeUntil(lineEnd);

  return {
    startPoint:   startPoint,
    currentPoint: currentPoint
      .takeUntil(lineEnd),
      
    line:         line,
    target:       Bacon.constant(target_line),
    
    isDragging:   Bacon.mergeAll(
        events.dragStart.map(true),
        events.dragEnd.map(false)
      )
      .toProperty(false)
      .takeUntil(lineEnd),
    
    end:          lineEnd
  };
}
function dragPoint(events, point, target_line){
  //Transitions
  var startDrag = function(point){
    return events.dragStart
      .filter(within(START_DISTANCE), point);
  };
  var stopDrag = function(){
    return events.dragEnd;
  };

  //States
  var awaitingDrag = function(point){
    return flow.switcher(Bacon.once(point))
      .then(startDrag, dragging);
  };
  var dragging = function(){
    var drag = events.drag
      .map(constrain(target_line));

    return flow.switcher(drag)
      .then(stopDrag, awaitingDrag);
  };

  return awaitingDrag(point);
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