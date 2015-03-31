'use strict';

var Bacon                  = require('baconjs');
var lineController         = require('./tasks/line-controller');
var letterRevealController = require('./tasks/letter-reveal-controller');

var P2 = require('../../lib/engine/core/vector').P2;

var ENVELOPE_LINE = {
  start: P2(147,160),
  end:   P2(827,160)
};

//Controller
function mailController(events){
  var task = openLetter().toProperty();

  //Cut along the line
  function openLetter(){
    var initial = {type: 'line', controller: lineController(events, ENVELOPE_LINE)};
    return transition(initial)
      .then('.controller.end', readLetter);
  }
  function readLetter(){
    var initial = {type: 'letterReveal', controller: letterRevealController(events)};
    return transition(initial)
      //TODO: then let the player read what their penpal wrote
      .then('.controller.end', function(){ return Bacon.never(); });
  }

  return {
    task: task,
    end:  task.endEvent()
  };
}
function transition(initial){
  function wrap(start, current){
    current.then = function(when, next){
      var becomes = start
        .flatMap(when)
        .flatMap(next);

      return wrap(start, current.merge(becomes));
    };
    return current;
  }

  var first = Bacon.once(initial).delay(0);
  return wrap(first, first);
}


module.exports = mailController;