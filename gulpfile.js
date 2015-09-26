'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	scss = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	webserver = require('gulp-webserver');

gulp.task('js', function(){
	gulp.src([
		'bower_components/angular/angular.js',
		//'bower_components/angular-route/angular-route.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js',
		'bower_components/angular-bootstrap/ui-bootstrap.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
		])
		.pipe(ngAnnotate())
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('build/dev'));

	

	gulp.src([
			'build/dev/app/*.js',
			'build/dev/app/**/*.js',
			'!build/dev/app/**/*_test.js',
			])
		.pipe(concat('app.js'))
		
		.pipe(gulp.dest('build/dev'));
});





gulp.task('app', function(){
	gulp.src([
			'build/dev/app/*.js',
			'build/dev/app/**/*.js',
			'!build/dev/app/**/*_test.js',
			])
		.pipe(concat('app.js'))
		
		.pipe(gulp.dest('build/dev'));
});

gulp.task('css',function(){
	gulp.src([
		'bower_components/bootstrap/dist/css/bootstrap.css',
		'bower_components/bootstrap/dist/css/bootstrap-theme.css',
		'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
		'bower_components/angular/angular-csp.css'
		])
		.pipe(concat('theme.css'))
		.pipe(gulp.dest('build/dev'));

	gulp.src('build/dev/app/**/*.scss')
		.pipe(scss())
		.pipe(concat('app.css'))
		//autoprefix
		//minification
		.pipe(gulp.dest('build/dev'));
});


gulp.task('webserver', function(){
	gulp.src('build/dev/')
	.pipe(webserver({
		livereload : true,
		open : true
	}));
});


gulp.task('watch',function(){
	gulp.watch('build/dev/app/**/*.js', ['js']);
	gulp.watch('build/dev/app/**/*.scss', ['css']);
	//gulp.watch('build/dev/app/**/*.*', ['app']);
});
//================  productions tasks  =====================

gulp.task('pjs', function(){
	gulp.src([
		'bower_components/angular/angular.min.js',
		//'bower_components/angular-route/angular-route.js',
		'bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'bower_components/angular-bootstrap/ui-bootstrap.min.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
		])
		.pipe(ngAnnotate())
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('build/prod'));

	

	gulp.src([
			'build/dev/app/*.js',
			'build/dev/app/**/*.js',
			'!build/dev/app/**/*_test.js',
			])
		.pipe(ngAnnotate())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/prod'));
});


gulp.task('pcss',function(){
	gulp.src([
		'bower_components/bootstrap/dist/css/bootstrap.min.css',
		'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
		'bower_components/angular-bootstrap/ui-bootstrap-csp.min.css',
		'bower_components/angular/angular-csp.min.css'
		])
		.pipe(concat('theme.css'))
		//.pipe(minify())
		.pipe(gulp.dest('build/prod'));

		gulp.src('build/dev/app/**/*.scss')
		.pipe(scss())
		.pipe(concat('app.css'))
		//autoprefix
		//minification
		.pipe(gulp.dest('build/prod'));
});

gulp.task('pwebserver', function(){
	gulp.src('build/prod/')
	.pipe(webserver({
		livereload : true,
		open : true
	}));
});
gulp.task('html', function(){
	gulp.src([
		'build/dev/app/**/*.html',
		'build/dev/*.html'
		])
	.pipe(gulp.dest('build/prod'));
})
gulp.task('pwatch',function(){
	gulp.watch('build/prod/app/**/*.js', ['js']);
	gulp.watch('build/prod/app/**/*.scss', ['css']);
	gulp.watch('build/prod/app/**/*.html', ['phtml']);
})

gulp.task('default', [
	'js',
	'css',
	//'app',
	'webserver',
	'watch'
	]);

gulp.task('prod',[
	'pjs',
	'pcss',
	'html',
	'pwebserver',
	'pwatch'
	])