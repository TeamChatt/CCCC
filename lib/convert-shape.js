'use strict';

var jsdom = require('jsdom');
var point = require('point-at-length');


var LENGTH_MIN = 1;
var LENGTH_MAX = 20;
var ERROR_MAX  = 2*2;

function polygonize(path){
  var len   = path.length();
  var start = path.at(0);
  var end   = path.at(len);
  var buf   = [];
  
  buf.push(start);
  subdivide(0, len, start, end, 200);

  function subdivide(l0, l1, p0, p1, maxdepth){
    var mid = [(p0[0]+p1[0])/2, (p0[1]+p1[1])/2];
    var l2  = (l0+l1)/2;
    var p2  = path.at(l2);

    var dx = mid[0] - p2[0];
    var dy = mid[1] - p2[1];

    if(
      (maxdepth > 0) &&
      (l1 - l0 > LENGTH_MIN) &&
      (
        (l1 - l0        > LENGTH_MAX) ||
        (dx*dx + dy*dy  > ERROR_MAX)
      )
    ) {
      subdivide(l0, l2, p0, p2, maxdepth-1);
      subdivide(l2, l1, p2, p1, maxdepth-1);
    } else {
      buf.push(p1);
    }
  }

  return buf;
}
function parsePoints(points){
  var pairs = points.trim().split('\n').join('').split(' ');
  return pairs.map(function(pair){
    return pair.split(',').map(function(coord){ return parseInt(coord, 10); });
  });
}


function parseBuffer(buf){
  var svg   = jsdom.jsdom(buf.toString());
  var shape = [];

  var path    = svg.querySelector('path');
  var polygon = svg.querySelector('polygon');
  
  if(path){
    var pathString = point(path.getAttribute('d'));
    shape          = polygonize(pathString);
  } else if(polygon){
    var polygonString = polygon.getAttribute('points');
    shape             = parsePoints(polygonString);
  }

  return new Buffer(JSON.stringify(shape));
}

module.exports = parseBuffer;