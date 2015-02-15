'use strict';

var Bacon   = require('baconjs');
var browser = require('../lib/engine/core/browser');
var lines   = require('./dialogue');
var stage   = require('./stage');


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


window.Bacon = Bacon;
