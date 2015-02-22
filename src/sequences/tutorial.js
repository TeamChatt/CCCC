'use strict';

var cutoutController   = require('../controllers/cutout-controller');
var dialogueController = require('../controllers/dialogue-controller');


function tutorialSequence(events){
  function read(ls){
    return function(){
      var c = dialogueController(events.layers.dialogue, ls);
      return {type: 'dialogue', controller: c};
    };
  }
  function dragTemplate(){}
  function startCut(){}
  function finishCut(){}
  function cut(){
    return function(){
      var c = cutoutController(events.layers.desk);
      return {type: 'cutout', controller: c};
    };
  }
  function pause(){}

  return [
    //Task 1:
    read(),
    dragTemplate(),
    //Task 2:
    read(),
    startCut(),
    //Task 3:
    read(),
    finishCut(),
    //Task 4:
    read(),
    pause(),
    //Task 5:
    read(),
    cut(),
    //Task 6:
    read(),
    cut(),
    //All done!
    read()
  ];
}


module.exports = tutorialSequence;