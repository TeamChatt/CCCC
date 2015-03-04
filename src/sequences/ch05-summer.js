'use strict';

var tasks = require('./tasks');

var lines_01 = require('../../include/script/ch05-summer/pt01');


function summerSequence(events, env){
  var t = tasks(events, env);

  return [
    t.read(lines_01),
    t.cutscene()      //TODO: mail
  ];
}


module.exports = summerSequence;