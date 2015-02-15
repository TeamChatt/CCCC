'use strict';

var Bacon = require('baconjs');
var $     = require('../lib/engine/core/input');

var XMLNS = 'http://www.w3.org/2000/svg';

//Events
function cutoutEvents(layer){
  return {
    pause:     layer.dblpressE(),
    pathStart: layer.asEventStream('mousedown'),
    pathDrag:  layer.dragE()
  };
}

//Controller
function cutoutController(events){
  function pathString(drag){
    return drag
      .map(function(e){
        return e.offsetX + ',' + e.offsetY;
      })
      .scan([], '.concat')
      .map(function(pts){
        return 'M' + pts.join(' L ');
      })
      .skip(1);
  }

  events.pathDrag.onValue(function(){});

  var path = events
    .pathStart
    .map(function(){
      return $(document.createElementNS(XMLNS, 'path'));
    })
    .toProperty()
    .flatMapLatest(function(p){
      return Bacon.combineTemplate({
          path:   Bacon.constant(p),
          points: pathString(events.pathDrag)
        });
    });

  return {
    path: path
  };
}

//View
function cutoutView(layer, controller){
  controller
    .path
    .onValue(function(e){
      layer.background.append(e.path);
    });

  controller
    .path
    .onValue(function(evt){
      evt.path.attr('d', evt.points);
    });
}

module.exports = {
  events:     cutoutEvents,
  controller: cutoutController,
  view:       cutoutView
};