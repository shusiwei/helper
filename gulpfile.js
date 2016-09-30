var gulp = require('gulp'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  eslint = require('gulp-eslint'),
  clean = require('gulp-clean'),
  babel = require('gulp-babel');

// 清空资源
gulp.task('clean', function() {
  gulp.src('dist')
  .pipe(clean());
});

// 压缩modules文件
gulp.task('babel', function() {
  gulp.src(['src/helper.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(babel())
  .pipe(uglify({
    mangle: {
      except: ['require', 'exports', 'module']
    }
  }))
  .pipe(gulp.dest('dist'));
});

// 压缩CSS
gulp.task('css', function() {
  gulp.src(['src/helper.css'])
  .pipe(cleanCSS())
  .pipe(gulp.dest('dist'));
});

// DIST任务
gulp.task('default', ['clean'], function() {
  gulp.start('babel', 'css');
});
