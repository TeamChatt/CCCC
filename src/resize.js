'use strict';

var Bacon   = require('baconjs');
var browser = require('../lib/engine/core/browser');

//Handle window resizing
module.exports = function(container, intrinsicWidth, intrinsicHeight){
  var resize      = browser.resize.merge(Bacon.later(1,{}));
  var aspectRatio = intrinsicWidth / intrinsicHeight;

  resize
    .onValue(function(){
      var height = window.innerHeight;
      var width  = Math.min(window.innerWidth, height*aspectRatio);
      container.style.maxWidth = width + 'px';
    });
  resize
    .onValue(function(){
      var width = container.getBoundingClientRect().width;
      container.style.fontSize = (width/intrinsicWidth) + 'em';
    });
};
