'use strict';

var Bacon = require('baconjs');
var flow  = require('../../flow');
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
function dragTemplateController(events, template_type){
  events.drag.onValue(function(){});
  events.dragEnd.onValue(function(){});

  var rect;
  switch(template_type){
  case 'work':
    rect = WORK_RECT;
    break;
  case 'original':
    rect = ORIGINAL_RECT;
    break;
  }

  var currentPosition = dragTemplate(events, rect).toProperty(rect);

  var templatePlaced = currentPosition
    .sampledBy(events.dragEnd)
    .map(function(rect){
      return P2(rect.x + rect.w/2, rect.y + rect.h/2); //Center point
    })
    .filter(withinRect, TARGET_RECT)
    .take(1);

  return {
    currentPosition: currentPosition
      .takeUntil(templatePlaced),
    
    isDragging:   Bacon.mergeAll(
        events.dragStart.map(true),
        events.dragEnd.map(false)
      )
      .toProperty(false)
      .takeUntil(templatePlaced.delay(0)),

    templateType:    Bacon.constant(template_type),

    end:             templatePlaced
  };
}
function dragTemplate(events, rect){
  //Transitions
  var startDrag = function(rect){
    return events.dragStart
      .filter(withinRect, rect)
      .map(rect);
  };
  var stopDrag = function(rect){
    return events.dragEnd
      .map(rect);
  };

  //States
  var awaitingDrag = function(rect){
    return flow.switcher(Bacon.once(rect))
      .then(startDrag, dragging);
  };
  var dragging = function(rect){
    return flow.switcher(dragRect(rect, events.drag))
      .then(stopDrag, awaitingDrag);
  };

  return awaitingDrag(rect);
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