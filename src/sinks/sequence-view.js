'use strict';

var dialogueView     = require('./dialogue-view');
var enrollmentView   = require('./enrollment-view');
var cutoutView       = require('./tasks/cutout-view');
var dragTemplateView = require('./tasks/drag-template-view');
var cardView         = require('./card-view');


//View
function sequenceView(stage, controller){
  //Show/hide layers
  var type = controller.segment
    .map('.type');

  var showEnrollment = type.map(function(t){ return t === 'enroll';   });
  var showDialogue   = type.map(function(t){ return t === 'dialogue'; });
  var showCredits    = type.map(function(t){ return t === 'credits';  });

  showEnrollment
    .not().onValue(stage.enrollment, 'toggleClass', 'is-hidden');
  showDialogue
    .not().onValue(stage.dialogue,   'toggleClass', 'is-hidden');
  showCredits
    .not().onValue(stage.credits,    'toggleClass', 'is-hidden');


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
  scene('enroll')
    .onValue(function(enrollment_controller){
      enrollmentView(stage.enrollment, enrollment_controller);
    });
  scene('dragTemplate')
    .onValue(function(drag_template_controller){
      dragTemplateView(stage.desk, drag_template_controller);
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