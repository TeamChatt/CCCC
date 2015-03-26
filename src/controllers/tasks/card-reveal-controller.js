'use strict';

var Bacon = require('baconjs');


//Controller
function cardRevealController(events, card_name){
  var continue_ = Bacon.later(2000, {})
    .flatMap(function(){
      return events.cardClick;
    });

  return {
    name: Bacon.constant(card_name),
    end:  continue_.take(1),
  };
}


module.exports = cardRevealController;