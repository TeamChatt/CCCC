'use strict';

var Bacon = require('baconjs');
require('../lib/engine/core/util');

var V2    = require('../lib/engine/core/vector').V2;
var P2    = require('../lib/engine/core/vector').P2;
var S     = require('../lib/engine/core/vector').S;


var WIDTH           = 960;
var HEIGHT          = 640;
var SMOOVE_DISTANCE = 15;

//Events
function cutoutEvents(layer){
  return {
    pause:     layer.dblpressE(),
    pathStart: layer.asEventStream('mousedown'),
    pathDrag:  layer.dragE(),
    pathEnd:   layer.asEventStream('mouseup')
  };
}

//Controller
function cutoutController(events){
  events.pathDrag.onValue(function(){});
  
  function toPosition(e){
    var bounds = e.currentTarget.getBoundingClientRect();
    return P2(e.offsetX * WIDTH / bounds.width, e.offsetY * HEIGHT / bounds.height);
  }
  function pathString(pts){
    return 'M' + pts.map(function(pt){
        return pt.x + ',' + pt.y;
      })
      .join('L');
  }
  
  var targetPoint = events
    .pathDrag
    .map(toPosition);

  var currentPoint = events
    .pathStart
    .map(toPosition)
    .flatMapLatest(function(pt){
      return smoothPath(pt, targetPoint);
    });

  var path = currentPoint
    .scan([], '.concat')
    .map(pathString)
    .skip(1);

  return {
    path:    path,
    success: events.pathEnd
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

//View
function cutoutView(layer, controller){
  controller
    .path
    .onValue(function(points){
      layer.cut.attr('d', points);
    });
}

module.exports = {
  events:     cutoutEvents,
  controller: cutoutController,
  view:       cutoutView
};