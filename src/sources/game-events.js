'use strict';

var Bacon   = require('baconjs');
var browser = require('../../lib/engine/core/browser');

var deskEvents     = require('./desk-events');
var dialogueEvents = require('./dialogue-events');
var menuEvents     = require('./menu-events');


//Events
function gameEvents(stage){
  var desk_events   = deskEvents(stage.desk);
  var dialogue_events = dialogueEvents(stage.dialogue);
  var menu_events     = menuEvents(stage.menu);

  //Pause when the page loses focus too
  var blur = browser
    .visible
    .changes()
    .filter(function(x){ return !x; });
  var pause = Bacon.mergeAll(
      desk_events.pause,
      blur      
    )
    .debounceImmediate(500);

  return {
    pause:   pause,
    unpause: menu_events.resume,

    layers: {
      desk:     desk_events,
      dialogue: dialogue_events,
      menu:     menu_events
    }
  };
}

module.exports = gameEvents;