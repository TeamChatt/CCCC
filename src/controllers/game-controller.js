'use strict';

var Bacon = require('baconjs');

var menuController     = require('./menu-controller');
var sequenceController = require('./sequence-controller');
var gameSequence       = require('../sequences/game');


//Controller
function gameController(events, game_state){
  var isPaused = Bacon.mergeAll(
      events.pause.map(true),
      events.unpause.map(false)
    )
    .debounceImmediate(500)
    .toProperty(false);

  var sequence_controller = sequenceController(
      gameSequence(events),
      game_state
    );

  return {
    sequence: sequence_controller,
    menu:     menuController({ isPaused: isPaused }),
    progress: sequence_controller.progress
  };
}


module.exports = gameController;