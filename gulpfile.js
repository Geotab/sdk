// generated on 2017-12-19 using generator-jekyllized 1.0.0-rc.7
'use strict';

const gulp = require('gulp');

const requireDir = require('require-dir');
const tasks = requireDir('./gulp/tasks', {recurse: true}); // eslint-disable-line

// 'gulp inject' -- injects your CSS and JS into either the header or the footer
gulp.task('inject', gulp.parallel('inject:head', 'inject:footer'));

// 'gulp build:site' -- copies, builds, and then copies it again
gulp.task('build:site', gulp.series('site:tmp', 'inject', 'site', 'copy:site'));

// 'gulp assets' -- cleans out your assets and rebuilds them
// 'gulp assets --prod' -- cleans out your assets and rebuilds them with
// production settings
gulp.task('assets', gulp.series(
  gulp.parallel('styles', 'scripts', 'fonts', 'images'),
  gulp.series('copy:assets')
));

// 'gulp clean' -- erases your assets and gzipped files
gulp.task('clean', gulp.parallel('clean:assets', 'clean:gzip', 'clean:dist', 'clean:site'));

// 'gulp build' -- same as 'gulp' but doesn't serve your site in your browser
// 'gulp build --prod' -- same as above but with production settings
gulp.task('build', gulp.series('clean', 'assets', 'build:site', 'html'));

// You can also just use 'gulp upload' but this way you can see all the main
// tasks in the gulpfile instead of having to hunt for the deploy tasks
gulp.task('deploy', gulp.series('upload'));

// 'gulp rebuild' -- WARNING: Erases your assets and built site, use only when
// you need to do a complete rebuild
gulp.task('rebuild', gulp.series('clean', 'clean:images'));

// 'gulp check' -- checks your site configuration for errors and lint your JS
gulp.task('check', gulp.series('site:check'));

// 'gulp' -- cleans your assets and gzipped files, creates your assets and
// injects them into the templates, then builds your site, copied the assets
// into their directory and serves the site
// 'gulp --prod' -- same as above but with production settings
gulp.task('default', gulp.series('build', 'serve'));
