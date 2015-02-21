'use strict';

var area  = require('area-polygon');
var union = require('./union');


function score(target, polygon){
  var target_area  = area(target);
  var polygon_area = area(polygon);
  var overlap_area = area(union(target, polygon));
  var error        = target_area + polygon_area - overlap_area;

  //How closely does the polygon match the target.
  //0 is a perfect score.
  return error/target_area;
}


module.exports = score;