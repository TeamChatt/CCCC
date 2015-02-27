'use strict';

var sequenceController = require('../controllers/sequence-controller');
var cardController     = require('../controllers/card-controller');
var dialogueController = require('../controllers/dialogue-controller');
var creditsController  = require('../controllers/credits-controller');

var tutorialSequence   = require('./tutorial');

var intro_lines        = require('../../include/script/00-intro');
var fake_lines         = require('../../include/script/01-test');

var original_shape_03  = require('../../include/shapes/original_03');
var original_shape_06  = require('../../include/shapes/original_06');


function gameSequence(events){
  function tutorial(){
    return function(){
      var segments = tutorialSequence(events);
      var c        = sequenceController(segments, 0);
      c.end.log('tutorial end:');
      return {type: 'sequence', controller: c};
    };
  }
  function read(lines){
    return function(){
      var c = dialogueController(events.layers.dialogue, lines);
      return {type: 'dialogue', controller: c};
    };
  }
  function card(shape){
    return function(){
      var c = cardController(events.layers.desk, shape);
      return {type: 'card', controller: c};
    };
  }
  function rollCredits(){
    return function(){
      var c = creditsController(events.layers.credits);
      return {type: 'credits', controller: c};
    };
  }

  return [
    //Introduction
    read(intro_lines),
    //Tutorial
    tutorial(),
    //Cut original card
    read(fake_lines),
    card(original_shape_03),
    //Cut original card
    read(fake_lines),
    card(original_shape_06),
    //All done!
    rollCredits()
  ];
}


module.exports = gameSequence;