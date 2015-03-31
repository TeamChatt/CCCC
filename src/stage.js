'use strict';

var $ = require('../lib/engine/core/input');


function stage($stage){
  $stage.desk       = desk       ($stage.find('.game_layer.desk'));
  $stage.enrollment = enrollment ($stage.find('.game_layer.enrollment'));
  $stage.mail       = mail       ($stage.find('.game_layer.mail'));
  $stage.dialogue   = dialogue   ($stage.find('.game_layer.dialogue'));
  $stage.menu       = menu       ($stage.find('.game_layer.menu'));
  $stage.hud        = hud        ($stage.find('.game_layer.hud'));
  $stage.title      = title      ($stage.find('.game_layer.title'));
  $stage.credits    = credits    ($stage.find('.game_layer.credits'));

  $stage.reset = function(){
    $stage.desk       .reset();
    $stage.enrollment .reset();
    $stage.mail       .reset();
    $stage.dialogue   .reset();
    $stage.menu       .reset();
    $stage.hud        .reset();
    $stage.title      .reset();
    $stage.credits    .reset();
  };

  return $stage;
}
function desk($layer){
  $layer.background = $layer.find('.desk_background');

  //Cut  
  $layer.cut        = $layer.find('.cut_path');
  $layer.cut_start  = $layer.find('.cut_start');
  $layer.cut_end    = $layer.find('.cut_end');
  //Card
  $layer.target     = $layer.find('.card_target');
  $layer.overlap    = $layer.find('.card_overlap');
  $layer.card       = $layer.find('.card_shape');
  $layer.card_front = $layer.find('.card-face--front');
  $layer.card_back  = $layer.find('.card-face--back');
  //Card template
  $layer.paper             = $layer.find('.card_paper');
  $layer.template_target   = $layer.find('.template_target');
  $layer.original_template = $layer.find('.template--original');
  $layer.work_template     = $layer.find('.template--work');

  $layer.reset = function(){
    $layer.attr('data-task', '');

    $layer.cut     .attr('d', '');
    $layer.target  .attr('d', '');
    $layer.overlap .attr('d', '');

    $layer.paper             .toggleClass('is-hidden', true);
    $layer.template_target   .toggleClass('is-hidden', true);
    $layer.original_template .toggleClass('is-hidden', true);
    $layer.work_template     .toggleClass('is-hidden', true);
  };

  return $layer;
}
function enrollment($layer){
  $layer.name     = $layer.find('#enrollment_name');
  $layer.pronoun  = $layer.find('input[name="pronoun"]');
  $layer.interest = $layer.find('input[name="interest"]');
  $layer.button   = $layer.find('button');
  
  $layer.reset = function(){
    $layer.pronoun.prop ('checked', false);
    $layer.interest.prop('checked', false);
    $layer.button.prop('disabled', true);
  };

  return $layer;
}
function mail($layer){
  $layer.penpal_envelope = $layer.find('.envelope--penpal');
  $layer.friend_envelope = $layer.find('.envelope--friend');
  $layer.cut             = $layer.find('.cut_path');
  $layer.cut_start       = $layer.find('.cut_start');
  $layer.cut_end         = $layer.find('.cut_end');

  $layer.reset = function(){
    $layer.penpal_envelope   .toggleClass('is-hidden', true);
    $layer.friend_envelope   .toggleClass('is-hidden', true);
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
  $layer.resume  = $layer.find('[data-action=resume]');
  $layer.restart = $layer.find('[data-action=restart]');
  $layer.quit    = $layer.find('[data-action=quit]');

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