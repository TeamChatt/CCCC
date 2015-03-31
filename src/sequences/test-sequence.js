'use strict';


var tasks = require('./tasks');


function testSequence(events, env){
  var t = tasks(events, env);

  return [
    //Original cards
    t.card('original_01'),
    t.card('original_02'),
    t.card('original_03'),
    t.card('original_04'),
    t.card('original_05'),
    t.card('original_06'),
    
    //Work Cards
    t.card('birthday'),
    t.card('christmas'),
    t.card('july_4th'),
    t.card('mardi_gras'),
    t.card('new_years'),
    t.card('thanksgiving'),
    t.card('valentines'),

    //Airplane parts
    t.card('airplane_01'),
    t.card('airplane_02'),
    t.card('airplane_03')
  ];
}


module.exports = testSequence;