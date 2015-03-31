'use strict';

var Bacon = require('baconjs');


//View
function cardRevealView(layer, controller){
  //Set task type
  Bacon.later(500, {})
    .onValue(function(){
      layer.attr('data-task', 'card-reveal');
    });

  controller
    .name
    .map(function(name){
      return '/images/cards/' + name + '.svg';
    })
    .onValue(function(path){
      layer.card_front.attr('xlink:href', path);
      layer.card_back.attr('xlink:href', path);
    });
}


module.exports = cardRevealView;