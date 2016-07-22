import {extend, keys} from "lodash";
import relative = require('require-relative');
import {BiggConfig} from "./BiggConfig";

export default function bigg(biggConfig:BiggConfig, env, argv) {
  const allTasks = {};

  biggConfig.biggs.forEach((biggInstance) => {
    let tasks;

    if (typeof biggInstance === 'string') {
      tasks = relative(biggInstance);
    }
    else if (typeof biggInstance === 'function') {
      tasks = {};
      tasks[(biggInstance as any).name] = biggInstance;
    }
    else if (typeof biggInstance === 'object') {
      tasks = biggInstance;
    }

    extend(allTasks, tasks);
  });

  const taskToRun = argv._[0] || biggConfig.defaultTask || allTasks['default'];

  const toRun = allTasks[taskToRun];

  if (!toRun) {
    console.error(`Task ${taskToRun || '[unknown]'} found! Available tasks are:`, keys(allTasks));
  }
  else {
    toRun(argv);
  }
};