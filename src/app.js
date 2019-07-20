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

    this._lastSuccessfulBaseImage = undefined;
    this._doImageLoop();
    this._doKeepAliveLoop();
  }

  _doImageLoop() {
    console.log('LOOP CHECK: ', new Date().toISOString());

    // Fetch initial data
    const today = new Date();
    const baseImage = this.imageManager.getBaseImage(today);
    const images = [baseImage];

    // If skip base image is set and we haven't started yet then skip the first image
    if (this.config.args.skipfirst && !this._lastSuccessfulBaseImage) {
      this._lastSuccessfulBaseImage = baseImage;
    }

    // Only do the loop if we have a new base image
    if (
      !this._lastSuccessfulBaseImage ||
      this._lastSuccessfulBaseImage.filename !== baseImage.filename
    ) {
      if (this.config.images.includeAll) {
        // Get all images that match the frequency unit until we don't find one
        let curImage = this.imageManager.getImageFromXXAgo(
          today,
          this.config.frequency.unit,
          this.config.frequency.value
        );
        while (curImage.exists()) {
          images.push(curImage);
          curImage = this.imageManager.getImageFromXXAgo(
            curImage.date,
            this.config.frequency.unit,
            this.config.frequency.value,
            true
          );
        }
      } else {
        // Fetch only the last image
        images.push(
          this.imageManager.getImageFromXXAgo(
            today,
            this.config.frequency.unit,
            this.config.frequency.value
          )
        );
      }

      // Send the email with the images
      console.log('SENDING IMAGES...');

      // Check to see if we need to resize images
      new Promise(resolve => {
        // No resize
        if (
          !this.config.resizePercentage ||
          !this.config.resizePercentage.size ||
          !this.config.resizePercentage.tmpDir
        ) {
          resolve();
          return;
        }

        // Reduce file sizes; alter each image object
        const resizePromises = [];
        images.forEach(image => {
          resizePromises.push(
            this.imageManager.resizeImage(
              image,
              this.config.resizePercentage.size
            )
          );
        });

        // Wait for all resize events, then send the files
        return Promise.all(resizePromises).then(() => resolve());
      })
        .catch(err => {
          console.error('Error resizing images');
          console.error(err);
        })
        .then(() => {
          console.log(images);
          this.mailClient.sendMessage(images);
        });

      this._lastSuccessfulBaseImage = baseImage;
    } else {
      console.log('NO NEW IMAGES');
    }

    console.log(
      'WAITING ' + this.config.frequency.howOften / 1000 / 60 + ' minutes'
    );
    console.log();
    setTimeout(this._doImageLoop.bind(this), this.config.frequency.howOften);
  }

  // Required because some platforms (Raspberry Pi) will not work with long loop times.
  // Keep alive will force things to work by pining it occasionally.
  _doKeepAliveLoop() {
    setInterval(() => {}, 10 * 60 * 1000);
  }
}

module.exports = App;
