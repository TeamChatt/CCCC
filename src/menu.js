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
    isPaused: events.isPaused
  };
}

//View
function menuView(layer, menu_controller){
  menu_controller
    .isPaused
    .not()
    .onValue(layer, 'toggleClass', 'is-hidden');
}

module.exports = {
  events:     menuEvents,
  controller: menuController,
  view:       menuView
};