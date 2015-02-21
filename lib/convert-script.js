'use strict';

var through2 = require('through2');


function Writer(write){
  this.speaker    = '';
  this.dialogue   = '';
  this.expression = '';

  this.read = function(line){
    if(isSpeaker(line)){
      this.flush();
      this.speaker    = getSpeaker(line);
      this.expression = getExpression(line);
    } else if(isBlank(line)){
      this.flush();
    } else {
      this.dialogue += (this.dialogue === '') ? line : '\n' + line;
    }
  };
  this.flush = function(){
    if(this.dialogue !== ''){
      write({
        speaker:    this.speaker,
        expression: this.expression,
        dialogue:   this.dialogue
      });
      this.dialogue = '';
    }
  };
}
function isSpeaker(line){
  return line.match(/^.*:$/);
}
function isBlank(line){
  return line === '';
}
function getSpeaker(line){
  var matches = line.match(/([^\[]*)(\[[\w\s]*\])?:/);
  return matches[1];
}
function getExpression(line){
  var matches = line.match(/([^\[]]*)(\[[\w\s]*\])?:/);
  return matches[2] || 'default';
}


function parseStream(){
  var stream;
  var writer = new Writer(function(line){
    stream.push(JSON.stringify(line));
  });
  var convert = function(chunk, enc, callback){
    writer.read(chunk.toString());
    callback();
  };
  var flush   = function(callback){
    writer.flush();
    this.push(']');
    callback();
  };

  stream = through2(convert, flush);
  stream.push('[');

  return stream;
}
function parseBuffer(buf){
  var lines = buf.toString().split('\n');
  var buffer = [];
  var writer = new Writer(function(line){ buffer.push(line); });
  
  lines.forEach(function(line){
    writer.read(line);
  });
  writer.flush();

  return new Buffer(JSON.stringify(buffer));
}


module.exports = {
  buffer: parseBuffer,
  stream: parseStream
};