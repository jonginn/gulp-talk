var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var cmq = require('gulp-combine-media-queries');

var uglify = require('gulp-uglify');
var include = require('gulp-include');
var rename = require('gulp-rename');

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(cmq())
        .pipe(csso())
        .pipe(gulp.dest('./css/'));
});

gulp.task('js', function () {
    gulp.src('./js/*.js')
        .pipe(include())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js/dist/'));
});