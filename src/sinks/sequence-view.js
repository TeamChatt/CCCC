'use strict';

var dialogueView = require('./dialogue-view');
var cutoutView   = require('./cutout-view');

//View
function sequenceView(stage, controller){
  var type = controller.segment
    .map('.type');

  //Show/hide layers
  type
    .onValue(function(type){
      stage.dialogue.toggleClass('is-hidden', type !== 'dialogue');
    });
  type
    .onValue(function(type){
      stage.credits.toggleClass('is-hidden', type !== 'credits');
    });


  //Show scene
  controller.segment
    .filter(function(s){ return s.type === 'dialogue'; })
    .map('.controller')
    .onValue(function(dialogue_controller){
      dialogueView(stage.dialogue, dialogue_controller);
    });

  controller.segment
    .filter(function(s){ return s.type === 'cutout'; })
    .map('.controller')
    .onValue(function(cutout_controller){
      cutoutView(stage.desk, cutout_controller);
    });
}

module.exports = sequenceView;