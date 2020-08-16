var gulp = require('gulp'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    fileinclude = require('gulp-file-include'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'), //-in-place
    merge = require('merge-stream'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    uglify = require('gulp-uglify'),
    uglifyES =require('gulp-uglify-es').default, //support es6
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    strip = require('gulp-strip-comments'),
    replace = require('gulp-token-replace'),
    imagemin = require('gulp-imagemin'),
    pump = require('pump'),
    debug = require('gulp-debug'),
    del = require('del');


var cf_src = 'src',
    cf_dist = 'dist/ERICHWeb';

var cf = {
    //html
    includeHtml: [
        cf_src + '/**/*.html',
        //'!' + cf_src + '/**/_*.html'
    ],
    includeHtmlPartial: cf_src + '/partial/',
    //style
    scss: [
        cf_src + '/**/*.scss'
    ],
    //script
    js: [
        cf_src + '/**/*.js',
        cf_src + '/**/*.json',
        cf_src + '/vue/*.vue',
        cf_src + '/libs/*.js',
    ],
    //image
    img: [
        cf_src + '/img/**/*.{png,gif,jpg,jpeg,svg}'
    ],
    //copy
    copy: [
        cf_src + '/img/**/*'
    ],

    //dist files
    css:[
        cf_dist + '/css/**/*.css',
        '!' + cf_dist + '/css/**/*.min.css'
    ],

    dist: './dist/ERICHWeb',

    //dist files
    css:[
        cf_dist + '/css/**/*.css',
        '!' + cf_dist + '/css/**/*.min.css'
    ],


};


//task

//browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        port:8888,
        server: {
            baseDir: './dist/'
        },
        startPath: '/ERICHWeb/'
    });
});

gulp.task('update-browser', function(done){
    browserSync.reload();
    done();
});

//task include
gulp.task('include', function () {
    return gulp.src(cf.includeHtml)
        .pipe(fileinclude({
            basepath: cf.includeHtmlPartial
        }))
        //.pipe(replace({global:config}))
        //.pipe(strip())
        .pipe(gulp.dest(cf.dist))
        .pipe(browserSync.stream());
});

//task style
gulp.task('styles',() => {
    return gulp.src(cf.scss)
        .pipe(sourcemaps.init())
        // .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace('scss', 'css');
        }))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(debug({ 'title': '> styles output: ' }))
        .pipe(gulp.dest(cf.dist)).on('error', sass.logError)
        .pipe(browserSync.stream());
});

//minify css
gulp.task('minify-css',() => {
  return gulp.src(cf.css)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(debug({ 'title': '> scripts: ' }))
    .pipe(gulp.dest('./dist/ERICHWeb/css/'));
});


//task script
gulp.task('scripts', function () {
    return gulp.src(cf.js,{ base: cf_src })
        .pipe(changed(cf.dist))
        .pipe(debug({ 'title': '> scripts: ' }))
        .pipe(gulp.dest(cf.dist));
});

//task image
gulp.task('images', function() {
    return gulp.src(cf.img, { base: cf_src })
        .pipe(debug({ 'title': '> images: ' }))
      .pipe(changed(cf.dist))
      .pipe(imagemin())
      .pipe(gulp.dest(cf.dist))
});

//task clear
gulp.task('clear', function() {
    return del(cf.dist);
});


gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch(cf.includeHtml, ['include']);

    // Watch .scss files
    gulp.watch(cf.scss, ['styles']);


    gulp.watch(cf.css, ['minify-css', 'update-browser']);

    // Watch .js files
    gulp.watch(cf.js, ['scripts', 'update-browser']);

    // Watch image files
    gulp.watch(cf.img, ['images', 'update-browser']);

});

gulp.task('build', function () {
    runSequence('styles', 'scripts', 'include', 'images', 'minify-css');
});

gulp.task('default', ['browser-sync'], function () {
    runSequence('build', 'watch', 'update-browser');
});


