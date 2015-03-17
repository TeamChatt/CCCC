'use strict';

var dragTemplateView = require('./tasks/drag-template-view');
var cutoutView       = require('./tasks/cutout-view');


//View
function cardView(layer, controller){
  function task(type){
    return controller.task
      .filter(function(s){ return s.type === type; })
      .map('.controller');
  }

  task('dragTemplate')
    .onValue(function(drag_template_controller){
      layer.attr('data-task', 'drag-template');
      dragTemplateView(layer, drag_template_controller);
    });

  task('cutout')
    .onValue(function(cutout_controller){
      layer.attr('data-task', 'cutout');
      cutoutView(layer, cutout_controller);
    });


  task('cutout')
    .flatMap('.end')
    .onValue(function(){
      layer.paper.toggleClass('is-hidden', true);
    });


  //Clean up when we're done
  controller
    .end
    .onValue(function(){
      layer.reset();
    });
}


module.exports = cardView;