'use strict';

var Bacon   = require('baconjs');
var browser = require('../lib/engine/core/browser');

var cutout   = require('./cutout');
var dialogue = require('./dialogue');
var menu     = require('./menu');
var sequence = require('./sequence');


//Events
function gameEvents(stage){
  var cutout_events   = cutout.events(stage.desk);
  var dialogue_events = dialogue.events(stage.dialogue);
  var menu_events     = menu.events(stage.menu);

  //Pause when the page loses focus too
  var blur = browser
    .visible
    .changes()
    .filter(function(x){ return !x; });
  var pause = Bacon.mergeAll(
      cutout_events.pause,
      blur      
    )
    .debounceImmediate(500);

  return {
    pause:   pause,
    unpause: menu_events.resume,

    layers: {
      desk:     cutout_events,
      dialogue: dialogue_events,
      menu:     menu_events
    }
  };
}

//Controller
function gameController(events){
  var isPaused = Bacon.mergeAll(
      events.pause.map(true),
      events.unpause.map(false)
    )
    .debounceImmediate(500)
    .toProperty(false);

  var sequenceController = sequence.controller(events, 0);

  return {
    sequence: sequenceController,
    menu:     menu.controller({ isPaused: isPaused }),
    progress: sequenceController.progress
  };
}

//View
function gameView(stage, controller){
  sequence.view(stage,  controller.sequence);
  menu.view(stage.menu, controller.menu);

  controller.progress.log();
}

module.exports = {
  events:     gameEvents,
  controller: gameController,
  view:       gameView
};