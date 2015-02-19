'use strict';

function autosaveView(layer, progress){
  progress
    .onValue(function(){
      layer.autosave_icon.toggleClass('is-hidden', false);
    });

  progress
    .delay(2000)
    .onValue(function(){
      layer.autosave_icon.toggleClass('is-hidden', true);
    });
}

module.exports = autosaveView;