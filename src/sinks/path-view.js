'use strict';

function pathString(pts){
  return 'M' + pts.map(function(pt){
      return pt.x + ',' + pt.y;
    })
    .join('L');
}

//View
function pathView(layer, controller){
  controller.path
    .map(pathString)
    .onValue(function(points){
      layer.cut.attr('d', points);
    });

  controller.startPoint
    .onValue(function(point){
      layer.cut_start
        .attr('transform', 'translate(' + point.x + ',' + point.y + ')');
    });

  controller.currentPoint
    .onValue(function(point){
      layer.cut_end
        .attr('transform', 'translate(' + point.x + ',' + point.y + ')');
    });
}

module.exports = pathView;