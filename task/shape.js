'use strict';

var through2   = require('through2');
var replaceExt = require('replace-ext');
var convert    = require('../lib/convert-shape');

// Plugin level function(dealing with files)
function script() {
  // Creating a stream through which each file will pass
  return through2.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      cb(null, file);
    }
    if (file.isBuffer()) {
      file.contents = convert(file.contents);
    }
    if (file.isStream()) {
      this.emit('error', new Error('shape: Streams are not supported!'));
      return cb();
    }

    file.path = replaceExt(file.path, '.json');

    cb(null, file);
  });
}


module.exports = script;