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
		'bower_components/angular-route/angular-route.js',
		'bower_components/angular-bootstrap/ui-bootstrap.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
		])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('build/dev'));

	gulp.src('build/dev/app/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build/dev'));

	gulp.src('build/dev/app/**/*.scss')
		.pipe(scss())
		.pipe(concat('app.css'))
		//autoprefix
		//minification
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
});

gulp.task('webserver', function(){
	gulp.src('build/dev/')
	.pipe(webserver({
		livereload : true,
		open : true
	}));
});

gulp.task('watch',function(){
	gulp.src('build/dev/app/**/*.js', ['js']);
	gulp.src('build/dev/app/**/*.scss', ['css']);
})

gulp.task('default', [
	'js',
	'css',
	'watch',
	'webserver'
	]);