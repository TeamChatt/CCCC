'use strict';

var cutoutController   = require('../controllers/cutout-controller');
var dialogueController = require('../controllers/dialogue-controller');
var creditsController  = require('../controllers/credits-controller');
var lines0 = require('../../include/script/00-intro');
var lines1 = require('../../include/script/01-test');


function gameSequence(events){
  function read(ls){
    return function(){
      var c = dialogueController(events.layers.dialogue, ls);
      return {type: 'dialogue', controller: c};
    };
  }
  function cut(){
    return function(){
      var c = cutoutController(events.layers.desk);
      return {type: 'cutout', controller: c};
    };
  }
  function rollCredits(){
    return function(){
      var c = creditsController(events.layers.credits);
      return {type: 'credits', controller: c};
    };
  }

  return [
    read(lines0),
    cut(),
    read(lines1),
    cut(),
    read(lines1),
    rollCredits()
  ];
}


module.exports = gameSequence;