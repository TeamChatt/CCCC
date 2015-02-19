'use strict';

var through2   = require('through2');
var replaceExt = require('replace-ext');
var convert    = require('../lib/convert-script');

function readLineStream(){
  var buffer = '';
  return through2.obj(
    // transform function
    function(chunk, enc, cb) {
      buffer += chunk;
    
      var idx = buffer.indexOf('\n');
      var line;
        
      while (idx > -1) {
        idx++;
        line = buffer.substring(0, idx);
        buffer = buffer.substring(idx);
        idx = buffer.indexOf('\n');
        this.push(line.slice(0,-1));
      }
      return cb();
    },
    // flush function
    function(cb) {
      this.push(buffer);
      return cb();
    }
  );
}

// Plugin level function(dealing with files)
function script() {
  // Creating a stream through which each file will pass
  return through2.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      cb(null, file);
    }
    if (file.isBuffer()) {
      file.contents = convert.buffer(file.contents);
    }
    if (file.isStream()) {
      file.contents = file.contents
        .pipe(readLineStream())
        .pipe(convert.stream());
    }

    file.path = replaceExt(file.path, '.json');

    cb(null, file);
  });
}


module.exports = script;