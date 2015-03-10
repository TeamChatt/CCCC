'use strict';

//View
function dragTemplateView(layer, controller){
  controller.currentPosition
    .onValue(function(rect){
      layer.cut_end
        .attr('transform', 'translate(' + rect.x + ',' + rect.y + ')');
    });
}


module.exports = dragTemplateView;