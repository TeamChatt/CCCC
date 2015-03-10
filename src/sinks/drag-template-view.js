'use strict';

//View
function dragTemplateView(layer, controller){
  layer.template_work
    .toggleClass('is-hidden', false)
    .attr('x', 760)
    .attr('y', 460);

  controller.currentPosition
    .onValue(function(rect){
      layer.template_work
        .attr('x', rect.x)
        .attr('y', rect.y);
    });

  controller.isDragging
    .onValue(layer, 'toggleClass', 'is-dragging');
}


module.exports = dragTemplateView;