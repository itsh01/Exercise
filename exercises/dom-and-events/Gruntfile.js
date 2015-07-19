/**
 * Created by itaysh on 7/19/15.
 */

'use strict';

module.exports = function(grunt) {

    grunt.config.init({
        uglify: {
            main: {
                files: [{
                    expand: true,
                    src: '*.js',
                    dest: 'dest/js',
                    cwd: 'src/js',
                    rename: function(base,path){
                        return base + '/' + path.replace('.js','.min.js')
                    }
                }]
            }
        },
        cssmin: {
            main: {
                files: [{
                    expand: true,
                    src: 'style.css',
                    dest: 'dest/css',
                    cwd: 'src/css',
                    ext: '.min.css'
                }]
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: [
                    '!js',
                    '!css',
                    'lib/**/*.min.js',
                    'lib/**/*.min.css',
                    'lib/**/fonts/**',
                    '*'
                ],
                dest: 'dest/'
            }
        },
        asciify: {
            banner:{
                text: 'Building...',
                options:{
                    font:'doom',
                    log:true
                }
            }
        }
    });



    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-asciify');

    grunt.registerTask('default', ['asciify:banner','copy:main', 'uglify:main', 'cssmin:main']);

};
