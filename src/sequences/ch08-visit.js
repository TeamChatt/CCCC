'use strict';

var tasks = require('./tasks');

var lines_01 = require('../../include/script/ch08-visit/pt01');
var lines_02 = require('../../include/script/ch08-visit/pt02');


function visitSequence(events, env){
  var t = tasks(events, env);

  return [
    t.read(lines_01),
    t.mail(),          //TODO: import message
    t.read(lines_02),
    t.cutscene(),      //TODO: cutscene
    t.rollCredits()
  ];
}


module.exports = visitSequence;