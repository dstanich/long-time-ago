/* eslint-env node */
const App = require('./src/app');

// Load default config file or the one that was passed in
let config = require('./long-time-ago.config');
if (process.argv[2]) {
	// If the file doesn't start with a relative path, then add it
	let file = process.argv[2];
	if (!process.argv[2].startsWith('.')) {
		file = './' + file;
	}

	// Try to load the file
	try {
		config = require(file);
	} catch (err) {
		console.error('Config file "' + process.argv[2] + '" is not valid.');
		process.exit(-1);
	}
}

const appInstance = new App(config);
appInstance.start();