'use strict';

var tasks = require('./tasks');

var lines_01 = require('../../include/script/ch06-fall/pt01');
var lines_02 = require('../../include/script/ch06-fall/pt02');
var lines_03 = require('../../include/script/ch06-fall/pt03');
var lines_04 = require('../../include/script/ch06-fall/pt04');


function fallSequence(events, env){
  var t = tasks(events, env);

  return [
    t.read(lines_01),
    t.card('original', 'original_01'),      //TODO: is this the right card?
    t.read(lines_02),
    t.card('original', 'original_01'),      //TODO: timer. is this the right card?
    t.read(lines_03),
    t.card('original', 'original_01'),      //TODO: is this the right card?
    t.read(lines_04),
    t.card('work',     'christmas'),        //TODO: is this the right card?
    t.card('original', 'original_01')       //TODO: is this the right card?
  ];
}


module.exports = fallSequence;