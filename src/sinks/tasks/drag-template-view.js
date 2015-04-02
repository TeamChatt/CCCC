'use strict';

var Bacon = require('baconjs');


//View
function dragTemplateView(layer, controller){
  //Set task type
  layer.attr('data-task', 'drag-template');

  var stack    = controller.templateType
    .decode({
      'work':     Bacon.constant(layer.work_stack),
      'original': Bacon.constant(layer.original_stack)
    });
  var template = controller.templateType
    .decode({
      'work':     Bacon.constant(layer.work_template),
      'original': Bacon.constant(layer.original_template)
    });

  stack
    .onValue(function(stack){
      stack.toggleClass('is-hidden', false);
    });
  template
    .onValue(function(template){
      template.toggleClass('is-hidden', false);
    });

  Bacon.combineAsArray(
      template,
      controller.currentPosition
    )
    .onValues(function(template, rect){
      template
        .attr('x', rect.x)
        .attr('y', rect.y);
    });

  controller.isDragging
    .onValue(layer, 'toggleClass', 'is-dragging');

  controller.end
    .onValue(function(){
      layer.template_target   .toggleClass('is-hidden', true);
      layer.work_template     .toggleClass('is-hidden', true);
      layer.original_template .toggleClass('is-hidden', true);
      layer.paper             .toggleClass('is-hidden', false);
    });
}


module.exports = dragTemplateView;