'use strict';

var Bacon = require('baconjs');


//Controller
function enrollmentController(events){
  var player_info = Bacon.combineTemplate({
    name:     events.name,
    pronoun:  events.pronoun,
    interest: events.interest
  });

  var done = player_info
    .map(function(info){
      return info.name && info.pronoun && info.interest;
    });

  return {
    player_info: player_info,
    done:        done,
    end:         events.submit
  };
}


module.exports = enrollmentController;