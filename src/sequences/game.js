'use strict';

var cutoutController   = require('../controllers/cutout-controller');
var dialogueController = require('../controllers/dialogue-controller');
var creditsController  = require('../controllers/credits-controller');

var lines0 = require('../../include/script/00-intro');
var lines1 = require('../../include/script/01-test');

var original_shape_01 = require('../../include/shapes/original_01');
var original_shape_03 = require('../../include/shapes/original_03');
var original_shape_06 = require('../../include/shapes/original_06');


function gameSequence(events){
  function read(lines){
    return function(){
      var c = dialogueController(events.layers.dialogue, lines);
      return {type: 'dialogue', controller: c};
    };
  }
  function cut(shape){
    return function(){
      var c = cutoutController(events.layers.desk, shape);
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
    cut(original_shape_01),
    read(lines1),
    cut(original_shape_03),
    read(lines1),
    cut(original_shape_06),
    rollCredits()
  ];
}


module.exports = gameSequence;