'use strict';

function autosave(controller){
  controller.progress
    .onValue(function(progress){
      localStorage.progress = progress;
    });
}

module.exports = autosave;