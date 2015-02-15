'use strict';

require('../lib/engine/core/util');

//Events
function dialogueEvents(layer){
  return {
    next: layer.pressE()
  };
}

//Controller
function dialogueController(events, lines){
  var currentLine = events
    .next
    .count()
    .map(function(i){ return lines[i]; })
    .filter(function(x){ return x; });
  var success = events
    .next
    .count()
    .filter(function(x){ return x >= lines.length; })
    .take(1);

  return {
    currentLine: currentLine,
    success:     success
  };
}

//View
function dialogueView(layer, controller){
  controller
    .currentLine
    .onValue(function(line){
      layer.speaker.text(line.speaker);
      layer.text.text(line.dialogue);
    });
}

module.exports = {
  events:     dialogueEvents,
  controller: dialogueController,
  view:       dialogueView
};