'use strict';

var pathController = require('./path-controller');


//Controller
function cutoutController(events){
  var path_controller = pathController(events);

  return {
    path: path_controller,
    end:  path_controller.pathEnd
  };
}


module.exports = cutoutController;