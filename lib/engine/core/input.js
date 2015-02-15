'use strict';

var Bacon = require('baconjs');
var $     = require('zepto-browserify').Zepto;

module.exports = (function($){
  $.fn.asEventStream = Bacon.$.asEventStream;

  //Mouse
  $.fn.mouseStateP = function(){
    return Bacon.mergeAll(
      this.asEventStream('mousedown').map(true),
      this.asEventStream('mouseup').map(false),
      $(document).asEventStream('mouseup').map(false)
    ).toProperty(false);
  };
  $.fn.mousePositionE = function(){
    return this.asEventStream('mousemove');
  };
  $.fn.dragE = function(){
    return this.mousePositionE()
      .filter(this.mouseStateP());
  };

  //Keyboard
  $.fn.keyDownE  = function(keycode){
    return this.asEventStream('keydown')
      .filter(function(e){ return e.keyCode === keycode; });
  };
  $.fn.keyUpE    = function(keycode){
    return this.asEventStream('keyup')
      .filter(function(e){ return e.keyCode === keycode; });
  };
  $.fn.keyStateP = function(keycode){
    return Bacon.mergeAll(
      this.keyDown(keycode).map(true),
      this.keyUp(keycode).map(false)
    ).toProperty(false);
  };

  return $;
})($);
