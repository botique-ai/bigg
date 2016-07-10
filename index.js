'use strict';

const relative = require('require-relative');
const _ = require('lodash');

module.exports.default = function bigg(biggConfig) {
  const allTasks = {};
  
  biggConfig.biggs.forEach((biggFile) => {
    const tasks = relative(biggFile);

    _.extend(allTasks, tasks);
  });

  const toRun = allTasks[process.argv[2] || biggConfig.defaultTask];

  if (!toRun) {
    console.error('No task found!');
  }
  else {
    toRun();
  }
};

