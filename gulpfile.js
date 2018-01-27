'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const del = require('del');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync').create();
const notify = require( 'gulp-notify' );
const newer = require('gulp-newer');
const remember = require('gulp-remember');
const cached = require('gulp-cached');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');

gulp.task('clean', function(){
	return del('./public')
})

gulp.task('views', function() {
	return gulp.src('src/views/*.pug')
	.pipe(plumber())
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('./public'));
});



gulp.task('styles', function() {
	return gulp.src('src/less/*.less')
	.pipe(plumber())
	.pipe(less())
	.pipe(autoprefixer())
	.pipe(gulp.dest('public/css'));
});

gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.*')
	.pipe(plumber())
	.pipe(gulp.dest('public/js'))
});

gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*.*', {since: gulp.lastRun('fonts')})
		.pipe(plumber())
		.pipe(cached('fonts'))
		.pipe(remember('fonts'))
		.pipe(newer('fonts'))
		.pipe(gulp.dest('public/fonts'))
});

gulp.task('images', function() {
	return gulp.src('src/images/**/*.*', {since: gulp.lastRun('images')})
		.pipe(plumber())
		.pipe(cached('images'))
		.pipe(remember('images'))
		.pipe(newer('images'))
		.pipe(imagemin())
		.pipe(gulp.dest('public/images'))
});

gulp.task('watch', function() {
	gulp.watch('src/fonts/**/*.*', gulp.series('fonts'));
	gulp.watch('src/images/**/*.*', gulp.series('images'));
	gulp.watch('src/less/**/*.*', gulp.series('styles'));
	gulp.watch('src/views/**/*.*', gulp.series('views'));
	gulp.watch('src/js/**/*.*', gulp.series('scripts'));
});

gulp.task('serve', function() {
	browserSync.init({
		server: 'public'
	});

	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});


gulp.task('build', gulp.series('clean', gulp.parallel('views', 'styles', 'scripts', 'fonts', 'images')));

gulp.task('dev',
	gulp.series('build', gulp.parallel('watch', 'serve'))
);