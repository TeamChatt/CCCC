'use strict';

var dialogueView = require('./dialogue-view');
var cutoutView   = require('./cutout-view');
var cardView     = require('./card-view');
var creditsView  = require('./credits-view');


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
  function scene(type){
    return controller.segment
      .filter(function(s){ return s.type === type; })
      .map('.controller');
  }

  scene('dialogue')
    .onValue(function(dialogue_controller){
      dialogueView(stage.dialogue, dialogue_controller);
    });
  scene('credits')
    .onValue(function(credits_controller){
      creditsView(stage.credits, credits_controller);
    });
  scene('cutout')
    .onValue(function(cutout_controller){
      cutoutView(stage.desk, cutout_controller);
    });
  scene('card')
    .onValue(function(card_controller){
      cardView(stage.desk, card_controller);
    });
  scene('sequence')
    .onValue(function(sequence_controller){
      sequenceView(stage, sequence_controller);
    });
}


module.exports = sequenceView;