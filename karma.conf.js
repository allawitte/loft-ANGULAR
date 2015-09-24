module.exports = function(config){
	config.set({
		basePath: "./",

		files:[
		'bower_components/angular/angular.js',
		'bower_components/angular-route/angular-route.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'builds/dev/app/**/*.js'
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
			'karma-Chrome-launcher',
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