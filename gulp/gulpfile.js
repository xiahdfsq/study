var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	amdOptimize = require('amd-optimize');

gulp.task('default', function () {
	return gulp
		.src('./task/*.js')
		.pipe(amdOptimize('scroller', {
			name: "scroller",
			configFile: "./task/scroller.js",
			baseUrl: './task/'
		}))
		.pipe(concat('scroller.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dest/'));
});