let gulp = require('gulp');
let stylus = require('gulp-stylus');
let plumber = require('gulp-plumber');
let connect = require('gulp-connect');
let concat = require('gulp-concat');
let del = require('del');

const STYLUS_SRC_GLOB = 'assets/styles/**/*.styl';
const STYLUS_OUT_DIR = 'build/css';

/**
 * Compiles each styl file and places it in css dir.
 */
gulp.task('css', ['css:clear'], () => {
	return gulp.src(STYLUS_SRC_GLOB)
		.pipe(plumber())
		.pipe(stylus({
			pretty: true
		}))
		.pipe(gulp.dest(STYLUS_OUT_DIR))
		.pipe(connect.reload());
});

/**
 * Compiles each styl file into one build.main.css and places it in css dir.
 * Inlines all the images via base64 data URI.
 */
gulp.task('css:bundle', ['css:clear'], () => {
	return gulp.src(STYLUS_SRC_GLOB)
		.pipe(plumber())
		.pipe(stylus({
			compress: true,
			rawDefine: {
				url: stylus.stylus.url({
					limit: false
				})
			}
		}))
		.pipe(concat('bundle.min.css'))
		.pipe(gulp.dest(STYLUS_OUT_DIR))
		.pipe(connect.reload());
});

gulp.task('css:watch', () => gulp.watch(STYLUS_SRC_GLOB, ['css']));

gulp.task('css:clear', () => {
	return del([STYLUS_OUT_DIR]);
})
