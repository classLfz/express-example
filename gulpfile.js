const gulp = require('gulp');
const apidoc = require('gulp-apidoc');
const eslint = require('gulp-eslint');
const eslintrc = require('./.eslintrc.json');
const mocha = require('gulp-mocha');

// 构建apidoc
gulp.task('apidoc', (done) => {
  apidoc({
    src: 'src/',
    dest: 'docs',
    debug: true,
    includeFilters: ['.*\\.js$']
  }, done);
});

// 进行语法检查
gulp.task('lint', () => {
  return gulp.src([
    '!node_modules/**',
    '!docs/**',
    './**/*.js'
  ])
  .pipe(eslint(eslintrc))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

// 测试
gulp.task('test', () => {
  gulp.src('./src/**/test.js')
    .pipe(mocha({ui: 'tdd'}))
    .once('end', () => {
      process.exit();
    });
});