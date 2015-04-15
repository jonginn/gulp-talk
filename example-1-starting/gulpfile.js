var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {

  // Give it a file or a glob of files
  // Pipe it to sass
  // Give it a destination

    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});