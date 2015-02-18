'use strict';

var Bacon = require('baconjs');
require('../lib/engine/core/util');


var TEXT_SPEED = 1000/40; //Letters per second


//Events
function dialogueEvents(layer){
  return {
    next: layer.pressE()
  };
}

//Controller
function dialogueController(events, lines){
  //Show the next dialogue snippet after the current one has finished  
  var snippet = Bacon.fix(function(currentSnippet){
      return currentSnippet
        .flatMapLatest('.done')
        .count()
        .take(lines.length)
        .map(function(i){
          return snippetController(events, lines[i]);
        });
    });

  var end = snippet
    .skip(lines.length - 1).take(1)
    .flatMapLatest('.done');

  return {
    speaker:     snippet.flatMapLatest('.speaker'),
    fullText:    snippet.flatMapLatest('.fullText'),
    partialText: snippet.flatMapLatest('.partialText'),
    
    //lifecycle: 
    start:       Bacon.constant({}),
    end:         end
  };
}
function snippetController(events, line){
  var autoText = Bacon.sequentially(TEXT_SPEED, line.dialogue.split(''))
    .scan([], '.concat')
    .map('.join', '')
    .changes();
  var skipText = events
    .next
    .take(1)
    .map(function(){ return line.dialogue; });
  var shown    = autoText
    .endEvent()
    .merge(events.next)
    .take(1);

  return {
    speaker:     Bacon.constant(line.speaker),
    fullText:    Bacon.constant(line.dialogue),
    partialText: autoText
      .takeUntil(skipText)
      .merge(skipText),
    done:        shown
      .delay(0)
      .flatMapLatest(function(){ return events.next; })
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
    .onValue(layer.text, 'html');
}

module.exports = {
  events:     dialogueEvents,
  controller: dialogueController,
  view:       dialogueView
};