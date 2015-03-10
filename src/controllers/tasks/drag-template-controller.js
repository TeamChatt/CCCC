'use strict';

var Bacon = require('baconjs');
require('../../../lib/engine/core/util');

var V2    = require('../../../lib/engine/core/vector').V2;
var P2    = require('../../../lib/engine/core/vector').P2;


//Controller
function dragTemplateController(events){
  events.drag.onValue(function(){});
  events.dragEnd.onValue(function(){});

  var startPosition = Bacon.constant({
    x: 760,
    y: 460,
    w: 200,
    h: 180
  });
  
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
      .toProperty({
        x: 760,
        y: 460,
        w: 200,
        h: 180
      });
  });

  return {
    startPosition:   startPosition,
    currentPosition: currentPosition,
    end:             Bacon.never()
  };
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