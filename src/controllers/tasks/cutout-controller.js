'use strict';

var Bacon          = require('baconjs');
var pathController = require('./path-controller');
var union          = require('../../union');
var score          = require('../../score');

var SUCCESS_THRESHOLD = 0.5;

//Controller
function cutoutController(events, shape){
  var path_controller = pathController(events, shape[0]);

  var final_path = path_controller.pathEnd
    .map(path_controller.path);

  var final_score = final_path
    .map(toPolygon)
    .map(score, shape);


  return {
    overlap: final_path.map(toPolygon).map(union, shape),
    path:    path_controller,
    target:  Bacon.constant(shape),
    
    score:   final_score,
    success: final_score
      .filter(function(s){ return s > SUCCESS_THRESHOLD; }),
    failure: final_score
      .filter(function(s){ return s < SUCCESS_THRESHOLD; }),
    end:     path_controller.pathEnd
  };
}
function toPolygon(points){
  return points.map(function(p){
    return [p.x, p.y];
  });
}


module.exports = cutoutController;