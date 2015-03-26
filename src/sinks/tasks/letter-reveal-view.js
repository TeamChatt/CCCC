'use strict';

var Bacon = require('baconjs');


//View
function letterRevealView(layer, controller){
  //Set task type
  Bacon.later(500, {})
    .onValue(function(){
      layer.attr('data-task', 'letter-reveal');
    });
}


module.exports = letterRevealView;