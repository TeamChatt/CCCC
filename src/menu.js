'use strict';

require('../lib/engine/core/util');

//Controller
function menuController(events){
  return {
    isPaused: events.isPaused
  };
}


module.exports = menuController;