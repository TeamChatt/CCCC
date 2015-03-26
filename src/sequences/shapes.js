'use strict';

var tutorial_01 = require('../../include/shapes/nye');

var original_01 = require('../../include/shapes/original_01');
var original_02 = require('../../include/shapes/original_01'); //TODO
var original_03 = require('../../include/shapes/original_03');
var original_04 = require('../../include/shapes/original_03'); //TODO
var original_05 = require('../../include/shapes/original_03'); //TODO
var original_06 = require('../../include/shapes/original_06');

var work_01     = require('../../include/shapes/original_01'); //TODO
var work_02     = require('../../include/shapes/original_01'); //TODO
var work_03     = require('../../include/shapes/original_01'); //TODO
var work_04     = require('../../include/shapes/original_01'); //TODO
var work_05     = require('../../include/shapes/original_01'); //TODO
var work_06     = require('../../include/shapes/original_01'); //TODO


var shapes = {
  'tutorial_01': tutorial_01,

  'original_01': original_01,
  'original_02': original_02,
  'original_03': original_03,
  'original_04': original_04,
  'original_05': original_05,
  'original_06': original_06,
  
  'work_01':     work_01,
  'work_02':     work_02,
  'work_03':     work_03,
  'work_04':     work_04,
  'work_05':     work_05,
  'work_06':     work_06
};


module.exports = shapes;