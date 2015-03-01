'use strict';

var tasks = require('./tasks');

var lines_01 = require('../../include/script/ch07-winter/pt01');
var lines_02 = require('../../include/script/ch07-winter/pt02');


function winterSequence(events){
  var t = tasks(events);

  return [
    t.read(lines_01),
    t.cutscene(),      //TODO: Work card
    t.read(lines_02),
    t.cutscene()       //TODO: Work card
  ];
}


module.exports = winterSequence;