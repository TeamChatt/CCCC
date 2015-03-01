'use strict';

var dialogueController = require('../controllers/dialogue-controller');
var cardController     = require('../controllers/card-controller');
var cutoutController   = require('../controllers/tasks/cutout-controller');
var creditsController  = require('../controllers/credits-controller');


function tasks(events){
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
    //Tutorial Objectives
    dragTemplate: taggedTask('fakeTask', fakeTask),
    startCut:     taggedTask('fakeTask', fakeTask),
    finishCut:    taggedTask('fakeTask', fakeTask),
    
    cut: taggedTask('cutout', function(shape){
        return cutoutController(events.layers.desk, shape);
      }),
    pause: taggedTask('pauseTask', function(){
        return {end: events.unpause.take(1)};
      }),

    //Game Objectives
    read: taggedTask('dialogue', function(lines){
        return dialogueController(events.layers.dialogue, lines);
      }),
    cutscene: taggedTask('fakeTask', fakeTask),
    card:     taggedTask('card', function(shape){
        return cardController(events.layers.desk, shape);
      }),
    rollCredits: taggedTask('credits', function(){
        return creditsController(events.layers.credits);
      })
  };
}


module.exports = tasks;