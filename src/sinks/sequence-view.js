'use strict';

var dialogueView     = require('./dialogue-view');
var enrollmentView   = require('./enrollment-view');
var cutoutView       = require('./tasks/cutout-view');
var dragTemplateView = require('./tasks/drag-template-view');
var lineView         = require('./tasks/line-view');
var cardView         = require('./card-view');
var mailView         = require('./mail-view');


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
    .onValue(dialogueView, stage.dialogue);
  scene('enroll')
    .onValue(enrollmentView, stage.enrollment);
  scene('dragTemplate')
    .onValue(dragTemplateView, stage.desk);
  scene('line')
    .onValue(lineView, stage.desk);
  scene('cutout')
    .onValue(cutoutView, stage.desk);
  scene('card')
    .onValue(cardView, stage.desk);
  scene('mail')
    .onValue(mailView, stage.desk);
  scene('sequence')
    .onValue(sequenceView, stage);
}


module.exports = sequenceView;