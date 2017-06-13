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
        'src/app/components/common/common.css',
		    'src/app/components/**/*.css'
    ])
	.pipe(concat('primeng.css'))
	.pipe(gulp.dest('resources'));
});

gulp.task('build-css-prod', function() {
    gulp.src([
        'src/app/components/common/common.css',
        'src/app/components/**/*.css'
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

gulp.task('images', function() {
    return gulp.src(['src/app/components/**/images/*.png', 'src/app/components/**/images/*.gif'])
        .pipe(flatten())
        .pipe(gulp.dest('resources/images'));
});

gulp.task('themes', function() {
    return gulp.src(['src/assets/components/themes/**/*'])
        .pipe(gulp.dest('resources/themes'));
});

//Cleaning previous gulp tasks from project
gulp.task('clean', function() {
	del(['resources']);
});
//Building project with run sequence
gulp.task('build-assets', ['clean','build-css-prod', 'images', 'themes']);

//Building project for npm deploy
gulp.task('build-package', ['clean', 'build-css-prod', 'images', 'compile-components', 'compile-primeng']);

gulp.task('deepclean', function() {
	del(['resources/primeng.css','resources/primeng.min.css','resources/images','components/**/*.js', 'components/**/*.d.ts', 'components/**/*.js.map','components/**/*.metadata.json', 'aot/', 'dist/']);
});
