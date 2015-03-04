'use strict';

var Bacon = require('baconjs');
require('../../lib/engine/core/util');
var personalize = require('../personalize');


var TEXT_SPEED = 1000/40; //Letters per second

//Controller
function dialogueController(events, env, lines){
  env.onValue(function(){});

  //Show the next dialogue snippet after the current one has finished
  var snippet = Bacon.fix(function(currentSnippet){
      var currentLine = currentSnippet
        .delay(0)
        .flatMapLatest('.done')
        .count()
        .take(lines.length)
        .map(function(i){ return lines[i]; });

      var currentEnv = env.sampledBy(currentLine);

      return currentLine
        .zip(currentEnv, personalizeDialogue)
        .map(snippetController, events)
        .toProperty();
    });

  var end = snippet
    .skip(lines.length - 1).take(1)
    .delay(0)
    .flatMapLatest('.done');

  return {
    speaker:     snippet.delay(0).flatMapLatest('.speaker'),
    expression:  snippet.delay(0).flatMapLatest('.expression'),
    fullText:    snippet.delay(0).flatMapLatest('.fullText'),
    partialText: snippet.delay(0).flatMapLatest('.partialText'),
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
      .flatMap(function(){ return events.next; })
      .take(1)
  };
}
function personalizeDialogue(line, env){
  //TODO: lens?
  return {
    dialogue:   personalize(line.dialogue, env),
    expression: line.expression,
    speaker:    line.speaker
  };
}


module.exports = dialogueController;