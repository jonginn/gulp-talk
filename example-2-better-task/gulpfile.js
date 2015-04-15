var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var cmq = require('gulp-combine-media-queries');

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(cmq())
        .pipe(csso())
        .pipe(gulp.dest('./css'));
});