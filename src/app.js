/* eslint-env node */
const MailClient = require('./mail-client');
const imageManager = require('./image-manager');

class App {
	constructor(config) {
		this.config = config;
		this.mailClient = new MailClient(config);
		this.imageManager = imageManager(config);
	}

	start() {
		console.log('-------------');
		console.log('LONG TIME AGO');
		console.log('-------------');

		this._doImageLoop();
	}

	_doImageLoop() {
		console.log('LOOP CHECK: ', new Date());

		// Fetch initial data
		const today = new Date();
		const baseImage = this.imageManager.getBaseImage(today);
		const images = [ baseImage ];

		if (this.config.images.includeAll) {
			// Get all images that match the frequency unit until we don't find one
			let curImage = this._getImage(today, this.config.frequency.unit);
			while (curImage.exists()) {
				images.push(curImage);
				curImage = this._getImage(curImage.date, this.config.frequency.unit, true);
			}
		} else {
			// Fetch only the last image
			images.push(this._getImage(today, this.config.frequency.unit));
		}

		// Send the email with the images
		console.log('SENDING IMAGES...');
		console.log(images);
		this.mailClient.sendMessage(images);
		console.log();

		setTimeout(this._doImageLoop.bind(this), this.config.frequency.howOften);
	}

	_getImage(date, unit, ignoreOffset) {
		if (unit === 'year') {
			return this.imageManager.getImageFromAYearAgo(date, ignoreOffset);
		} else if (unit === 'month') {
			return this.imageManager.getImageFromAMonthAgo(date, ignoreOffset);
		} else if (unit === 'day') {
			return this.imageManager.getImageFromADayAgo(date, ignoreOffset);
		}
	}
}

module.exports = App;