'use strict';

var lineView = require('./tasks/line-view');


//View
function mailView(layer, controller){
  function task(type){
    return controller.task
      .filter(function(s){ return s.type === type; })
      .map('.controller');
  }

  task('line')
    .onValue(function(line_controller){
      lineView(layer, line_controller);
    });
}


module.exports = mailView;