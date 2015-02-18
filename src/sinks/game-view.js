'use strict';

var sequenceView = require('./sequence-view');
var menuView     = require('./menu-view');

//View
function gameView(stage, controller){
  sequenceView(stage,  controller.sequence);
  menuView(stage.menu, controller.menu);
}

module.exports = gameView;