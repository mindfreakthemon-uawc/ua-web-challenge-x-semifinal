(function (global) {
	var map = {
		'app': 'build/app/app',
		'@angular': 'build/vendor/@angular',
		'rxjs': 'build/vendor/rxjs'
	};

	var packages = {
		'app': {
			main: 'main.js',
			defaultExtension: 'js'
		},
		'rxjs': {
			main: 'Rx.js',
			defaultExtension: 'js'
		}
	};

	var ngPackageNames = [
		'common',
		'compiler',
		'core',
		'forms',
		'http',
		'platform-browser',
		'platform-browser-dynamic',
		'router',
		'upgrade'
	];

	ngPackageNames.forEach(function (pkgName) {
		packages['@angular/' + pkgName] = {
			main: System.packageWithIndex ? 'index.js' : 'bundles/' + pkgName + '.umd.js',
			defaultExtension: 'js'
		};
	});

	System.config({
		map: map,
		meta: {
			'google-maps': {
				format: 'global',
				exports: 'google',
				scriptLoad: true
			}
		},
		packages: packages
	});
})(this);
