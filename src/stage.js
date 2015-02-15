'use strict';

var $ = require('../lib/engine/core/input');


function stage($stage){
  $stage.dialogue = dialogue($stage.find('.game_layer.dialogue'));
  $stage.desk     = desk($stage.find('.game_layer.desk'));
  $stage.menu     = menu($stage.find('.game_layer.menu'));
  return $stage;
}
function dialogue($layer){
	$layer.background = $layer.find('.dialogue_background');
  $layer.speaker    = $layer.find('.dialogue_speaker');
  $layer.text       = $layer.find('.dialogue_text');
  return $layer;
}
function desk($layer){
	$layer.background = $layer.find('.desk_background');
  $layer.cut        = $layer.find('.card_cut');
  return $layer;
}
function menu($layer){
	return $layer;
}

module.exports = stage($('#stage'));