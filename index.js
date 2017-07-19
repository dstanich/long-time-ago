/* eslint-env node */
const App = require('./src/app');
const argv = require('yargs').argv;

function addArgToConfig(config, key, value) {
	if (!config.args) {
		config.args = {};
	}
	config.args[key] = value;
}

// Load default config file or the one that was passed in
let config = require('./long-time-ago.config');
if (argv.config) {
	// If the file doesn't start with a relative path, then add it
	let file = argv.config;
	if (!argv.config.startsWith('.')) {
		file = './' + file;
	}

	// Try to load the file
	try {
		config = require(file);
		addArgToConfig(config, 'config', argv.config);
	} catch (err) {
		console.error('Config file "' + argv.config + '" is not valid.');
		process.exit(-1);
	}
}

// Check for the skipfirst flag
if (argv.skipfirst) {
	addArgToConfig(config, 'skipfirst', argv.skipfirst);
}

const appInstance = new App(config);
appInstance.start();