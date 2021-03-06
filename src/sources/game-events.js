'use strict';

var Bacon   = require('baconjs');
var browser = require('../../lib/engine/core/browser');

var deskEvents       = require('./desk-events');
var enrollmentEvents = require('./enrollment-events');
var mailEvents       = require('./mail-events');
var dialogueEvents   = require('./dialogue-events');
var menuEvents       = require('./menu-events');
var titleEvents      = require('./title-events');
var creditsEvents    = require('./credits-events');


//Events
function gameEvents(stage){
  var desk_events       = deskEvents       (stage.desk);
  var enrollment_events = enrollmentEvents (stage.enrollment);
  var mail_events       = mailEvents       (stage.mail);
  var dialogue_events   = dialogueEvents   (stage.dialogue);
  var menu_events       = menuEvents       (stage.menu);
  var title_events      = titleEvents      (stage.title);
  var credits_events    = creditsEvents    (stage.credits);

  //Pause when the page loses focus too
  var blur = browser
    .visible
    .changes()
    .filter(function(x){ return !x; });
  var pause = Bacon.mergeAll(
      desk_events.pause,
      mail_events.pause,
      blur      
    )
    .debounceImmediate(500);

  return {
    pause:   pause,
    unpause: menu_events.resume,

    layers: {
      desk:       desk_events,
      enrollment: enrollment_events,
      mail:       mail_events,
      dialogue:   dialogue_events,
      menu:       menu_events,
      title:      title_events,
      credits:    credits_events
    }
  };
}

module.exports = gameEvents;