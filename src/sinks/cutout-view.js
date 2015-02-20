'use strict';

var pathView = require('./path-view');


//View
function cutoutView(layer, controller){
  pathView(layer, controller.path);
}

module.exports = cutoutView;