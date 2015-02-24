'use strict';

var polygonBoolean = require('2d-polygon-boolean');


//A simple wrapper around boolean polygon
//that can handle different winding directions.
function union(polygon1, polygon2){
  var fwd  = polygonBoolean(
    polygon1,
    polygon2,
    'or');
  var bkwd = polygonBoolean(
    polygon1,
    polygon2.slice(0).reverse(),
    'or');

  var ret = (fwd.length === 1) ? fwd[0] : bkwd[0];
  return ret || [];
}


module.exports = union;