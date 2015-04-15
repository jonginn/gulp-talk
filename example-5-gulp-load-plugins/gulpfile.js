var gulp = require('gulp-help')(require('gulp'));
var plugins = require('gulp-load-plugins')();

gulp.task('sass', 'Build Sass files', function () {
    gulp.src('./scss/*.scss')
        .pipe(plugins.sass())
        .pipe(plugins.combineMediaQueries())
        .pipe(plugins.csso())
        .pipe(gulp.dest('./css/'));
});

gulp.task('js', 'Build JS files', function () {
    gulp.src('./js/*.js')
        .pipe(plugins.include())
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js/dist/'));
});

gulp.task('default', 'Build Everything', ['sass', 'js']);

gulp.task('watch', 'Build and watch for changes and run appropriate tasks', function () {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/src/*.js', ['js']);
});