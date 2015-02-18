'use strict';

var Bacon   = require('baconjs');

var menu     = require('./menu');
var sequence = require('./sequence');


//Controller
function gameController(events){
  var isPaused = Bacon.mergeAll(
      events.pause.map(true),
      events.unpause.map(false)
    )
    .debounceImmediate(500)
    .toProperty(false);

  var start = parseInt(localStorage['progress'], 10);
  var sequenceController = sequence.controller(events, start);

  return {
    sequence: sequenceController,
    menu:     menu.controller({ isPaused: isPaused }),
    progress: sequenceController.progress
  };
}


module.exports = {
  controller: gameController
};