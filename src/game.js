'use strict';

var Bacon   = require('baconjs');
var browser = require('../lib/engine/core/browser');

var lines    = require('./script/00-intro');
var cutout   = require('./cutout');
var dialogue = require('./dialogue');
var menu     = require('./menu');


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
      cutout:   cutout_events,
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

  return {
    dialogue: dialogue.controller(events.layers.dialogue, lines),
    cutout:   cutout.controller(events.layers.cutout),
    menu:     menu.controller({ isPaused: isPaused })
  };
}

//View
function gameView(stage, controller){
  dialogue.view(stage.dialogue, controller.dialogue);
  cutout.view(stage.desk,       controller.cutout);
  menu.view(stage.menu,         controller.menu);
}

module.exports = {
  events:     gameEvents,
  controller: gameController,
  view:       gameView
};