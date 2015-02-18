'use strict';

//View
function dialogueView(layer, controller){
  //Set speaker
  controller.speaker
    .onValue(function(speaker){
      layer.speaker.text(speaker);
      layer.portrait.attr('data-speaker', speaker);
    });
  //Show text
  controller.partialText
    .onValue(layer.text, 'html');
}

module.exports = dialogueView;