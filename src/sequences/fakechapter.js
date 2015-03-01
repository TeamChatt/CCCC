'use strict';

var tasks = require('./tasks');

var fake_lines        = require('../../include/script/fakelines');
var original_shape_03 = require('../../include/shapes/original_03');
var original_shape_06 = require('../../include/shapes/original_06');


function fakeSequence(events){
  var t = tasks(events);

  return [
    //Cut original card
    t.read(fake_lines),
    t.card(original_shape_03),
    //Cut original card
    t.read(fake_lines),
    t.card(original_shape_06),
    //All done!
    t.rollCredits()
  ];
}


module.exports = fakeSequence;