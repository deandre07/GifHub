import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import mergeStream from 'merge-stream';

gulp.task('browserify', ['clean'], function() {
    const sites = {
        github: 'src/js/sites/GitHub/index.js',
        bitbucket: 'src/js/sites/BitBucket/index.js',
    };

    const streams = Object.keys(sites).forEach(site => (
        browserifyPipe(site, sites[site], 'dist/chrome')
    ));

    return mergeStream.apply(this, streams);
});

function browserifyPipe(name, inPath, outFolder) {
    return browserify({
        entries: inPath,
        debug: true
    }).transform('babelify')
    .transform('brfs')
    .bundle()
    .pipe(source(`${name}.js`))
    .pipe(buffer())
    .pipe(gulp.dest(outFolder));
}
