'use strict';

var Bacon = require('baconjs');
require('../lib/engine/core/util');

var lines0   = require('../include/script/00-intro');
var lines1   = require('../include/script/01-test');
var cutout   = require('./cutout');
var dialogue = require('./dialogue');


//Controller
function sequenceController(events, start){
  var segments = gameSequence(events).slice(start);

  function runSequence(seq){
    var head = sequence(seq[0]());
    var tail = seq.slice(1);

    return tail.reduce(function(initial, next){
      return initial.then('.controller.end', next);
    }, head);
  }

  var segment  = runSequence(segments);
  var progress = segment.count()
    .map(function(x){ return x+start-1; });

  return {
    segment:  segment,
    progress: progress
  };
}
function gameSequence(events){
  function read(ls){
    return function(){
      var c = dialogue.controller(events.layers.dialogue, ls);
      return {type: 'dialogue', controller: c};
    };
  }
  function cut(){
    return function(){
      var c = cutout.controller(events.layers.desk);
      return {type: 'cutout', controller: c};
    };
  }
  return [
    read(lines0),
    cut(),
    read(lines1),
    cut(),
    read(lines1)
  ];
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