'use strict';

var Bacon   = require('baconjs');
var browser = require('../lib/engine/core/browser');
var lines   = require('./dialogue');
var stage   = require('./stage');


//Advance the dialogue
function showLine(line){
  stage.dialogue.speaker.text(line.speaker);
  stage.dialogue.text.text(line.dialogue);
}
var next = Bacon.mergeAll(
    stage.dialogue.asEventStream('tap'),
    stage.dialogue.asEventStream('click')
  )
  .debounceImmediate(500);
var currentLine = next
  .scan(0, function(x){ return x+1; })
  .map(function(i){ return lines[i]; })
  .filter(function(x){ return x; });
currentLine.onValue(showLine);


//Pause/unpause the game
var pause = Bacon.mergeAll(
    stage.desk.asEventStream('dbltap'),
    stage.desk.asEventStream('dblclick')
  )
  .debounceImmediate(500);
var unpause = Bacon.mergeAll(
    stage.menu.asEventStream('tap'),
    stage.menu.asEventStream('click')
  )
  .debounceImmediate(500);
var paused = Bacon.mergeAll(
    pause.map(true),
    unpause.map(false)
  )
  .debounceImmediate(500)
  .toProperty(false);
paused.onValue(function(is_paused){
  if(is_paused){
    stage.menu.removeClass('is-hidden');
  } else {
    stage.menu.addClass('is-hidden');
  }
});


window.Bacon = Bacon;
