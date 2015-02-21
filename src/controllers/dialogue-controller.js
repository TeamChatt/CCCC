'use strict';

var Bacon = require('baconjs');
require('../../lib/engine/core/util');


var TEXT_SPEED = 1000/40; //Letters per second

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
    expression:  snippet.flatMapLatest('.expression'),
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
    expression:  Bacon.constant(line.expression),
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


module.exports = dialogueController;