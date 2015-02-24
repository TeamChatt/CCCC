'use strict';

var dialogueView = require('./dialogue-view');
var cutoutView   = require('./cutout-view');

//View
function sequenceView(stage, controller){
  var type = controller.segment
    .map('.type');

  //Show/hide layers
  var showDialogue = type.map(function(t){ return t === 'dialogue'; });
  var showCredits  = type.map(function(t){ return t === 'credits';  });

  showDialogue
    .not().onValue(stage.dialogue, 'toggleClass', 'is-hidden');
  showCredits
    .not().onValue(stage.credits, 'toggleClass', 'is-hidden');

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

  controller.segment
    .filter(function(s){ return s.type === 'sequence'; })
    .map('.controller')
    .onValue(function(sequence_controller){
      sequenceView(stage, sequence_controller);
    });
}

module.exports = sequenceView;