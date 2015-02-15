'use strict';

require('../lib/engine/core/util');

//Events
function menuEvents(layer){
  return {
    resume: layer.pressE()
  };
}

//Controller
function menuController(events){
  return {
    resume: events.resume
  };
}

//View
function menuView(layer, menu_controller, game_controller){
  game_controller
    .paused
    .not()
    .onValue(layer, 'toggleClass', 'is-hidden');
}

module.exports = {
  events:     menuEvents,
  controller: menuController,
  view:       menuView
};