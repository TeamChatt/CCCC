'use strict';

var gameView = require('./game-view');


//View
function appView(stage, controller){
  controller.game
    .onValue(function(){
      stage.title.toggleClass('is-hidden', true);
    });
  controller.game
    .flatMapLatest('.end')
    .onValue(stage.reset);


  controller.game
    .onValue(gameView, stage);
}


module.exports = appView;