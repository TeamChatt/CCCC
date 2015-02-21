'use strict';

var Bacon = require('baconjs');

var stage         = require('./stage');
var gameEvents    = require('./sources/game-events');
var appController = require('./controllers/app-controller');
var appView       = require('./sinks/app-view');
var autosave      = require('./sinks/autosave');


localStorage.progress = 2;

var events     = gameEvents(stage);
var controller = appController(events);

appView(stage, controller);
autosave(controller);


window.Bacon = Bacon;
