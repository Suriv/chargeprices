'use strict';
const sass = require('node-sass');

module.exports = grunt => {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webContent: 'docs',
        sass: {
            options: {
                 implementation: sass,
                 outputStyle: 'compressed'

             },
             sourceMapSimple: {
                 options: {
                     sourceMap: false
                 }
             },
             compile: {
                 files: {
                    '<%= webContent %>/css/rssh.css': 'src/sass/rssh.scss',
                }
             },
         },
         uglify: {
            srcjs: {
                files: [
                  {expand: true, cwd: 'src/js/core', src: '**.js', dest: '<%= webContent %>/js/core'},
                  {expand: true, cwd: 'src/js/lib', src: '**.js', dest: '<%= webContent %>/js/lib'},
                ]
            }
          },
          connect: {
            server: {
              options: {
                hostname: '*',
                livereload: true,
                open: {
                    target: 'http://127.0.0.1:8000'
                },
                port: 8000,
                useAvailablePort: true,
                base: '<%= webContent %>',
              }
            }
          },
          copy: {
            libassets:{
                files: [{expand: true, cwd: 'src/assets', src: '**/*', dest: '<%= webContent %>/assets'}]
            },
            htmlComponent:{
               files: [{expand: true, cwd: 'src/html', src: '**/*', dest: '<%= webContent %>/'}]
            },
            json:{
              files: [{expand: true, cwd: 'src/json', src: '**/*', dest: '<%= webContent %>/json'}]
           },
          },
          clean: {
            options: {force:true},
            folderJs:{
              src:['<%= webContent %>/js/*']
            },
            folderJson:{
              src:['<%= webContent %>/json/*']
            },
            folderAssets:{
              src:['<%= webContent %>/assets/*']
            },
            folderhtm:{
              src:['<%= webContent %>/*.html']
            },
        },

        watch: {
            options: {
              livereload: true,
            },
            gruntfile: {files: ['Gruntfile.js'], tasks: ['default']},
            sass: { files: ["src/sass/**/*.scss"], tasks: ["sass"] },
            jsCore: {files: ['src/js/core/**.js'], tasks: ['uglify:srcjs']},
            jslib: {files: ['src/js/lib/**.js'], tasks: ['uglify:srcjs']},
            libassets: {files: ['src/assets/**/*'], tasks: ['clean:folderAssets','copy:libassets']},
            htmlComponent: {files: ['src/html/**'], tasks: ['copy:htmlComponent']},
            jsonFolder: {files: ['src/json/**'], tasks: ['copy:json']},
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'uglify']);

    grunt.registerTask('monitor', ['clean','connect','sass','uglify', 'copy','watch']);

  };
