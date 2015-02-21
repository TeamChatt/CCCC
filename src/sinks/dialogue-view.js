'use strict';

//View
function dialogueView(layer, controller){
  //Set speaker
  controller.speaker
    .onValue(function(speaker){
      layer.speaker.text(speaker);
      layer.portrait.attr('data-speaker', speaker);
    });
  //Set expression
  controller.expression
    .onValue(function(expression){
      layer.portrait.attr('data-expression', expression);
    });
  //Show text
  controller.partialText
    .onValue(layer.text, 'html');
}

module.exports = dialogueView;