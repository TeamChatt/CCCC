'use strict';

var cutoutController   = require('../controllers/tasks/cutout-controller');
var dialogueController = require('../controllers/dialogue-controller');

var lines_1 = require('../../include/script/tutorial/01-drag-template');
var lines_2 = require('../../include/script/tutorial/02-start-cutting');
var lines_3 = require('../../include/script/tutorial/03-trace-shape');
var lines_4 = require('../../include/script/tutorial/04-access-the-menu');
var lines_5 = require('../../include/script/tutorial/05-work-cards');
var lines_6 = require('../../include/script/tutorial/06-original-cards');
var lines_7 = require('../../include/script/tutorial/07-autosave');

var work_shape     = require('../../include/shapes/nye');
var original_shape = require('../../include/shapes/original_01');


function tutorialSequence(events){
  function read(ls){
    return function(){
      var c = dialogueController(events.layers.dialogue, ls);
      return {type: 'dialogue', controller: c};
    };
  }
  function dragTemplate(){
    return function(){
      var c = fakeTask(events);
      return {type: 'fakeTask', controller: c};
    };
  }
  function startCut(){
    return function(){
      var c = fakeTask(events);
      return {type: 'fakeTask', controller: c};
    };
  }
  function finishCut(){
    return function(){
      var c = fakeTask(events);
      return {type: 'fakeTask', controller: c};
    };
  }
  function cut(shape){
    return function(){
      var c = cutoutController(events.layers.desk, shape);
      return {type: 'cutout', controller: c};
    };
  }
  function pause(){
    return function(){
      var c = resumeObjective(events);
      return {type: 'pauseTask', controller: c};
    };
  }

  return [
    //Task 1:
    read(lines_1),
    dragTemplate(),
    //Task 2:
    read(lines_2),
    startCut(),
    //Task 3:
    read(lines_3),
    finishCut(),
    //Task 4:
    read(lines_4),
    pause(),
    //Task 5:
    read(lines_5),
    cut(work_shape),
    //Task 6:
    read(lines_6),
    dragTemplate(),
    cut(original_shape),
    //All done!
    read(lines_7)
  ];
}
function fakeTask(events){
  return {
    end: events.layers.desk.dragStart.take(1)
  };
}
function resumeObjective(events){
  return {
    end: events.unpause.take(1)
  };
}


module.exports = tutorialSequence;