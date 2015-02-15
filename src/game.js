'use strict';

var Bacon   = require('baconjs');
var browser = require('../lib/engine/core/browser');

var lines    = require('./dialogue/00-intro');
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
  return {
    paused: Bacon.mergeAll(
        events.pause.map(true),
        events.unpause.map(false)
      )
      .debounceImmediate(500)
      .toProperty(false)
  };
}

//View
function gameView(stage, controller){
  dialogue.view(
      stage.dialogue,
      dialogue.controller(
        dialogue.events(stage.dialogue),
        lines
      )
    );
  cutout.view(
      stage.desk,
      cutout.controller(
        cutout.events(stage.desk)
      )
    );
  menu.view(
      stage.menu,
      menu.controller(
        menu.events(stage.menu)
      ),
      controller
    );
}

module.exports = {
  events:     gameEvents,
  controller: gameController,
  view:       gameView
};