'use strict';

var gulp         = require('gulp');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var autoprefixer = require('gulp-autoprefixer');
var connect      = require('gulp-connect');


//Build tasks
gulp.task('js', function() {
  return browserify({entries: './src/main.js', debug: true})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
});

gulp.task('css', function(){
  return gulp.src('css/*.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('build', ['js', 'css', 'html']);



//Development tasks
gulp.task('watch', ['build'], function(){
  gulp.watch('src/main.js', ['js']);
  gulp.watch('css/*.css',  ['css']);
  gulp.watch('index.html', ['html']);
});

gulp.task('connect', ['build'], function() {
  connect.server({
    root: 'dist',
    port: 8000,
    livereload: true
  });
});


gulp.task('default', ['connect', 'watch']);
