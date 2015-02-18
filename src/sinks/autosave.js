'use strict';

function autosave(controller){
	controller.progress
		.onValue(function(progress){
			console.log(progress);
		});
}

module.exports = autosave;