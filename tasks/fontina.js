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
var async = require('async');

module.exports = function(grunt) {

  grunt.registerMultiTask('fontina', 'Grunt plugin to generate @font-face ready fonts', function() {
    var options = this.options();
    var tasks = [];
    
    this.files.forEach(function(f) {
      var outputDir = f.dest;
      if (!grunt.file.isPathAbsolute(outputDir)){
        outputDir = path.join(process.cwd(), outputDir);
      }
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        if (!grunt.file.isFile(filepath))
          return false;
        return true;
      }).map(function(filepath) {
        if (!grunt.file.isPathAbsolute(filepath))
          filepath = path.join(process.cwd(), filepath);
        tasks.push(fontina.bind(null, filepath, outputDir, options))
      });
    });
    async.parallel(tasks, this.async());
  });

};
