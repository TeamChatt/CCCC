'use strict';

var P2 = require('../../lib/engine/core/vector').P2;


var WIDTH  = 960;
var HEIGHT = 640;

//Events
function deskEvents(layer){
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

module.exports = deskEvents;