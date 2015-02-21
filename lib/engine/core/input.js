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
    return this.asEventStream('mousemove')
      .map(function(evt){
        return {x: evt.offsetX, y: evt.offsetY, evt: evt};
      });
  };
  $.fn.mouseDragE = function(){
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
  $.fn.touchStateP = function(){
    return Bacon.mergeAll(
      this.asEventStream('touchstart').map(true),
      this.asEventStream('touchcancel').map(false),
      this.asEventStream('touchleave').map(false),
      this.asEventStream('touchend').map(false),
      $(document).asEventStream('touchcancel').map(false),
      $(document).asEventStream('touchleave').map(false),
      $(document).asEventStream('touchend').map(false)
    ).toProperty(false);
  };
  $.fn.touchPositionE = function(){
    return this.asEventStream('touchmove')
      .doAction('.preventDefault')
      .map(function(evt){
        var touch = evt.changedTouches[0];
        return {x: touch.pageX, y: touch.pageY, evt: evt};
      });
  };
  $.fn.touchDragE = function(){
    return this.touchPositionE();
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
  $.fn.pointerDownE = function(){
    return Bacon.mergeAll(
        this.asEventStream('mousedown')
          .map(function(evt){
            return {x: evt.offsetX, y: evt.offsetY, evt: evt};
          }),
        this.asEventStream('touchstart')
          .map(function(evt){
            var touch = evt.touches[0];
            return {x: touch.pageX, y: touch.pageY, evt: evt};
          })
      );
  };
  $.fn.pointerUpE = function(){
    return Bacon.mergeAll(
        this.asEventStream('mouseup')
          .map(function(evt){
            return {x: evt.offsetX, y: evt.offsetY, evt: evt};
          }),
        this.asEventStream('touchend')
          .map(function(evt){
            var touch = evt.touches[0];
            return {x: touch.pageX, y: touch.pageY, evt: evt};
          })
      );
  };
  $.fn.dragE = function(){
    return Bacon.mergeAll(
        this.mouseDragE(),
        this.touchDragE()
      );
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
