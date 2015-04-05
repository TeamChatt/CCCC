'use strict';

var Bacon                  = require('baconjs');
var flow                   = require('../flow');
var dragTemplateController = require('./tasks/drag-template-controller');
var cutoutController       = require('./tasks/cutout-controller');
var cardRevealController   = require('./tasks/card-reveal-controller');

//Controller
function cardController(events, card_type, card){
  // var task  = dragTemplate(3).toProperty();
  var task  = dragTemplate(1).toProperty();
  var shape = card.shape;

  //Drag template, then cutout shape, rinse, repeat
  function dragTemplate(n){
    var initial = {type: 'dragTemplate', controller: dragTemplateController(events, card_type)};
    return flow.transition(initial)
      .then('.controller.end', function(){ return cutout(n); });
  }
  function cutout(n){
    var initial = {type: 'cutout', controller: cutoutController(events, shape)};
    var next    = (n === 1)                     ?
      function(){ return cardReveal(); }        :
      function(){ return dragTemplate(n-1); };

    return flow.transition(initial)
      .then('.controller.success', next)
      .then('.controller.failure', function(){ return cutout(n); });
  }
  function cardReveal(){
    var initial = {type: 'cardReveal', controller: cardRevealController(events, card.name)};
    return flow.transition(initial)
      .then('.controller.end', function(){ return Bacon.never(); });
  }

  return {
    task: task,
    end:  task.endEvent()
  };
}


module.exports = cardController;