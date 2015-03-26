'use strict';

var Bacon = require('baconjs');


//Controller
function letterRevealController(events){
  var continue_ = Bacon.later(2000, {})
    .flatMap(function(){
      return events.cardClick;
    });

  return {
    end:  continue_.take(1),
  };
}


module.exports = letterRevealController;