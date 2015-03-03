'use strict';

function enrollmentView(layer, controller){
  controller
    .done
    .onValue(function(){
      layer.button.prop('disabled', false);
    });
}


module.exports = enrollmentView;