'use strict';

var Bacon = require('baconjs');
require('../lib/engine/core/util');

var lines0   = require('./script/00-intro');
var lines1   = require('./script/01-test');
var cutout   = require('./cutout');
var dialogue = require('./dialogue');


//Controller
function sequenceController(events){
  function read(ls){
    return {
      type:       'dialogue',
      controller: dialogue.controller(events.layers.dialogue, ls)
    };
  }
  function cut(){
    return {
      type:       'cutout',
      controller: cutout.controller(events.layers.cutout)
    };
  }

  var segment = sequence(read(lines0))
    .then('.controller.end',     function(){ return cut(); })
    .then('.controller.pathEnd', function(){ return read(lines1); })
    .then('.controller.end',     function(){ return cut(); })
    .then('.controller.pathEnd', function(){ return read(lines1); });

  return {
    segment: segment
  };
}
function sequence(initial){
  function wrap(event){
    event.then = function(when, next){
      var becomes = event
        .take(1)
        .flatMap(when)
        .map(function(){ return next(); });

      return wrap(event
        .toEventStream()
        .concat(becomes)
        .toProperty()
      );
    };
    return event;
  }

  return wrap(Bacon.constant(initial));
}


//View
function sequenceView(stage, controller){
  controller
    .segment
    .filter(function(s){ return s.type === 'dialogue'; })
    .map('.controller')
    .onValue(function(dialogue_controller){
      dialogue.view(stage.dialogue, dialogue_controller);
    });

  controller
    .segment
    .filter(function(s){ return s.type === 'cutout'; })
    .map('.controller')
    .onValue(function(cutout_controller){
      cutout.view(stage.desk, cutout_controller);
    });  
}

module.exports = {
  controller: sequenceController,
  view:       sequenceView
};