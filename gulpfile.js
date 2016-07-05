var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');

var paths = {
    sass: ['scss/*.scss'],
    css: 'css/'
};

gulp.task('default', ['sass','watch']);

gulp.task('sass', function(done) {
    gulp.src('scss/style.scss')
        .pipe(sass({sourceComments: 'map', sourceMap: 'sass', style: 'compact'}))
        .pipe(gulp.dest(paths.css))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(paths.css))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});