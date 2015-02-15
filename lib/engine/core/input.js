'use strict';

var Bacon = require('baconjs');
var $     = require('zepto-browserify').Zepto;
require('tocca');

module.exports = (function($){
  $.fn.asEventStream = Bacon.$.asEventStream;

  //Mouse
  $.fn.clickE      = function(){
    return this.asEventStream('click');
  };
  $.fn.dblclickE   = function(){
    return this.asEventStream('dblclick');
  };
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

  //Touch
  $.fn.tapE = function(){
    return this.asEventStream('tap');
  };
  $.fn.dbltapE = function(){
    return this.asEventStream('dbltap');
  };

  //Pointer (Mouse + Touch)
  $.fn.pressE = function(){
    return Bacon.mergeAll(
        this.clickE(),
        this.tapE()
      )
      //Be sure to debounce events so that we don't double-count tap/click
      .debounceImmediate(500);
  };
  $.fn.dblpressE = function(){
    return Bacon.mergeAll(
        this.dbltapE(),
        this.dblclickE()
      )
      //Be sure to debounce events so that we don't double-count tap/click
      .debounceImmediate(500);
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
