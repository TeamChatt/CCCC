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
    .onValue(dragTemplateView, layer);

  task('cutout')
    .onValue(cutoutView, layer);


  task('cutout')
    .flatMap('.end')
    .onValue(function(){
      layer.paper.toggleClass('is-hidden', true);
    });


  //Clean up when we're done
  controller
    .end
    .onValue(layer.reset);
}


module.exports = cardView;