'use strict';

var Bacon          = require('baconjs');
var area           = require('area-polygon');
var polygonBoolean = require('2d-polygon-boolean');
var pathController = require('./path-controller');

var target         = require('../../include/shapes/test-shape');


//Controller
function cutoutController(events){
  var path_controller = pathController(events);

  var final_path = path_controller.path
    .sampledBy(path_controller.pathEnd);

  var score = final_path
    .map(toPolygon)
    .map(scorePolygon, target)
    .log('score: ');

  return {
    path:   path_controller,
    target: Bacon.constant(target),
    overlap: final_path.map(toPolygon).map(getOverlap, target),

    score:  score,
    end:    path_controller.pathEnd
  };
}
function toPolygon(points){
  return points.map(function(p){
    return [p.x, p.y];
  });
}
function scorePolygon(target, polygon){
  var target_area  = area(target);
  var polygon_area = area(polygon);
  var overlap_area = area(getOverlap(target, polygon));

  console.log(overlap_area);

  return area(polygon);
}
function getOverlap(polygon1, polygon2){
  var overlap = polygonBoolean(
    polygon1.slice(0).reverse(),
    polygon2.slice(0).reverse(),
    'and');

  console.log(overlap);

  return overlap[0];
}


module.exports = cutoutController;