'use strict';

var tasks = require('./tasks');

var lines_01 = require('../../include/script/ch01-intro/pt01');
var lines_02 = require('../../include/script/ch01-intro/pt02');


function introSequence(events){
  var t = tasks(events);

  return [
    //Task 1:
    t.read(lines_01),
    t.cutscene(),
    t.read(lines_02)
  ];
}


module.exports = introSequence;