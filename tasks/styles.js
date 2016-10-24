let gulp = require('gulp');
let stylus = require('gulp-stylus');
let connect = require('gulp-connect');
let postcss = require('gulp-postcss');
let plumber = require('gulp-plumber');
let del = require('del');
let autoprefixer = require('autoprefixer');
let rename = require('gulp-rename');

const STYLES_SRC_GLOB = 'app/**/*.styl';
const STYLES_OUT_DIR = 'build/styles';

/**
 * Compiles templates.
 */
gulp.task('styles', ['styles:clear'], () => {
	return gulp.src(STYLES_SRC_GLOB, { base: 'app' })
		.pipe(plumber())
		.pipe(stylus({ pretty: true }))
		.pipe(rename((path) => {
			path.dirname = path.dirname.replace(/(^|\/)styles/, '');
		}))
		.pipe(postcss([
			autoprefixer({ browsers: ['last 2 versions'] })
		]))
		.pipe(gulp.dest(STYLES_OUT_DIR))
		.pipe(connect.reload());
});

gulp.task('styles:watch', () => gulp.watch(STYLES_SRC_GLOB, ['styles']));

gulp.task('styles:clear', () => {
	return del([STYLES_OUT_DIR]);
});



