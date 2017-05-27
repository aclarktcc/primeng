'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    del = require('del'),
    flatten = require('gulp-flatten'),
    typescript = require('gulp-typescript'),
    sass = require('gulp-sass');
 
gulp.task('compile-theme-sass', function () {
  return gulp.src('resources/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('resources'));
});

gulp.task('build-css', function() {
	gulp.src([
        'components/common/common.css',
		'components/**/*.css'
    ])
	.pipe(concat('primeng.css'))
	.pipe(gulp.dest('resources'));
});

gulp.task('build-css-prod', function() {
    gulp.src([
        'components/common/common.css',
		'components/**/*.css'
    ])
	.pipe(concat('primeng.css'))
	.pipe(gulp.dest('resources'))
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(rename('primeng.min.css'))
    .pipe(gulp.dest('resources'));
});

gulp.task('compile-components', ['clean'], function () {
  return gulp
    .src('components/**/*.ts')
    .pipe(typescript('tsconfig.json'))
    .pipe(gulp.dest('components'))
});

gulp.task('compile-primeng', ['clean'], function () {
  return gulp
    .src('primeng.ts')
    .pipe(typescript('tsconfig.json'))
    .pipe(gulp.dest(''))
});

//Building images
gulp.task('images', function() {
    return gulp.src(['components/**/images/*.png', 'components/**/images/*.gif'])
        .pipe(flatten())
        .pipe(gulp.dest('resources/images'));
});

//Cleaning previous gulp tasks from project
gulp.task('clean', function() {
	del(['resources/primeng.css','resources/primeng.min.css','resources/images']);
});
//Building project with run sequence
gulp.task('build', ['clean','compile-theme-sass','build-css-prod', 'images']);

//Building project for npm deploy
gulp.task('build-package', ['clean', 'build-css-prod', 'images', 'compile-components', 'compile-primeng']);

gulp.task('deepclean', function() {
	del(['resources/primeng.css','resources/primeng.min.css','resources/images','components/**/*.js', 'components/**/*.d.ts', 'components/**/*.js.map','components/**/*.metadata.json', 'aot/', 'dist/']);
});
