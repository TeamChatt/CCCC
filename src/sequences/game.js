'use strict';

var sequenceController = require('../controllers/sequence-controller');

var ch01 = require('./ch01-intro');
var ch02 = require('./ch02-tutorial');
var ch03 = require('./ch03-valentines-day');
var ch04 = require('./ch04-spring');
var ch05 = require('./ch05-summer');
var ch06 = require('./ch06-fall');
var ch07 = require('./ch07-winter');
var ch08 = require('./ch08-visit');

var test = require('./test-sequence');


function gameSequence(events, env){
  function chapter(sequence){
    return function(){
      var segments = sequence(events, env);
      var c        = sequenceController(segments, 0);
      return {type: 'sequence', controller: c};
    };
  }

  return [
    chapter(ch01),
    chapter(ch02),
    chapter(ch03),
    chapter(ch04),
    chapter(ch05),
    chapter(ch06),
    chapter(ch07),
    chapter(ch08),
    chapter(test)
  ];
}


module.exports = gameSequence;