'use strict';

var Bacon = require('baconjs');
require('../lib/engine/core/util');

var V2    = require('../lib/engine/core/vector').V2;
var P2    = require('../lib/engine/core/vector').P2;
var S     = require('../lib/engine/core/vector').S;


var WIDTH           = 960;
var HEIGHT          = 640;
var SMOOVE_DISTANCE = 15;
var START_DISTANCE  = 15;

//Events
function cutoutEvents(layer){
  function toPosition(e){
    var bounds = e.currentTarget.getBoundingClientRect();
    return P2(e.offsetX * WIDTH / bounds.width, e.offsetY * HEIGHT / bounds.height);
  }

  var start = layer.asEventStream('mousedown');
  var drag  = layer.dragE();
  var end   = layer.asEventStream('mouseup');

  return {
    pause:     layer.dblpressE(),
    dragStart: start.map(toPosition),
    drag:      drag.map(toPosition),
    dragEnd:   end.map(toPosition)
  };
}

//Controller
function cutoutController(events){
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
    .map(pathString)
    .takeUntil(pathEnd);

  return {
    path:         path,
    startPoint:   startPoint,
    currentPoint: currentPoint,
    dragging:     Bacon.mergeAll(
        events.dragStart.map(true),
        events.dragEnd.map(false)
      ),
    pathEnd:      pathEnd
  };
}
function within(distance){
  return function(p1, p2){
    return V2.fromTo(p1, p2).magnitude() < distance;
  };
}
function pathString(pts){
  return 'M' + pts.map(function(pt){
      return pt.x + ',' + pt.y;
    })
    .join('L');
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

//View
function cutoutView(layer, controller){
  controller
    .path
    .onValue(function(points){
      layer.cut.attr('d', points);
    });

  controller
    .startPoint
    .onValue(function(point){
      layer.cut_start
        .attr('cx', point.x)
        .attr('cy', point.y);
    });

  controller
    .currentPoint
    .onValue(function(point){
      layer.cut_end
        .attr('cx', point.x)
        .attr('cy', point.y);
    });

  controller.pathEnd.log();
}

module.exports = {
  events:     cutoutEvents,
  controller: cutoutController,
  view:       cutoutView
};