const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const {join} = require('path');

// 入口文件
const entries = join(__dirname, './src/server/**/*.js');
// 清洗目录
const clearEntries = join(__dirname, './src/server/config/index.js');

// 构建开发环境
function buildDev () {
  return watch(entries, { ignoreInitial: false }, function () {
    gulp.src(entries)
      .pipe(babel({ // es6 -> es5
        babelrc: false,
        plugins: ["@babel/plugin-transform-modules-commonjs"]
      }))
      .pipe(gulp.dest('./dist'));
  });
}
// 构建生产环境
function buildProd () {
  return gulp.src(entries)
    .pipe(babel({ // es6 -> es5
      babelrc: false,
      ignore: [clearEntries],
      plugins: ["@babel/plugin-transform-modules-commonjs"]
    }))
    .pipe(gulp.dest('./dist'));
}
// 构建hint环境
function buildHint () {
  return gulp.src(entries)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
// 构建清洗环境
function buildClear () {
  return gulp.src(clearEntries)
    .pipe(rollup({
      plugins: [
        replace({
          "process.env.NODE_ENV": "production"
        })
      ],
      input: clearEntries,
      output: {
        format: 'cjs'
      }
    }))
    .pipe(gulp.dest('./dist'));
}

let _build = gulp.series(buildDev);
// 生产环境
if ('production' === process.env.NODE_ENV) _build = gulp.series(buildHint, buildProd, buildClear);
// eslint
if ('hint' === process.env.NODE_ENV) _build = gulp.series(buildHint);

gulp.task('default', _build);
