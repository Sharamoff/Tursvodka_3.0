'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	prefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

var path = {
	build: {
		html:   'BUILD/',
		js:     'BUILD/js/',
		css:    'BUILD/css/',
		img:    'BUILD/img/',
		fonts:  'BUILD/fonts/'
	},
	src: {
		html:   'SRC/*.html',
		js:     'SRC/js/*.js',
		style:  'SRC/style/*.scss',
		img:    'SRC/img/**/*.*',
		fonts:  'SRC/fonts/**/*.*'
	},
	watch: {
		html:   'SRC/**/*.html',
		js:     'SRC/js/**/*.js',
		style:  'SRC/style/**/*.scss',
		img:    'SRC/img/**/*.*',
		fonts:  'SRC/fonts/**/*.*'
	},
	clean: './build'
};

var config = {
	server: {
		baseDir: "./build"
	},
	tunnel: false,
	host: 'localhost',
	port: 3000,
	logPrefix: "Promoting"
};

gulp.task('html:build', function(done) {
	return gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('js:build', function(done) {
	return gulp.src(path.src.js)
		.pipe(rigger())
		//.pipe(sourcemaps.init())
		//.pipe(uglify()) !не минимизируем
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

gulp.task('style:build', function(done) {
	return gulp.src(path.src.style)
		.pipe(plumber())
		//.pipe(sourcemaps.init())
		.pipe(sass({
			sourceMap: false,
			errLogToConsole: true
		}))
		.pipe(prefixer())
		//.pipe(cssmin()) !не минимизируем
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('image:build', function(done) {
	return gulp.src(path.src.img)
		.pipe(cache(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		})))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true}));
});

gulp.task('fonts:build', function(done) {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', gulp.parallel(
	'html:build',
	'js:build',
	'style:build',
	'fonts:build',
	'image:build'
	)
);


gulp.task('watch', function(done) {
	gulp.watch(path.watch.html,  gulp.parallel('html:build'));
	gulp.watch(path.watch.js,    gulp.parallel('js:build'));
	gulp.watch(path.watch.style, gulp.parallel('style:build'));
	gulp.watch(path.watch.fonts, gulp.parallel('fonts:build'));
	gulp.watch(path.watch.img, gulp.parallel('image:build'));
	done();
});


gulp.task('webserver', function(done) {
	browserSync.init(config);
	done();
});


gulp.task('clean', function(cb) {
	rimraf(path.clean, cb);
});


gulp.task('default', gulp.series('build', 'webserver', 'watch'));