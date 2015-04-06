'use strict';

var Bacon = require('baconjs');
var flow  = require('../flow');
require('../../lib/engine/core/util');
var personalize = require('../personalize');


var TEXT_SPEED = 1000/60; //Letters per second

//Controller
function dialogueController(events, env, lines){
  env.onValue(function(){});

  var snippet = env
    .take(1)
    .map(function(env){
      return lines.map(function(line){
        var personalized = personalizeDialogue(line, env);
        return function(){
          return snippetController(events, personalized);
        };
      });
    })
    .flatMap(function(snippets){
      return flow.runSequence(
        snippets,
        function(snippet){ return snippet.done; }
      );
    })
    .toProperty();

  var end = snippet
    .skip(lines.length - 1).take(1)
    .flatMapLatest('.done');

  return {
    speaker:     snippet.flatMapLatest('.speaker'),
    expression:  snippet.flatMapLatest('.expression'),
    fullText:    snippet.flatMapLatest('.fullText'),
    partialText: snippet.flatMapLatest('.partialText'),
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