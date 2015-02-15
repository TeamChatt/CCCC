'use strict';

var $ = require('../lib/engine/core/input');


function stage($layer){
  $layer.dialogue = dialogue($layer.find('.game_dialogue'));
  $layer.desk     = desk($layer.find('.game_desk'));
  return $layer;
}
function dialogue($layer){
  $layer.speaker = $layer.find('.game_dialogue_speaker');
  $layer.text    = $layer.find('.game_dialogue_text');
  return $layer;
}
function desk($layer){
  return $layer;
}

module.exports = stage($('#stage'));