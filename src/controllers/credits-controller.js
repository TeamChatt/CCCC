'use strict';

var Bacon = require('baconjs');


//Controller
function creditsController(events){
  return {
    end: Bacon.later(1000, {})
      .flatMap(function(){ return events.next; })
      .take(1)
  };
}


module.exports = creditsController;