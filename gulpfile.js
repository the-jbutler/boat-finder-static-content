'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');

sass.compiler = require('node-sass');

function compileSass() {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css'));
}

function watchSass() {
	gulp.watch('./sass/**/*.scss', compileSass);
}

gulp.task('start', gulp.series(compileSass, watchSass));

gulp.task('build', gulp.series(compileSass));