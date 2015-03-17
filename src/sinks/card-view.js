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
      dragTemplateView(layer, drag_template_controller);
    });

  task('cutout')
    .onValue(function(cutout_controller){
      cutoutView(layer, cutout_controller);
    });
}


module.exports = cardView;