'use strict';

var sequenceController = require('../controllers/sequence-controller');

var ch01 = require('./ch01-intro');
var ch02 = require('./ch02-tutorial');
var ch03 = require('./fakechapter');


function gameSequence(events){
  function chapter(sequence){
    return function(){
      var segments = sequence(events);
      var c        = sequenceController(segments, 0);
      return {type: 'sequence', controller: c};
    };
  }

  return [
    chapter(ch01),
    chapter(ch02),
    chapter(ch03)
  ];
}


module.exports = gameSequence;