var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	amdOptimize = require('amd-optimize');

gulp.task('default', function () {
	return gulp
		.src('./src/*.js')
		.pipe(amdOptimize('c', {
			name: "c",
			configFile: "./src/c.js",
			baseUrl: './src/'
		}))
		.pipe(concat('c.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dest/'));
});