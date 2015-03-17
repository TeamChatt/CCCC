'use strict';

function arc(r, theta){
  var start = [0,-r];
  var end   = [r*Math.sin(theta), -r*Math.cos(theta)];
  var size  = [r,r];
  
  return 'M ' + start.join(',') +
    ' A ' + size.join(',') + ' 0 0,1 ' + end.join(',') +
    'L0,0Z';
}

//View
function timerView(layer, time){
  time
    .map(function(time){ return time * 2*Math.PI; })
    .map(arc, 50)
    .onValue(layer.timer_fill, 'attr', 'd');
}


module.exports = timerView;