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


  var enrollment  = sequence_controller.segment
    .delay(0)
    .flatMapLatest('.controller.segment')
    .filter(function(s){ return s.type === 'enroll'; })
    .map('.controller');
  
  var player_info = enrollment
    .flatMapLatest('.player_info')
    .sampledBy(enrollment.flatMapLatest('.end'))
    .log();

  return {
    sequence: {
      segment: sequence_controller.segment
        .delay(0)
        .flatMapLatest('.controller.segment')
        .toProperty()
    },
    menu:        menuController({ isPaused: isPaused }),
    player_info: player_info,
    progress:    sequence_controller.progress,
    end:         end
  };
}


module.exports = gameController;