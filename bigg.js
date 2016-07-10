#!/usr/bin/env node

'use strict';

const Liftoff = require('liftoff');
const argv = require('minimist')(process.argv.slice(2));

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
  if (argv.verbose) {
    console.log('LIFTOFF SETTINGS:', this);
    console.log('CLI OPTIONS:', argv);
    console.log('CWD:', env.cwd);
    console.log('LOCAL MODULES PRELOADED:', env.require);
    console.log('SEARCHING FOR:', env.configNameRegex);
    console.log('FOUND CONFIG AT:',  env.configPath);
    console.log('CONFIG BASE DIR:', env.configBase);
    console.log('YOUR LOCAL MODULE IS LOCATED:', env.modulePath);
    console.log('LOCAL PACKAGE.JSON:', env.modulePackage);
    console.log('CLI PACKAGE.JSON', require('./package'));
  }

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
    require(env.modulePath).default(biggConfig);
  } else {
    console.log('No ', Bigg.configName, ' found.');
  }
}