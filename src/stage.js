'use strict';

var $ = require('../lib/engine/core/input');


function stage($stage){
  $stage.desk     = desk     ($stage.find('.game_layer.desk'));
  $stage.dialogue = dialogue ($stage.find('.game_layer.dialogue'));
  $stage.menu     = menu     ($stage.find('.game_layer.menu'));
  $stage.hud      = hud      ($stage.find('.game_layer.hud'));
  $stage.title    = title    ($stage.find('.game_layer.title'));
  $stage.credits  = credits  ($stage.find('.game_layer.credits'));

  $stage.reset = function(){
    $stage.desk     .reset();
    $stage.dialogue .reset();
    $stage.menu     .reset();
    $stage.hud      .reset();
    $stage.title    .reset();
    $stage.credits  .reset();
  };

  return $stage;
}
function desk($layer){
  $layer.background = $layer.find('.desk_background');
  $layer.cut        = $layer.find('.cut_path');
  $layer.cut_start  = $layer.find('.card_cut_start');
  $layer.cut_end    = $layer.find('.card_cut_end');
  $layer.target     = $layer.find('.card_target');
  $layer.overlap    = $layer.find('.card_overlap');

  $layer.reset = function(){
    //???
    $layer.cut     .attr('d', '');
    $layer.target  .attr('d', '');
    $layer.overlap .attr('d', '');
  };

  return $layer;
}
function dialogue($layer){
  $layer.background = $layer.find('.dialogue_background');
  $layer.portrait   = $layer.find('.dialogue_portrait');
  $layer.speaker    = $layer.find('.dialogue_speaker');
  $layer.text       = $layer.find('.dialogue_text');

  $layer.reset = function(){
    //???
  };

  return $layer;
}
function menu($layer){
  $layer.reset = function(){
    $layer.toggleClass('is-hidden', true);
  };

  return $layer;
}
function hud($layer){
  $layer.autosave_icon = $layer.find('.autosave-icon');
  $layer.timer         = $layer.find('.timer');
  $layer.timer_fill    = $layer.find('.timer_fill');

  $layer.reset = function(){
    //???
  };

  return $layer;
}
function title($layer){
  $layer.new_button      = $layer.find('[data-action=new-game]');
  $layer.continue_button = $layer.find('[data-action=continue]');

  $layer.reset = function(){
    $layer.toggleClass('is-hidden', false);
  };

  return $layer;
}
function credits($layer){
  $layer.reset = function(){
    $layer.toggleClass('is-hidden', true);
  };

  return $layer;
}

module.exports = stage($('#stage'));