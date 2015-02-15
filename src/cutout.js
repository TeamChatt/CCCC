'use strict';


//Events
function cutoutEvents(layer){
  return {
    pause:     layer.dblpressE(),
    pathStart: layer.asEventStream('mousedown'),
    pathDrag:  layer.dragE(),
    pathEnd:   layer.asEventStream('mouseup')
  };
}

//Controller
function cutoutController(events){
  function pathString(pts){
    return 'M' + pts.map(function(e){
        return e.offsetX + ',' + e.offsetY;
      })
      .join('L');
  }

  events.pathDrag.onValue(function(){});

  var path = events
    .pathStart
    .flatMapLatest(function(){
      return events
        .pathDrag
        .scan([], '.concat')
        .map(pathString)
        .skip(1);
    });

  return {
    path:    path,
    success: events.pathEnd
  };
}

//View
function cutoutView(layer, controller){
  controller
    .path
    .onValue(function(points){
      layer.cut.attr('d', points);
    });
}

module.exports = {
  events:     cutoutEvents,
  controller: cutoutController,
  view:       cutoutView
};