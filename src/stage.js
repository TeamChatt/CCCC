'use strict';

var $ = require('../lib/engine/core/input');


function stage($stage){
  $stage.desk     = desk     ($stage.find('.game_layer.desk'));
  $stage.dialogue = dialogue ($stage.find('.game_layer.dialogue'));
  $stage.menu     = menu     ($stage.find('.game_layer.menu'));
  $stage.title    = title    ($stage.find('.game_layer.title'));
  $stage.credits  = credits  ($stage.find('.game_layer.credits'));
  return $stage;
}
function desk($layer){
  $layer.background = $layer.find('.desk_background');
  $layer.cut        = $layer.find('.card_cut');
  $layer.cut_start  = $layer.find('.card_cut_start');
  $layer.cut_end    = $layer.find('.card_cut_end');
  return $layer;
}
function dialogue($layer){
  $layer.background = $layer.find('.dialogue_background');
  $layer.portrait   = $layer.find('.dialogue_portrait');
  $layer.speaker    = $layer.find('.dialogue_speaker');
  $layer.text       = $layer.find('.dialogue_text');
  return $layer;
}
function menu($layer){
  return $layer;
}
function title($layer){
  $layer.new_button      = $layer.find('[data-action=new-game]');
  $layer.continue_button = $layer.find('[data-action=continue]');
  return $layer;
}
function credits($layer){
  return $layer;
}

module.exports = stage($('#stage'));