'use strict';

var Bacon = require('baconjs');

var menuController     = require('./menu-controller');
var sequenceController = require('./sequence-controller');
var gameSequence       = require('../sequences/game');


//Controller
function gameController(events, game_state){
  var sequence_controller = sequenceController(
      gameSequence(events),
      game_state
    );

  var end = sequence_controller.end;

  var isPaused = Bacon.mergeAll(
      events.pause.map(true),
      events.unpause.map(false)
    )
    .debounceImmediate(500)
    .toProperty(false)
    .takeUntil(end);

  return {
    sequence: sequence_controller,
    menu:     menuController({ isPaused: isPaused }),
    progress: sequence_controller.progress,
    end:      end
  };
}


module.exports = gameController;