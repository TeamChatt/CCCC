'use strict';

//View
function dragTemplateView(layer, controller){
  //Set task type
  layer.attr('data-task', 'drag-template');

  layer.work_stack
    .toggleClass('is-hidden', false);
  layer.work_template
    .toggleClass('is-hidden', false)
    .attr('x', 760)
    .attr('y', 460);
  layer.template_target
    .toggleClass('is-hidden', false);

  controller.currentPosition
    .onValue(function(rect){
      layer.work_template
        .attr('x', rect.x)
        .attr('y', rect.y);
    });

  controller.isDragging
    .onValue(layer, 'toggleClass', 'is-dragging');

  controller.end
    .onValue(function(){
      layer.template_target .toggleClass('is-hidden', true);
      layer.work_template   .toggleClass('is-hidden', true);
      layer.paper           .toggleClass('is-hidden', false);
    });
}


module.exports = dragTemplateView;