'use strict';

var Bacon   = require('baconjs');

var stage         = require('./stage');
var resize        = require('./resize');
var gameEvents    = require('./sources/game-events');
var appController = require('./controllers/app-controller');
var appView       = require('./sinks/app-view');
var autosave      = require('./sinks/autosave');


localStorage.progress = 1;
var container  = document.querySelector('.game-container');
resize(container, 960, 640);

var controller = appController(gameEvents(stage));
appView(stage, controller);
autosave(controller);


window.Bacon = Bacon;
