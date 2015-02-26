'use strict';

//View
function menuView(layer, menu_controller){
  menu_controller.isPaused
    .not()
    .onValue(layer, 'toggleClass', 'is-hidden');
}


module.exports = menuView;