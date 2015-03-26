'use strict';

var lineView         = require('./tasks/line-view');
var letterRevealView = require('./tasks/letter-reveal-view');


//View
function mailView(layer, controller){
  function task(type){
    return controller.task
      .filter(function(s){ return s.type === type; })
      .map('.controller');
  }

  task('line')
    .onValue(lineView, layer);

  task('letterReveal')
    .onValue(letterRevealView, layer);
}


module.exports = mailView;