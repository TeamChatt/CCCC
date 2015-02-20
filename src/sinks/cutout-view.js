'use strict';

var pathView = require('./path-view');

function toPath(polygon){
  return polygon.map(function(v){
    return {x: v[0], y: v[1]};
  });
}
function pathString(pts){
  return 'M' + pts.map(function(pt){
      return pt.x + ',' + pt.y;
    })
    .join('L');
}
//View
function cutoutView(layer, controller){
  pathView(layer, controller.path);

  controller.target
    .map(toPath)
    .map(pathString)
    .onValue(function(path){
      layer.target.attr('d', path);
    });

  controller.overlap
    .map(toPath)
    .map(pathString)
    .onValue(function(path){
      layer.overlap.attr('d', path);
    });
}

module.exports = cutoutView;