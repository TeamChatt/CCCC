'use strict';

var P2 = require('../../lib/engine/core/vector').P2;


var WIDTH  = 960;
var HEIGHT = 640;

//Events
function mailEvents(layer){
  function toPosition(e){
    var bounds = layer[0].getBoundingClientRect();
    return P2(e.x * WIDTH / bounds.width, e.y * HEIGHT / bounds.height);
  }

  var start     = layer.pointerDownE();
  var drag      = layer.dragE();
  var end       = layer.pointerUpE();
  var mailClick = layer.penpal_envelope.pressE();
  
  return {
    pause:     layer.dblpressE(),
    mailClick: mailClick,
    dragStart: start.map(toPosition),
    drag:      drag.map(toPosition),
    dragEnd:   end.map(toPosition)
  };
}

module.exports = mailEvents;