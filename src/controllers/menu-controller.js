'use strict';


//Controller
function menuController(events){
  return {
    isPaused: events.isPaused
  };
}


module.exports = menuController;