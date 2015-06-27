var gulp      = require('gulp');
var sass      = require('gulp-sass');
var uglify    = require('gulp-uglify');
var rename    = require('gulp-rename');
var concat    = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

 
gulp.task('sass', function () {
    gulp.src('public/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/css'));
});
 
gulp.task('min', function() {
  return gulp.src(['public/js/*.js', '!public/js/*.min.js']) //avoids the minification of already minified files
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
  gulp.watch('public/js/*.js', ['min']);
  gulp.watch('public/css/*.scss', ['sass']);
});

// Default Tasks
gulp.task('default', ['sass', 'watch', 'min']);