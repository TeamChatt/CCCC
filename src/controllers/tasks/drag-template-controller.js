'use strict';

var Bacon = require('baconjs');
require('../../../lib/engine/core/util');

var V2    = require('../../../lib/engine/core/vector').V2;
var P2    = require('../../../lib/engine/core/vector').P2;
var S     = require('../../../lib/engine/core/vector').S;


var WIDTH           = 960;
var HEIGHT          = 640;
var START_DISTANCE  = 15;
var CLOSE_DISTANCE  = 100;

//Controller
function dragTemplateController(events){
  events.drag.onValue(function(){});
  events.dragEnd.onValue(function(){});

  var startPoint = Bacon.constant(P2(WIDTH/2, HEIGHT/2));

  return {
  };
}


module.exports = dragTemplateController;