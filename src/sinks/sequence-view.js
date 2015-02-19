'use strict';

var dialogueView = require('./dialogue-view');
var cutoutView   = require('./cutout-view');

//View
function sequenceView(stage, controller){
  controller
    .segment
    .map('.type')
    .onValue(function(type){
      stage.dialogue.toggleClass('is-hidden', type !== 'dialogue');
    });

  controller
    .segment
    .filter(function(s){ return s.type === 'dialogue'; })
    .map('.controller')
    .onValue(function(dialogue_controller){
      dialogueView(stage.dialogue, dialogue_controller);
    });

  controller
    .segment
    .filter(function(s){ return s.type === 'cutout'; })
    .map('.controller')
    .onValue(function(cutout_controller){
      cutoutView(stage.desk, cutout_controller);
    });  
}

module.exports = sequenceView;