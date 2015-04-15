var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    runSequence = require('run-sequence'),
    $ = require('gulp-load-plugins')();

require('gulp-help')(gulp);

var filterByExtension = function(extension){  
    return $.filter(function(file){
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};

var filterByFileTypes = function(){  
    return $.filter(function(file){
        return file.path.match(new RegExp('.(eot|ttf|woff|woff2|svg)$'));
    });
};

var config = {
    bowerDir: './src/third-party',
    dist: './web/'
}

gulp.task('default', false, function(){
  gulp.start('help');
});

gulp.task('js', false, function(){  
    var mainFiles = mainBowerFiles();

    if(!mainFiles.length){
        // No main files found. Skipping....
        return;
    }

    var jsFilter = filterByExtension('js');

    return gulp.src(mainFiles)
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(gulp.dest(config.dist + 'js/vendor/'))
        .pipe(jsFilter.restore());
});

gulp.task('fonts', false, function(){  
    var mainFiles = mainBowerFiles();

    if(!mainFiles.length){
        // No main files found. Skipping....
        return;
    }

    var fontFilter = filterByFileTypes();
    // var fontFilter = filterByExtension(['eot', 'svg']);

    return gulp.src(mainFiles)
        .pipe(fontFilter)
        .pipe(gulp.dest(config.dist + 'fonts/'))
        .pipe(fontFilter.restore());
});

gulp.task('css', false, function() {

    return gulp.src('./src/scss/style.scss')
        .pipe($.plumber())
        .pipe($.sass({
            style: 'compact',
            includePaths: [
                './src/scss',
                config.bowerDir + '/bootstrap-sass/assets/stylesheets',
            ]
        }))
        .pipe($.autoprefixer('last 2 version'))
        .pipe($.combineMediaQueries())
        .pipe($.csso())
        .pipe(gulp.dest(config.dist + 'css/'));

});

gulp.task('build', '>>>>>Build Everything<<<<<', function() {
  runSequence('fonts', 'js', 'css');
}, {
  aliases: ['init']
});

gulp.task('watch', 'Build and watch for changes and run appropriate tasks', function () {
  gulp.start('build');
  gulp.watch('./src/scss/*.scss', ['css']);
});