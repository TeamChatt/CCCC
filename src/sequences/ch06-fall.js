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
    t.cutscene(),      //TODO: Work card
    t.read(lines_02),
    t.cutscene(),      //TODO: Work card (with timer)
    t.read(lines_03),
    t.cutscene(),      //TODO: Work card
    t.read(lines_04),
    t.cutscene(),      //TODO: Original card
    t.cutscene()       //TODO: Work card
  ];
}


module.exports = fallSequence;