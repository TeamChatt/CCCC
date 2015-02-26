'use strict';

function autosave(controller){
  controller.game
    .delay(0)
    .flatMapLatest('.progress')
    .onValue(function(progress){
      localStorage.progress = progress;
    });
}


module.exports = autosave;