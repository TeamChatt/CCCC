'use strict';

var sequenceView = require('./sequence-view');
var menuView     = require('./menu-view');
var autosaveView = require('./autosave-view');


//View
function gameView(stage, controller){
  sequenceView (stage,      controller.sequence);
  menuView     (stage.menu, controller.menu);
  autosaveView (stage.hud,  controller.progress);
}


module.exports = gameView;