var gulp = require('gulp');
var gutil = require('gulp-util');
//var bower = require('bower');
//var bower = require('gulp-bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var watch = require('gulp-watch');
var scsslint = require('gulp-scss-lint');
var cache = require('gulp-cached');

var paths = {
    sass: ['scss/**/*.scss']
};

gulp.task('default', ['scss-lint','sass','watch']);

/*gulp.task('scss-lint', function() {
    gulp.src('scss/style.scss')
        .pipe(scsslint());
});*/

gulp.task('scss-lint', function() {
  gulp.src(['scss/_base.scss'])
    .pipe(cache('scsslint'))
    .pipe(scsslint({
        'maxBuffer': 1000000
    }));
});

gulp.task('sass', function(done) {
    gulp.src('scss/style.scss')
    .pipe(sass({sourceComments: 'map', sourceMap: 'sass', style: 'compact'}))
    .pipe(gulp.dest('./css/'))
    .pipe(minifyCss({
        keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./css/'))
    .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['scss-lint','sass']);
});

/*gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['scss-lint','sass']);
});*/

/*gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
    .on('log', function(data) {
        gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});*/