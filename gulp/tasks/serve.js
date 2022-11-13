const gulp = require("gulp");
const browserSync = require('browser-sync').create();

// Function to properly reload your browser
function reload(done) {
    browserSync.reload();
    done();
}
// 'gulp serve' -- open up your website in your browser and watch for changes
// in all your files and update them when needed
gulp.task('serve', (done) => {
    browserSync.init({
        // tunnel: true,
        // open: false,
        server: ['dist']
        // server: ['.tmp', 'dist']
    });
    done();

    // Watch various files for changes and do the needful
    gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.yml', 'src/**/*.js', 'src/**/*.css', 'src/**/*.jsx'], gulp.series('webpack', 'build:site', reload));
    // gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.yml', 'src/**/*.js', 'src/**/*.css', 'src/**/*.jsx'], gulp.series('jsx', 'build:site', reload));
    gulp.watch(['src/**/*.xml', 'src/**/*.txt'], gulp.series('site', reload));
    gulp.watch('src/assets/javascript/**/*.js', gulp.series('scripts', reload));
    gulp.watch('src/assets/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('src/assets/images/**/*', gulp.series('images', reload));
});