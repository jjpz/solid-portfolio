const { src, dest, watch, parallel } = require('gulp');
const prefixCss = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');
const cleanCss = require('gulp-clean-css');
const webpack = require('webpack-stream');
const mode = require('gulp-mode')();
const browserSync = require('browser-sync').create();

let isProd = mode.production();
let environment = 'development';

let checkEnv = () => {
	if (isProd) environment = 'production';
}

let css = () => {
	return src('src/css/main.css', { sourcemaps: true })
		.pipe(prefixCss())
		.pipe(concatCss('style.css'))
		.pipe(mode.production(cleanCss({
			format: {
				level: 2,
				breaks: {afterComment: true}
			}
		})))
		.pipe(dest('public', { sourcemaps: '.' }))
		.pipe(browserSync.stream());
}

let js = () => {
	checkEnv();
	return src('src/js/*.js')
		.pipe(webpack({
			mode: environment,
			output: {
				filename: 'script.js'
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env']
							}
						}
					}
				]
			},
		}))
		.pipe(dest('public'))
		.pipe(browserSync.stream());
}

exports.watch = () => {
	browserSync.init({
		proxy: 'localhost:8585',
		// server: {baseDir: '.'}
	});
	watch([
			'views/**/*.ejs',
			'public/style.css'
		]).on('change', browserSync.reload);
	watch('src/js/*.js', js);
}

// production build command: gulp build --production
exports.build = js;
// exports.build = parallel(css, js);
