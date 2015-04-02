'use strict';

var tasks = require('./tasks');

var lines_01 = require('../../include/script/ch03-valentines-day/pt01');
var lines_02 = require('../../include/script/ch03-valentines-day/pt02');
var lines_03 = require('../../include/script/ch03-valentines-day/pt03');
var lines_04 = require('../../include/script/ch03-valentines-day/pt04');
var lines_05 = require('../../include/script/ch03-valentines-day/pt05');
var lines_06 = require('../../include/script/ch03-valentines-day/pt06');


function valentinesSequence(events, env){
  var t = tasks(events, env);

  return [
    t.read(lines_01),
    t.card('valentines'),  //TODO: is this the right card?
    t.read(lines_02),
    t.card('original_01'), //TODO: is this the right card?
    t.read(lines_03),
    t.card('mardi_gras'),  //TODO: is this the right card?
    t.read(lines_04),
    t.mail(),          //TODO: import the message
    t.read(lines_05),
    t.cutscene(),      //TODO: Mail (response)
    t.read(lines_06)
  ];
}


module.exports = valentinesSequence;