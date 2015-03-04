'use strict';

var Bacon = require('baconjs');

var gameController = require('./game-controller');


//Controller
function appController(events){
  var game_state = Bacon.mergeAll(
      events.layers.title
        .new_
        .map(newState),
      events.layers.title
        .continue_
        .map(continueState)
    );

  var game_controller = game_state
    .map(gameController, events);

  return {
    game: game_controller
  };
}
function newState(){
  return {
    chapter: 0,
    player_info: {
      name:     '',
      pronoun:  'n',
      interest: 'n'
    }
  };
}
function continueState(){
  try {
    var state = JSON.parse(localStorage.progress);
    validateState(state);
    return state;
  } catch (e){
    return newState();
  }
}
function validateState(state){
  //Validate info
  assert(typeof state === 'object');
  //Chapter should be a number in bounds
  assert(typeof state.chapter === 'number');
  assert(state.chapter < 0 && state.chapter > 7);
  //Name, pronoun, and interest should be strings
  assert(state.player_info.name     === 'string');
  assert(state.player_info.pronoun  === 'string');
  assert(state.player_info.interest === 'string');
}
function assert(prop){
  if(!prop){
    throw new Error('Assertion failed');
  }
}


module.exports = appController;