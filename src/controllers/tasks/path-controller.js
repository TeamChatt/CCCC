'use strict';

var Bacon = require('baconjs');
var flow  = require('../../flow');
require('../../../lib/engine/core/util');

var V2    = require('../../../lib/engine/core/vector').V2;
var P2    = require('../../../lib/engine/core/vector').P2;
var S     = require('../../../lib/engine/core/vector').S;


var SMOOVE_DISTANCE = 15;
var START_DISTANCE  = 15;
var CLOSE_DISTANCE  = 100;

//Controller
function pathController(events, start_point){
  events.drag.onValue(function(){});
  events.dragEnd.onValue(function(){});

  var point        = P2(start_point[0], start_point[1]);
  var startPoint   = Bacon.constant(point);
  var currentPoint = dragPoint(events, point)
    .toProperty(point);


  var isClose = currentPoint
    .combine(startPoint, within(CLOSE_DISTANCE))
    .changes()
    .skipDuplicates()
    .skip(1)
    .toProperty(false);

  var pathEnd = currentPoint
    .combine(startPoint, within(START_DISTANCE))
    .skipDuplicates()
    .skip(2) //Starts true, becomes false, becomes true again
    .take(1);

  var path = currentPoint
    .scan([], '.concat')
    .skip(1)
    .takeUntil(pathEnd);

  return {
    path:         path,
    startPoint:   startPoint,
    currentPoint: currentPoint
      .takeUntil(pathEnd),
    
    isClose:      isClose
      .takeUntil(pathEnd),
    isDragging:   Bacon.mergeAll(
        events.dragStart.map(true),
        events.dragEnd.map(false)
      )
      .toProperty(false)
      .takeUntil(pathEnd),
    pathEnd:      pathEnd
  };
}
function dragPoint(events, point){
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
  var dragging = function(point){
    var drag = smoothPath(point, events.drag)
      .toEventStream();
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
function smoothPath(start, target){
  return Bacon.fix(function(current){
    return current
      .delay(0)
      .combine(target, V2.fromTo)
      .filter(function(v){ return v.magnitude() > SMOOVE_DISTANCE; })
      .map(function(v){
        var magnitude = v.magnitude();
        return v.normalize().times(S(magnitude - SMOOVE_DISTANCE));
      })
      .scan(start, '.offset');
  })
  .skipDuplicates(P2.equals);
}


module.exports = pathController;