'use strict';

var Bacon = require('baconjs');

var gameController = require('./game-controller');


//Controller
function appController(events){
  var game_state = Bacon.mergeAll(
      events.layers.title
        .new_
        .map(0),
      events.layers.title
        .continue_
        .map(function(){
          return parseInt(localStorage.progress, 10) || 0;
        })
    );

  var game_controller = game_state
    .map(function(state){
      return gameController(events, state);
    });

  return {
    game: game_controller
  };
}


module.exports = appController;