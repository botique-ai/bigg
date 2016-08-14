#!/usr/bin/env node
import Liftoff = require('liftoff');
import minimist = require('minimist');

const argv:any = minimist(process.argv.slice(2), {
  stopEarly: true
});

const Bigg = new Liftoff({
  name: 'bigg',
  moduleName: 'bigg',
  configName: 'bigg.config',
  extensions: require('interpret').jsVariants
});

Bigg.launch({
  cwd: argv.cwd,
  configPath: argv.config,
  require: argv.require,
  completion: argv.completion,
  verbose: argv.verbose
}, invoke);

function invoke (env) {
  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd);
    console.log('Working directory changed to', env.cwd);
  }

  if (!env.modulePath) {
    console.log('Local', Bigg.moduleName, 'module not found in: ', env.cwd);
    process.exit(1);
  }

  if (env.configPath) {
    const biggConfig = require(env.configPath);
    require(env.modulePath).default(biggConfig, env, argv);
  } else {
    console.error('No ', Bigg.configName, ' found.');
    process.exit(1);
  }
}