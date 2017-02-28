'use strict';

const gulp = require('gulp');
const path = require('path');

const sass = require('gulp-sass');
const cssmin = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

const config = {
  images_directory: 'images',
  scss_directory: 'styles/scss',
  static_directory: 'styles',
};

gulp.task('scss', function () {
  gulp.src(path.join(config.scss_directory, 'main.scss'))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    .pipe(cssmin({keepSpecialComments: 0}))
    .pipe(gulp.dest(config.static_directory));
});

gulp.task('images', function () {
  return gulp.src(config.images_directory)
    .pipe(imagemin({
      optimizationLevel: 7,
      multipass: true,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false,
      }],
      use: [pngquant()],
    }))
    .pipe(gulp.dest(config.static_directory));
});


gulp.task('default', function () {
  gulp.watch(path.join(config.scss_directory, '**/*.scss'), ['scss']);
});
