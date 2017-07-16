/* eslint-env node */
const fs = require('fs');

class Image {
	constructor(filename, path, date) {
		this.filename = filename;
		this.path = path;
		this.date = date;
	}

	exists() {
		return fs.existsSync(this.path + this.filename);
	}
}

module.exports = Image;