'use strict';

//Events
function menuEvents(layer){
	var resume  = layer.resume.clickE();
	var restart = layer.restart.clickE();
	var quit    = layer.quit.clickE();

  return {
    resume:  resume,
    restart: restart,
    quit:    quit
  };
}

module.exports = menuEvents;