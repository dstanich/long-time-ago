/* eslint-env node */
const App = require('./src/app');
const argv = require('yargs').argv;

function addArgToConfig(config, key, value) {
  if (!config.args) {
    config.args = {};
  }
  config.args[key] = value;
}

// Load config file from args
let config;
if (argv.config) {
  // Try to load the file
  try {
    config = require(argv.config);
    addArgToConfig(config, 'config', argv.config);
  } catch (err) {
    console.error('Config file "' + argv.config + '" is not valid.');
    process.exit(-1);
  }
} else {
  console.error('--config flag was not passed in');
  process.exit(-1);
}

// Check for the skipfirst flag
if (argv.skipfirst) {
  addArgToConfig(config, 'skipfirst', argv.skipfirst);
}

const appInstance = new App(config);
appInstance.start();
