/* eslint-env node */
const moment = require('moment');
const gm = require('gm').subClass({ imageMagick: true });

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

  resizeImage(/*Image*/ image, /*string*/ percentage) {
    return new Promise((resolve, reject) => {
      try {
        const newFilename = `${this.config.resizePercentage.tmpDir}${image.filename}`;
        gm(`${image.path}${image.filename}`)
          .autoOrient()
          .resize(percentage)
          .write(newFilename, error => {
            if (error) {
              throw error;
            }
            image.path = this.config.resizePercentage.tmpDir;
            resolve();
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  static getInstance(config) {
    return new ImageManager(config);
  }
}

module.exports = ImageManager.getInstance;
