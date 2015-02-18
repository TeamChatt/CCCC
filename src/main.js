'use strict';

var Bacon = require('baconjs');

var stage          = require('./stage');
var gameController = require('./game');
var gameEvents     = require('./sources/game-events');
var gameView       = require('./sinks/game-view');
var autosave       = require('./sinks/autosave');


var controller = gameController(gameEvents(stage));

gameView(stage, controller);
autosave(controller);


window.Bacon = Bacon;
