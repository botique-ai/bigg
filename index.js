'use strict';

const relative = require('require-relative');
const _ = require('lodash');

module.exports.default = function bigg(biggConfig, env, argv) {
  const allTasks = {};
  
  biggConfig.biggs.forEach((biggInstance) => {
    let tasks;

    if (typeof biggInstance === 'string') {
      tasks = relative(biggInstance);
    }
    else if (typeof biggInstance === 'function') {
      tasks = {};
      tasks[biggInstance.name] = biggInstance;
    }
    else if (typeof biggInstance === 'object') {
      tasks = biggInstance;
    }

    _.extend(allTasks, tasks);
  });

  const toRun = allTasks[process.argv[2] || biggConfig.defaultTask];

  if (!toRun) {
    console.error('No task found!');
  }
  else {
    toRun(argv);
  }
};