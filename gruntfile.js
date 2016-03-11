'use strict';

var brfs = require('brfs');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      jshint: {
        options: {
          node: true,
          globals: {
            'angular': true,
            '_': true
          }
        },
        all: ['gruntfile.js', 'index.js', 'src/**/*.js']
      },
      browserify: {
        dist: {
          options:{
            transform: [brfs]
          },
          files:{
            'dist/ui-select-tree.js': ['index.js']
          }
        }
      },
      uglify: {
        dist: {
          files: {
            'dist/ui-select-tree.min.js': ['dist/ui-select-tree.js']
          }
        }
      },
      bump: {
        options: {
          files: ['package.json','bower.json'],
          updateConfigs: [],
          commit: true,
          commitMessage: 'Release v%VERSION%',
          commitFiles: ['package.json','bower.json'],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: true,
          pushTo: 'origin',
          gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
          globalReplace: false,
          prereleaseName: false,
          regExp: false
        }
      },
    });

    grunt.registerTask('default', ['jshint', 'browserify', 'uglify']);
};
