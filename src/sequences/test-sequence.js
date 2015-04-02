'use strict';


var tasks = require('./tasks');


function testSequence(events, env){
  var t = tasks(events, env);

  return [
    //Mail
    t.mail(),

    //Original cards
    t.card('original', 'original_01'),
    t.card('original', 'original_02'),
    t.card('original', 'original_03'),
    t.card('original', 'original_04'),
    t.card('original', 'original_05'),
    t.card('original', 'original_06'),
    
    //Work Cards
    t.card('work', 'birthday'),
    t.card('work', 'christmas'),
    t.card('work', 'july_4th'),
    t.card('work', 'mardi_gras'),
    t.card('work', 'new_years'),
    t.card('work', 'thanksgiving'),
    t.card('work', 'valentines'),

    //Airplane parts
    t.card('work', 'airplane_01'),
    t.card('work', 'airplane_02'),
    t.card('work', 'airplane_03')
  ];
}


module.exports = testSequence;