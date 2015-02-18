'use strict';

var Bacon = require('baconjs');

var stage          = require('./stage');
var gameEvents     = require('./sources/game-events');
var gameController = require('./controllers/game-controller');
var gameView       = require('./sinks/game-view');
var autosave       = require('./sinks/autosave');


var game_state = parseInt(localStorage.progress, 10);
var controller = gameController(gameEvents(stage), game_state);

gameView(stage, controller);
autosave(controller);


window.Bacon = Bacon;
