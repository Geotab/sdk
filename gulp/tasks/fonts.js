'use strict';
const gulp = require('gulp');
const size = require('gulp-size');

// 'gulp fonts' -- copies your fonts to the temporary assets directory
gulp.task('fonts', () =>
  gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest('.tmp/assets/fonts'))
    .pipe(size({title: 'fonts'}))
);
