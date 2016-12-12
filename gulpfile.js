var gulp = require('gulp'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    plumber = require('gulp-plumber'),
    batch = require('gulp-batch'),
    watch = require('gulp-watch');

gulp.task('clean:build', function() {
    return del('./build/**/*');
});

gulp.task('minify:html', function() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build'));
});

gulp.task('minify:css', function() {
    return gulp.src('./src/styles/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./build'));
});

gulp.task('build', [
    'clean:build',
    'minify:html',
    'minify:css',
]);

gulp.task('watch', function() {
    watch('./src/**/*', batch(function(events, done) {
        gulp.start('build', done);
    }));
});

gulp.task('dev', [
    'watch'
]);
