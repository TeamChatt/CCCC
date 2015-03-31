'use strict';

function pathString(pts){
  return 'M' + pts.map(function(pt){
      return pt.x + ',' + pt.y;
    })
    .join('L');
}

//View
function lineView(layer, controller){
  //Reset path
  layer.cut.attr('d',  '');

  //Set task type
  layer.attr('data-task', 'cutout');

  controller.line
    .map(pathString)
    .onValue(function(points){
      layer.cut.attr('d', points);
    });

  controller.target
    .onValue(function(line){
      layer.cut_target.attr('d', pathString([line.start, line.end]));
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

  controller.isDragging
    .onValue(layer, 'toggleClass', 'is-dragging');
}


module.exports = lineView;