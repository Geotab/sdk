'use strict';
const gulp = require('gulp');
const del = require('del');

gulp.task('clean:assets', () => {
  return del(['.tmp/**/*', '!.tmp/assets', '!.tmp/assets/images', '!.tmp/assets/images/**/*', 'dist/assets']);
});
gulp.task('clean:images', () => {
  return del(['.tmp/assets/images', 'dist/assets/images']);
});
gulp.task('clean:dist', () => {
  return del(['dist/', '.tmp/dist']);
});
gulp.task('clean:gzip', () => {
  return del(['dist/**/*.gz']);
});
gulp.task('clean:site', () => {
  return del(['.tmp/src']);
});
