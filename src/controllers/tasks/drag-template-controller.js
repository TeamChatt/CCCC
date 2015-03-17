'use strict';

var Bacon = require('baconjs');
require('../../../lib/engine/core/util');

var V2    = require('../../../lib/engine/core/vector').V2;
var P2    = require('../../../lib/engine/core/vector').P2;

var WORK_RECT     = {
  x: 778,
  y: 480,
  w: 172,
  h: 158
};
var ORIGINAL_RECT = {
  x: 10,
  y: 480,
  w: 172,
  h: 158
};
var TARGET_RECT   = {
  x: 280,
  y: 120,
  w: 400,
  h: 400
};

//Controller
function dragTemplateController(events){
  events.drag.onValue(function(){});
  events.dragEnd.onValue(function(){});

  var startPosition = Bacon.constant(WORK_RECT);
  
  var currentPosition = Bacon.fix(function(currentPosition){
    var start = currentPosition
      .sampledBy(events.dragStart)
      .zip(events.dragStart, withinRect)
      .filter(function(x){ return x; })
      .map(currentPosition.toProperty());

    return start
      .flatMapLatest(function(rect){
        return dragRect(rect, events.drag)
          .takeUntil(events.dragEnd);
      })
      .toProperty(WORK_RECT);
  });

  var templatePlaced = events.dragEnd
    .map(TARGET_RECT)
    .zip(currentPosition.map(centerPoint).sampledBy(events.dragEnd), withinRect)
    .filter(function(x){ return x; })
    .take(1);

  return {
    startPosition:   startPosition,
    currentPosition: currentPosition
      .takeUntil(templatePlaced),
    
    isDragging:   Bacon.mergeAll(
        events.dragStart.map(true),
        events.dragEnd.map(false)
      )
      .toProperty(false)
      .takeUntil(templatePlaced.delay(0)),

    end:             templatePlaced
  };
}
function centerPoint(rect){
  return P2(rect.x + rect.w/2, rect.y + rect.h/2);
}
function withinRect(rect, pt){
  var x_min = rect.x;
  var x_max = rect.x + rect.w;
  var y_min = rect.y;
  var y_max = rect.y + rect.h;

  return (pt.x < x_max) && (pt.x > x_min) &&
         (pt.y < y_max) && (pt.y > y_min);
}
function dragRect(rect, drag){
  return drag
    .take(1)
    .flatMapLatest(function(start_pt){
      var offset = V2.fromTo(start_pt, P2(rect.x, rect.y));

      return drag.map(function(point){
        var attachment_point = point.offset(offset);

        return {
          x: attachment_point.x,
          y: attachment_point.y,
          w: rect.w,
          h: rect.h
        };
      });
    });
}


module.exports = dragTemplateController;