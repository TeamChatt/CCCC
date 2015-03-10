'use strict';


function personalize(text, env){
  var personalized = text;
  personalized = setName     (env.name,     personalized);
  personalized = setPronoun  (env.pronoun,  personalized);
  personalized = setInterest (env.interest, personalized);

  return personalized;
}
function setName(name, text){
  return text.replace('[]', name);
}
function setPronoun(pronoun, text){
  /* jshint indent: false */
  var flag;
  switch(pronoun){
    case 'f': flag = '$1'; break;
    case 'm': flag = '$2'; break;
    default:  flag = '$3'; break;
  }
  return text.replace(/\[([^\[\]]*)\/([^\[\]]*)\/([^\[\]]*)\]/, flag);
}
function setInterest(interest, text){
  /* jshint indent: false */
  var flag;
  switch(interest){
    case 'f': flag = '$1'; break;
    case 'm': flag = '$2'; break;
    default:  flag = '$3'; break;
  }
  return text.replace(/\{([^\[\]]*)\/([^\[\]]*)\/([^\[\]]*)\}/, flag);
}


module.exports = personalize;