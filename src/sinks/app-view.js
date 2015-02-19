'use strict';

var gameView = require('./game-view');

//View
function appView(stage, controller){
  controller.game
    .onValue(function(){
      stage.title.toggleClass('is-hidden', true);
    });

  controller.game
    .onValue(function(game_controller){
      gameView(stage, game_controller);
    });
}

module.exports = appView;