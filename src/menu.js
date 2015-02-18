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

module.exports = {
  events:     menuEvents,
  controller: menuController
};