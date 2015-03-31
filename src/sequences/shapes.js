'use strict';


//Original cards
var original_01 = require('../../include/shapes/original_01');
var original_02 = require('../../include/shapes/original_02');
var original_03 = require('../../include/shapes/original_03');
var original_04 = require('../../include/shapes/original_03'); //TODO
var original_05 = require('../../include/shapes/original_03'); //TODO
var original_06 = require('../../include/shapes/original_06');

//Work cards
var birthday     = require('../../include/shapes/birthday');
var christmas    = require('../../include/shapes/christmas');
var july_4th     = require('../../include/shapes/july_4th');
var mardi_gras   = require('../../include/shapes/mardi_gras');
var new_years    = require('../../include/shapes/new_years');
var thanksgiving = require('../../include/shapes/thanksgiving');
var valentines   = require('../../include/shapes/valentines');

//Airplane parts
var airplane_01 = require('../../include/shapes/airplane_01');
var airplane_02 = require('../../include/shapes/airplane_02');
var airplane_03 = require('../../include/shapes/airplane_03');


var shapes = {
  //Original cards
  'original_01': original_01,
  'original_02': original_02,
  'original_03': original_03,
  'original_04': original_04,
  'original_05': original_05,
  'original_06': original_06,
  
  //Work Cards
  'birthday':     birthday,
  'christmas':    christmas,
  'july_4th':     july_4th,
  'mardi_gras':   mardi_gras,
  'new_years':    new_years,
  'thanksgiving': thanksgiving,
  'valentines':   valentines,

  //Airplane parts
  'airplane_01': airplane_01,
  'airplane_02': airplane_02,
  'airplane_03': airplane_03
};


module.exports = shapes;