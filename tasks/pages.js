let gulp = require('gulp');
let pug = require('gulp-pug');
let connect = require('gulp-connect');
let plumber = require('gulp-plumber');
let inject = require('gulp-inject');
let inline = require('gulp-inline-source');
let series = require('stream-series');

const PAGES_SRC_GLOB = 'assets/index.pug';

/**
 * Injects vendor bundle into js section and all css files into css section.
 */
gulp.task('pages', ['vendor:bundle', 'app', 'css'], () => {
	return gulp.src(PAGES_SRC_GLOB)
		.pipe(plumber())
		.pipe(inject(gulp.src('build/bundle/vendor.js', { read: false }), {
			addRootSlash: false
		}))
		.pipe(inject(gulp.src('build/css/*.css', { read: false }), {
			addRootSlash: false
		}))
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest('.'))
		.pipe(connect.reload());
});

/**
 * Injects vendor bundle, app bundle into js section and all css into css section.
 */
gulp.task('pages:bundle', ['vendor:bundle', 'app:bundle', 'css:bundle'], () => {
	let vendor = gulp.src('build/bundle/vendor.js', { read: false });
	let app = gulp.src('build/bundle/app.min.js', { read: false });

	return gulp.src(PAGES_SRC_GLOB)
		.pipe(plumber())
		.pipe(inject(series(vendor, app), {
			addRootSlash: false
			// transform: (filepath) => `script(inline, src='${filepath}')`
		}))
		.pipe(inject(gulp.src('build/css/*.css', { read: false }), {
			addRootSlash: false,
			transform: (filepath) => `link(inline, rel='stylesheet', href='${filepath}')`
		}))
		.pipe(pug())
		.pipe(inline({
			rootpath: '.'
		}))
		.pipe(gulp.dest('.'))
		.pipe(connect.reload());
});

gulp.task('pages:watch', () => gulp.watch(PAGES_SRC_GLOB, ['pages']));
