'use strict';

function pathString(pts){
  return 'M' + pts.map(function(pt){
      return pt.x + ',' + pt.y;
    })
    .join('L');
}

//View
function pathView(layer, controller){
  //Reset path
  layer.cut.attr('d',  '');

  controller.path
    .map(pathString)
    .onValue(layer.cut, 'attr', 'd');

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

  controller.isDragging
    .onValue(layer, 'toggleClass', 'is-dragging');

  controller.isClose
    .onValue(layer, 'toggleClass', 'is-close');
}


module.exports = pathView;