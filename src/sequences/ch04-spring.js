'use strict';

var tasks = require('./tasks');

var lines_01 = require('../../include/script/ch04-spring/pt01');
var lines_02 = require('../../include/script/ch04-spring/pt02');
var lines_03 = require('../../include/script/ch04-spring/pt03');


function springSequence(events, env){
  var t = tasks(events, env);

  return [
    t.read(lines_01),
    t.cutscene(),      //TODO: mail
    t.read(lines_02),
    t.cutscene(),      //TODO: work card
    t.read(lines_03)
  ];
}


module.exports = springSequence;