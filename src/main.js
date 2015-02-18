'use strict';

var Bacon = require('baconjs');

var stage    = require('./stage');
var game     = require('./game');
var gameView = require('./sinks/game-view');
var autosave = require('./sinks/autosave');


var controller = game.controller(game.events(stage));

gameView(stage, controller);
autosave(controller);


window.Bacon = Bacon;
