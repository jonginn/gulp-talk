var gulp = require('gulp-help')(require('gulp'));
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var cmq = require('gulp-combine-media-queries');

var uglify = require('gulp-uglify');
var include = require('gulp-include');
var rename = require('gulp-rename');

gulp.task('sass', 'Build Sass files', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(cmq())
        .pipe(csso())
        .pipe(gulp.dest('./css/'));
});

gulp.task('js', 'Build JS files', function () {
    gulp.src('./js/*.js')
        .pipe(include())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js/dist/'));
});

gulp.task('default', 'Build Everything', ['sass', 'js']);

gulp.task('watch', 'Build and watch for changes and run appropriate tasks', function () {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/src/*.js', ['js']);
});