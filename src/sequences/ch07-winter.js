'use strict';

var tasks = require('./tasks');

var lines_01 = require('../../include/script/ch07-winter/pt01');
var lines_02 = require('../../include/script/ch07-winter/pt02');


function winterSequence(events, env){
  var t = tasks(events, env);

  return [
    t.read(lines_01),
    t.card('original_01'),      //TODO: which card?
    t.read(lines_02),
    t.card('original_01')       //TODO: which card?
  ];
}


module.exports = winterSequence;