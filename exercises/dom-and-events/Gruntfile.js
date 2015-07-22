/**
 * Created by itaysh on 7/19/15.
 */

'use strict';

module.exports = function (grunt) {

    grunt.config.init({
        uglify: {
            main: {
                files: [{
                    expand: true,
                    src: '**/*.js',
                    dest: 'dest/js',
                    cwd: 'src/js',
                    rename: function (base, path) {
                        return base + '/' + path.replace('.js', '.min.js');
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
                    'lib/**/require.js',
                    'lib/**/*.min.css',
                    'lib/**/fonts/**',
                    '*'
                ],
                dest: 'dest/'
            }
        },
        clean: {
            main: ['dest']
        },
        asciify: {
            banner: {
                text: 'Building...',
                options: {
                    font: 'doom',
                    log: true
                }
            }
        },
        csslint: {
            options: {
                'adjoining-classes': false,
                'import': false,
                'fallback-colors': false,
                'unqualified-attributes': false
            },
            src: ['src/css/*.css']
        },
        eslint: {
            src: ['src/js/*.js', 'Gruntfile.js']
        },
        dox: {
            options: {
                title: 'ProductList Cart'
            },
            files: {
                src: ['src/js/'],
                dest: 'docs'
            }
        },
        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['default'],
                options: {
                    debounceDelay: 500
                }
            }
        }

    });



    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-eslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-asciify');
    grunt.loadNpmTasks('grunt-dox');


    grunt.registerTask('lint', ['csslint', 'eslint']);
    grunt.registerTask('build', ['copy:main', 'uglify:main', 'cssmin:main']);
    grunt.registerTask('default', ['asciify:banner', 'lint', 'clean:main', 'build', 'dox']);

};
