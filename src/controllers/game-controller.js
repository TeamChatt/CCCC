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


  var segment = new Bacon.Bus();
  
  var enrollment  = segment
    .filter(function(s){ return s.type === 'enroll'; })
    .map('.controller');
  var player_info = enrollment
    .flatMap('.player_info')
    .sampledBy(enrollment.flatMap('.end'))
    .toProperty(game_state.player_info);

  var sequence_controller = sequenceController(
      gameSequence(events, player_info),
      game_state.chapter
    );
  segment.plug(
    sequence_controller.segment
      .delay(0)
      .flatMapLatest('.controller.segment')
    );


  var end = sequence_controller.end;


  return {
    sequence: {
      segment: segment.toProperty()
    },
    menu:        menuController({ isPaused: isPaused.takeUntil(end) }),
    progress:    Bacon.combineTemplate({
      chapter:     sequence_controller.progress,
      player_info: player_info
    }),
    end:         end
  };
}


module.exports = gameController;