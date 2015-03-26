'use strict';

var tasks = require('./tasks');

var lines_01 = require('../../include/script/ch02-tutorial/pt01');
var lines_02 = require('../../include/script/ch02-tutorial/pt02');
var lines_03 = require('../../include/script/ch02-tutorial/pt03');
var lines_04 = require('../../include/script/ch02-tutorial/pt04');
var lines_05 = require('../../include/script/ch02-tutorial/pt05');
var lines_06 = require('../../include/script/ch02-tutorial/pt06');
var lines_07 = require('../../include/script/ch02-tutorial/pt07');
var lines_08 = require('../../include/script/ch02-tutorial/pt08');
var lines_09 = require('../../include/script/ch02-tutorial/pt09');
var lines_10 = require('../../include/script/ch02-tutorial/pt10');


function tutorialSequence(events, env){
  var t = tasks(events, env);

  return [
    //Task 1:
    t.read(lines_01),
    t.cutscene(),
    t.read(lines_02),
    t.dragTemplate(),
    //Task 2:
    t.read(lines_03),
    t.startCut(),
    //Task 3:
    t.read(lines_04),
    t.finishCut(),
    //Task 4:
    t.read(lines_05),
    t.pause(),
    //Task 5:
    t.read(lines_06),
    t.cut('tutorial_01'),
    //Task 6:
    t.read(lines_07),
    t.dragTemplate(),
    //Task 7:
    t.read(lines_08),
    t.card('original_01'), //TODO: which card?
    //All done!
    t.read(lines_09),
    t.cutscene(),
    t.read(lines_10)
  ];
}


module.exports = tutorialSequence;