const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const svgSprite = require('gulp-svg-sprite');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const changed = require('gulp-changed');


gulp.task('clean:dev', function (done) {
	if (fs.existsSync('./dist/')) {
		return gulp
			.src('./dist/', { read: false })
			.pipe(clean({ force: true }));
	}
	done();
});

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

gulp.task('html:dev', function () {
	return (
		gulp
			.src('./src/*.html')
			.pipe(changed('./dist/', { hasChanged: changed.compareContents }))
			.pipe(fileInclude(fileIncludeSetting))
			.pipe(gulp.dest('./dist/'))
	);
});

gulp.task('sass:dev', function () {
	return (
		gulp
			.src('./src/scss/*.scss')
			.pipe(changed('./dist/css/'))
			.pipe(sourceMaps.init())
			.pipe(sassGlob())
			.pipe(sass())
			.pipe(sourceMaps.write())
			.pipe(gulp.dest('./dist/css/'))
	);
});

gulp.task('images:dev', function () {
	return gulp
		.src(['./src/img/**/*', '!./src/img/svg/**/*.svg'])
		.pipe(changed('./dist/img/'))
		.pipe(gulp.dest('./dist/img/'));
});

gulp.task('svgSprites:dev', function() {
	return gulp.src('./src/img/svg/**/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../sprite.svg'
				}
			}
		}))
		.pipe(gulp.dest('./dist/img/svg'))
})

gulp.task('fonts:dev', function () {
	return gulp
		.src('./src/fonts/**/*')
		.pipe(changed('./dist/fonts/'))
		.pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('files:dev', function () {
	return gulp
		.src('./src/files/**/*')
		.pipe(changed('./dist/files/'))
		.pipe(gulp.dest('./dist/files/'));
});

gulp.task('js:dev', function () {
	return gulp
		.src('./src/js/*.js')
		.pipe(changed('./dist/js/'))
		.pipe(plumber(plumberNotify('JS')))
		// .pipe(babel())
		.pipe(webpack(require('./../webpack.config.js')))
		.pipe(gulp.dest('./dist/js/'));
});

const serverOptions = {
	livereload: true,
	open: true,
};

gulp.task('server:dev', function () {
	return gulp.src('./dist/').pipe(server(serverOptions));
});

gulp.task('watch:dev', function () {
	gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
	gulp.watch('./src/*.html', gulp.parallel('html:dev'));
	gulp.watch('./src/img/**/*', gulp.parallel('images:dev'));
	gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
	gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
	gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
});
