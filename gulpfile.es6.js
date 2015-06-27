/***********************/
// gulpfile ES6
/***********************/

import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import minifyCSS from 'gulp-minify-css';
// var gulp      = require('gulp');
//var babel     = require('gulp-babel');
//var sass      = require('gulp-sass');
//var uglify    = require('gulp-uglify');
//var rename    = require('gulp-rename');
//var concat    = require('gulp-concat');
//var minifyCSS = require('gulp-minify-css');

gulp.task('sass', () => {
  gulp.src('public/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(concat('main.css'))
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('min', () => {
  return gulp.src(['public/js/*.js', '!public/js/*.min.js']) 
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', () => {
  gulp.watch('public/js/*.js', ['min']);
  gulp.watch('public/css/*.scss', ['sass']);
});

// Default Tasks
gulp.task('default', ['sass', 'watch', 'min']);
