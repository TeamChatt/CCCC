'use strict';

var Bacon                  = require('baconjs');
var dragTemplateController = require('./tasks/drag-template-controller');
var cutoutController       = require('./tasks/cutout-controller');


//Controller
function cardController(events, shape){
  var task = dragTemplate(3).toProperty();

  //Drag template, then cutout shape, rinse, repeat
  function dragTemplate(n){
    var initial = {type: 'dragTemplate', controller: dragTemplateController(events)};
    return transition(initial)
      .then('.controller.end', function(){ return cutout(n); });
  }
  function cutout(n){
    var initial = {type: 'cutout', controller: cutoutController(events, shape)};
    var next    = (n === 1)                     ?
      function(){ return Bacon.never(); }       :
      function(){ return dragTemplate(n-1); };

    return transition(initial)
      .then('.controller.success', next)
      .then('.controller.failure', function(){ return cutout(n); });
  }

  return {
    task: task,
    end:  task.endEvent()
  };
}
function transition(initial){
  function wrap(start, current){
    current.then = function(when, next){
      var becomes = start
        .flatMap(when)
        .flatMap(next);

      return wrap(start, current.merge(becomes));
    };
    return current;
  }

  var first = Bacon.once(initial).delay(0);
  return wrap(first, first);
}


module.exports = cardController;