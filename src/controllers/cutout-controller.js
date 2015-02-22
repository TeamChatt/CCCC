'use strict';

var Bacon          = require('baconjs');
var pathController = require('./path-controller');
var union          = require('../union');
var score          = require('../score');


//Controller
function cutoutController(events, shape){
  var path_controller = pathController(events);

  var final_path = path_controller.path
    .sampledBy(path_controller.pathEnd);

  var final_score = final_path
    .map(toPolygon)
    .map(score, shape);

  return {
    overlap: final_path.map(toPolygon).map(union, shape),
    path:    path_controller,
    target:  Bacon.constant(shape),
    score:   final_score,
    end:     path_controller.pathEnd
  };
}
function toPolygon(points){
  return points.map(function(p){
    return [p.x, p.y];
  });
}


module.exports = cutoutController;