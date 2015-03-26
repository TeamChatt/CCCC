'use strict';

var Bacon = require('baconjs');


//Controller
function cardRevealController(events){
  var continue_ = Bacon.later(2000, {})
    .flatMap(function(){
      return events.cardClick;
    });

  return {
    end: continue_.take(1)
  };
}


module.exports = cardRevealController;