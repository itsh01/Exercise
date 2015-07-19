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
                    cwd: 'src/js'
                }]
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'dest/'
            }
        }
    });



    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy:main', 'uglify:main']);

};
