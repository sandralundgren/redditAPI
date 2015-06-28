/***********************/
// gulpfile ES6
/***********************/

import gulp       from 'gulp';
import babel      from 'gulp-babel';
import sass       from 'gulp-sass';
import uglify     from 'gulp-uglify';
import rename     from 'gulp-rename';
import concat     from 'gulp-concat';
import minifyCSS  from 'gulp-minify-css';
import nodemon    from 'gulp-nodemon';

gulp.task('sass', () => {
  gulp.src('public/css/**/*.scss')
    .pipe(concat('main.css'))
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('min', () => {
  return gulp.src(['public/js/**/*.js']) 
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('nodemon', cb => {
  var called = false;
  return nodemon({
    script: 'index.js',
    ignore: ['public/*']
  }).on('start', () => {
    if (!called) {
      called = true;
      cb();
    }
  });
});

gulp.task('watch', () => {
  gulp.watch('public/js/*.js', ['min']);
  gulp.watch('public/css/*.scss', ['sass']);
});

// Default Tasks
gulp.task('default', ['nodemon', 'sass', 'watch', 'min']);
