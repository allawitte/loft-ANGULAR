module.exports = function(config){
	config.set({
		basePath: "./",

		files:[
		'bower_components/angular/angular.js',
		'bower_components/angular-route/angular-route.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js',
		'bower_components/angular-bootstrap/ui-bootstrap.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'build/dev/app/**/*.js'
		],
		autoWatch : true,
		frameworks: ['jasmine'],
		browsers : [
		'Chrome',
		//'Mozilla',
		//'Safari',
		//'Opera'
		],
		plugins : [
			'karma-chrome-launcher',
			'karma-jasmine',
			'karma-junit-reporter'
		],
		reporters: ['progress', 'junit'],
		junitReporter : {
			outputDir : 'test_out',
			outputFile : 'unit.xml',
			suite: ''
		}
	})
}