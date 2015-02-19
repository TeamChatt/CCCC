'use strict';

//Events
function titleEvents(layer){
  return {
    new_:      layer.new_button.clickE(),
    continue_: layer.continue_button.clickE()
  };
}

module.exports = titleEvents;