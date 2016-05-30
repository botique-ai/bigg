#!/usr/bin/env node

'use strict';

const gulp = require('gulp');
const relative = require('require-relative');

const biggConfig = relative('./bigg.config.js', process.cwd());

biggConfig.gulps.forEach((gulpFile) => {
  relative(gulpFile)(gulp);
});

if (biggConfig.defaultTask) {
  gulp.task('default', biggConfig.defaultTask);
}

gulp.start(process.argv[2] || 'default');