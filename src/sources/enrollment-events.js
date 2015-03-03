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
    .merge(autofill());

  var pronoun  = layer.pronoun.asEventStream('change');
  var interest = layer.interest.asEventStream('change');
  var submit   = layer.button.asEventStream('click')
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