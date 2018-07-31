/* eslint-env node */
const moment = require('moment');
const Image = require('./image');

class ImageManager {
  constructor(config) {
    this.config = config;
  }

  getBaseImage(/*date*/ originDate) {
    return this.getImageFromXXAgo(originDate);
  }

  getImageFromXXAgo(
    /*date*/ originDate,
    /*string*/ unit,
    /*int*/ value,
    /*boolean*/ ignoreOffset
  ) {
    // Subtract the base offset, if defined and not ignored
    let date = moment(originDate);
    if (
      !ignoreOffset &&
      this.config.baseDateOffset.value &&
      this.config.baseDateOffset.unit
    ) {
      date = date.subtract(
        this.config.baseDateOffset.value,
        this.config.baseDateOffset.unit
      );
    }

    // Subtract the frequency unit, if defined
    if (unit) {
      date = date.subtract(value, unit);
    }

    // Create and return the image
    let filename =
      date.format(this.config.images.format) + this.config.images.extension;
    return new Image(filename, this.config.images.path, date.toDate());
  }

  static getInstance(config) {
    return new ImageManager(config);
  }
}

module.exports = ImageManager.getInstance;
