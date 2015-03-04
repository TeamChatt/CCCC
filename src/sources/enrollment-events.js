'use strict';

var Bacon = require('baconjs');
require('../../lib/engine/core/input');


//Events
function enrollmentEvents(layer){
  var autofill = function() {
    return Bacon.interval(50)
      .take(10)
      .map(function(){ return layer.name.val() || ''; })
      .filter(function(x){ return x.length > 0; })
      .take(1);
  };

  var name = layer.name.asEventStream('keyup input')
    .merge(layer.name.asEventStream('cut paste').delay(1))
    .merge(autofill())
    .map('.target.value');

  var pronoun  = layer.pronoun.asEventStream('change')
    .map('.target.value');
  var interest = layer.interest.asEventStream('change')
    .map('.target.value');
  var submit   = layer.button.clickE()
    .doAction('.preventDefault')
    .filter(function(){ return !layer.button.is(':disabled'); });


  return {
    name:     name,
    pronoun:  pronoun,
    interest: interest,
    submit:   submit
  };
}

module.exports = enrollmentEvents;