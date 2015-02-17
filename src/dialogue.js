'use strict';

var Bacon = require('baconjs');
require('../lib/engine/core/util');


//Events
function dialogueEvents(layer){
  return {
    next: layer.pressE()
  };
}

//Controller
function dialogueController(events, lines){
  //Show the next dialogue snippet after the current one has finished
  var snippet = Bacon.tie(function(currentSnippet){
      return currentSnippet
        .flatMapLatest('.done')
        .flatMapLatest(events.next)
        .count()
        .take(lines.length)
        .map(function(i){ return lines[i]; })
        .map(function(line){
          return snippetController(events, line);
        });
    });

  var success = snippet
    .skip(lines.length - 1)
    .take(1)
    .flatMapLatest('.done');

  return {
    speaker:     snippet.flatMapLatest('.speaker'),
    fullText:    snippet.flatMapLatest('.fullText'),
    partialText: snippet.flatMapLatest('.partialText'),
    success:     success
  };
}
function snippetController(events, line){
  var autoText = Bacon.sequentially(30, line.dialogue.split(''))
    .scan([], '.concat')
    .map('.join', '')
    .changes();
  var skipText = events
    .next
    .take(1)
    .map(function(){ return line.dialogue; });

  return {
    speaker:     Bacon.constant(line.speaker),
    fullText:    Bacon.constant(line.dialogue),
    partialText: autoText
      .takeUntil(skipText)
      .merge(skipText),
    done:        autoText
      .endEvent()
      .merge(events.next)
      .take(1)
  };
}


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
    .onValue(function(text){
      layer.text.text(text);
    });
}

module.exports = {
  events:     dialogueEvents,
  controller: dialogueController,
  view:       dialogueView
};