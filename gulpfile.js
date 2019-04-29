const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp
        .src('src/scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('src/css'))
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass', 'reload'));
    gulp.watch('src/**/*.{html,js,css}', gulp.series('reload'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: './src'
    });
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('default', gulp.parallel('serve', 'watch'));

gulp.task('useref', function () {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest('dist'))
})