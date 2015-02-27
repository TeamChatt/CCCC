'use strict';

var Bacon            = require('baconjs');
var cutoutController = require('./tasks/cutout-controller');


//Controller
function cardController(events, shape){
  var cutout_controller = retry(function(){
      return Bacon.once(cutoutController(events, shape));
    })
    .toProperty();

  return {
    cutout:  cutout_controller,
    end:     cutout_controller.endEvent()
  };
}
//Retry until the player gets a good-enough score
function retry(event){
  var first = event().delay(0);
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
  next.onValue(function(){});

  return first.concat(next);
}

module.exports = cardController;