'use strict';

var Bacon = require('baconjs');

var stage      = require('./stage');
var game       = require('./game');
var gameEvents = require('./sources/game-events');
var gameView   = require('./sinks/game-view');
var autosave   = require('./sinks/autosave');


var controller = game.controller(gameEvents(stage));

gameView(stage, controller);
autosave(controller);


window.Bacon = Bacon;
