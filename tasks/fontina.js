/*
 * grunt-fontina
 * https://github.com/framp/grunt-fontina
 *
 * Copyright (c) 2014 Federico Rampazzo <frampone@gmail.com> (http://framp.me)
 * Licensed under the MIT license.
 */


'use strict';

var fontina = require('fontina');
var path = require('path');

module.exports = function(grunt) {

  grunt.registerMultiTask('fontina', 'Grunt plugin to generate fonts', function() {
    var options = this.options({
      __spawn: function(command, args, opts){
        return grunt.util.spawn({
                  cmd: command,
                  args: args,
                  opts: opts
            }, options.callback);
      }
    });

    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.isDir(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" is not directory.');
          return false;
        }
        return true;
      }).map(function(filepath) {
        if (!grunt.file.isPathAbsolute(filepath)){
          filepath = path.join(process.cwd(), filepath);
        }
        fontina(filepath, options);
        return;
      });
      
    });
  });

};
