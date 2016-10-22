let gulp = require('gulp');
let pug = require('gulp-pug');
let connect = require('gulp-connect');
let plumber = require('gulp-plumber');
let del = require('del');
let rename = require('gulp-rename');

const TEMPLATE_SRC_GLOB = 'app/**/*.pug';
const TEMPLATE_OUT_DIR = 'build/templates';

/**
 * Compiles templates.
 */
gulp.task('templates', ['templates:clear'], () => {
	return gulp.src(TEMPLATE_SRC_GLOB, { base: 'app' })
		.pipe(plumber())
		.pipe(pug({ pretty: true }))
		.pipe(rename((path) => {
			path.dirname = path.dirname.replace(/(^|\/)tmpl/, '');
		}))
		.pipe(gulp.dest(TEMPLATE_OUT_DIR))
		.pipe(connect.reload());
});

gulp.task('templates:watch', () => gulp.watch(TEMPLATE_SRC_GLOB, ['templates']));

gulp.task('templates:clear', () => {
	return del([TEMPLATE_OUT_DIR]);
});
