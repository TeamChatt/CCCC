'use strict';


//Controller
function creditsController(events){
  return {
    end: events.next
  };
}


module.exports = creditsController;