'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let wait = require('gulp-wait');

sass.compiler = require('node-sass');

function compileSass(minify) {
	let options = {
		includePaths: [ './sass/fonts', './sass/fonts/metropolis' ]
	};
	if (minify) {
		options['outputStyle'] = 'compressed'
	}
	let pipeline = gulp.src('./sass/main.scss')
		.pipe(wait(1000))
		.pipe(sass(options).on('error', sass.logError));

	if (minify) {
		pipeline = pipeline.pipe(rename(path => {
			return {
				dirname: path.dirname,
				basename: path.basename,
				extname: `.min${path.extname}`
			};
		}))
	}
	return pipeline.pipe(gulp.dest('./dist/css'));
}

function watchSass() {
	gulp.watch('./sass/**/*.scss', () => compileSass(false));
}

gulp.task('start', gulp.series(() => compileSass(false), watchSass));

gulp.task('build', gulp.series(() => compileSass(true)));