/* eslint-env node */
const moment = require('moment');
const Image = require('./image');

class ImageManager {
	constructor(config) {
		this.config = config;
	}

	getBaseImage(/*date*/originDate) {
		return this._getImageFromXXAgo(originDate);
	}

	getImageFromADayAgo(/*date*/originDate, /*boolean*/ignoreOffset) {
		return this._getImageFromXXAgo(originDate, 'day', ignoreOffset);
	}

	getImageFromAMonthAgo(/*date*/originDate, /*boolean*/ignoreOffset) {
		return this._getImageFromXXAgo(originDate, 'month', ignoreOffset);
	}

	getImageFromAYearAgo(/*date*/originDate, /*boolean*/ignoreOffset) {
		return this._getImageFromXXAgo(originDate, 'year', ignoreOffset);
	}

	_getImageFromXXAgo(/*date*/originDate, /*string*/unit, /*boolean*/ignoreOffset) {
		// Subtract the bsae offset, if defined and not ignored
		let date = moment(originDate);
		if (!ignoreOffset && this.config.baseDateOffset.value && this.config.baseDateOffset.unit) {
			date = date.subtract(this.config.baseDateOffset.value, this.config.baseDateOffset.unit);
		}

		// Subtract the frequency unit, if defined
		if (unit) {
			date = date.subtract(1, unit);
		}

		// Create and return the image
		let filename = date.format(this.config.images.format) + this.config.images.extension;
		return new Image(filename, this.config.images.path, date.toDate());
	}

	static getInstance(config) {
		return new ImageManager(config);
	}
}

module.exports = ImageManager.getInstance;