'use strict';

var Bacon = require('baconjs');

var stage = require('./stage');
var game  = require('./game');


game.view(
    stage,
    game.controller(
      game.events(stage)
    )
  );

window.Bacon = Bacon;
