'use strict';

var Bacon   = require('baconjs');

var menuController     = require('./menu');
var sequenceController = require('./sequence');


//Controller
function gameController(events){
  var isPaused = Bacon.mergeAll(
      events.pause.map(true),
      events.unpause.map(false)
    )
    .debounceImmediate(500)
    .toProperty(false);

  var start               = parseInt(localStorage['progress'], 10);
  var sequence_controller = sequenceController(events, start);

  return {
    sequence: sequence_controller,
    menu:     menuController({ isPaused: isPaused }),
    progress: sequence_controller.progress
  };
}


module.exports = gameController;