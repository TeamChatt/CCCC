'use strict';

var dialogueController     = require('../controllers/dialogue-controller');
var enrollmentController   = require('../controllers/enrollment-controller');
var cardController         = require('../controllers/card-controller');
var mailController         = require('../controllers/mail-controller');
var cutoutController       = require('../controllers/tasks/cutout-controller');
var dragTemplateController = require('../controllers/tasks/drag-template-controller');
var creditsController      = require('../controllers/credits-controller');

var shapes = require('./shapes');


function tasks(events, env){
  function fakeTask(){
    return {
      end: events.layers.desk.dragStart.take(1)
    };
  }
  function taggedTask(tagname, objective){
    return function(){
      var args = Array.prototype.slice.call(arguments);
      return function(){
        return {type: tagname, controller: objective.apply(this, args)};
      };
    };
  }


  return {
    //Intro Objectives
    enroll:       taggedTask('enroll', function(){
        return enrollmentController(events.layers.enrollment);
      }),

    //Tutorial Objectives
    dragTemplate: taggedTask('dragTemplate', function(){
        return dragTemplateController(events.layers.desk, 'work');
      }),
    startCut:     taggedTask('fakeTask', fakeTask),
    finishCut:    taggedTask('fakeTask', fakeTask),
    
    cut:          taggedTask('cutout', function(shape_name){
        var shape = shapes[shape_name];
        return cutoutController(events.layers.desk, shape);
      }),
    pause:        taggedTask('pauseTask', function(){
        return {end: events.unpause.take(1)};
      }),

    //Game Objectives
    read:         taggedTask('dialogue', function(lines){
        return dialogueController(events.layers.dialogue, env, lines);
      }),
    mail:         taggedTask('mail', function(){
        return mailController(events.layers.mail);
      }),
    cutscene:     taggedTask('fakeTask', fakeTask),
    card:         taggedTask('card', function(card_type, shape_name){
        var shape = shapes[shape_name];
        var card  = {name: shape_name, shape: shape};
        return cardController(events.layers.desk, card_type, card);
      }),
    rollCredits:  taggedTask('credits', function(){
        return creditsController(events.layers.credits);
      })
  };
}


module.exports = tasks;