'use strict';

var cutoutView = require('./cutout-view');


//View
function cardView(layer, controller){
  controller
    .cutout
    .log('cutout: ')
    .onValue(function(cutout_controller){
      cutoutView(layer, cutout_controller);
    });
}


module.exports = cardView;