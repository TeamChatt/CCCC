'use strict';

var gulp          = require('gulp');
var browserify    = require('browserify');
var source        = require('vinyl-source-stream');
var autoprefixer  = require('gulp-autoprefixer');
var sass          = require('gulp-sass');
var connect       = require('gulp-connect');
var convertScript = require('./task/script');
var convertShape  = require('./task/shape');

//Build tasks
gulp.task('script', function(){
  return gulp.src('assets/script/*.txt')
    .pipe(convertScript())
    .pipe(gulp.dest('include/script'));
});

gulp.task('shapes', function(){
  return gulp.src('assets/shapes/*.svg')
    .pipe(convertShape())
    .pipe(gulp.dest('include/shapes'));
});

gulp.task('js', ['script'], function() {
  return browserify({entries: './src/main.js', debug: true})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
});

gulp.task('css', function(){
  return gulp.src('assets/css/*.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload());
});

gulp.task('scss', function(){
  return gulp.src('assets/scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload());
});

gulp.task('svg', function(){
  return gulp.src('assets/images/*.svg')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
});

gulp.task('images', function(){
  return gulp.src('assets/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
});

gulp.task('html', function(){
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('build', ['js', 'css', 'scss', 'svg', 'images', 'html']);



//Development tasks
gulp.task('watch', ['build'], function(){
  gulp.watch('src/main.js',         ['js']);
  gulp.watch('assets/css/*.css',    ['css']);
  gulp.watch('assets/scss/*.scss',  ['scss']);
  gulp.watch('assets/images/*.svg', ['svg']);
  gulp.watch('assets/images/**/*',  ['images']);
  gulp.watch('index.html',          ['html']);
});

gulp.task('connect', ['build'], function() {
  connect.server({
    root: 'dist',
    port: 8000,
    livereload: true
  });
});


gulp.task('default', ['connect', 'watch']);
