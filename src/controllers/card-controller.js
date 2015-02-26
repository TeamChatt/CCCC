'use strict';

var Bacon            = require('baconjs');
var cutoutController = require('./cutout-controller');


//Controller
function cardController(events, shape){
  var cutout_controller = retry(function(){
      return cutoutController(events, shape);
    })
    .toProperty();

  return {
    cutout:  cutout_controller,
    end:     cutout_controller.endEvent()
  };
}
function retry(event){
  var first = event();
  var next  = first
    .flatMapLatest(function(c){
      var success = c.success
        .flatMap(Bacon.never());
      var failure = c.failure
        .flatMap(function(){
          return retry(event);
        });
      return success.merge(failure);
    });

  return first.concat(next);
}

module.exports = cardController;