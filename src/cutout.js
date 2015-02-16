'use strict';

var V2 = require('../lib/engine/core/vector').V2;
var P2 = require('../lib/engine/core/vector').P2;
var S  = require('../lib/engine/core/vector').S;


var SMOOVE_DISTANCE = 25;

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
  
  function pathString(pts){
    return 'M' + pts.map(function(pt){
        return pt.x + ',' + pt.y;
      })
      .join('L');
  }
  function moveTowards(current,target){
    var direction = V2.fromTo(current, target);
    var magnitude = direction.magnitude();
    
    if(magnitude > SMOOVE_DISTANCE){
      var d2 = direction.normalize().times(S(magnitude - SMOOVE_DISTANCE));
      return current.offset(d2);
    } else {
      return current;
    }
  }
  
  var targetPoint = events
    .pathDrag
    .map(function(e){ return P2(e.offsetX, e.offsetY); });

  var currentPoint = events
    .pathStart
    .map(function(e){ return P2(e.offsetX, e.offsetY); })
    .flatMapLatest(function(pt){
      return targetPoint
        .scan(pt, moveTowards)
        .skipDuplicates(P2.equals);
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