'use strict';

var Bacon = require('baconjs');
require('../../lib/engine/core/util');

var V2    = require('../../lib/engine/core/vector').V2;
var P2    = require('../../lib/engine/core/vector').P2;
var S     = require('../../lib/engine/core/vector').S;


var WIDTH           = 960;
var HEIGHT          = 640;
var SMOOVE_DISTANCE = 15;
var START_DISTANCE  = 15;

//Controller
function pathController(events){
  events.drag.onValue(function(){});
  events.dragEnd.onValue(function(){});

  var startPoint   = Bacon.constant(P2(WIDTH/2, HEIGHT/2));

  var currentPoint = Bacon.fix(function(currentPoint){
    var start = currentPoint
      .sampledBy(events.dragStart)
      .zip(events.dragStart, within(START_DISTANCE))
      .filter(function(x){ return x; })
      .map(currentPoint.toProperty());

    return start
      .flatMapLatest(function(pt){
        return smoothPath(pt, events.drag)
          .takeUntil(events.dragEnd);
      })
      .toProperty(P2(WIDTH/2, HEIGHT/2));
  });

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
    currentPoint: currentPoint,
    dragging:     Bacon.mergeAll(
        events.dragStart.map(true),
        events.dragEnd.map(false)
      ),
    pathEnd:      pathEnd,
    end:          pathEnd
  };
}
function within(distance){
  return function(p1, p2){
    return V2.fromTo(p1, p2).magnitude() < distance;
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
  });
}


module.exports = pathController;