# long-time-ago
Application designed to help recall memories through sending old pictures to your e-mail inbox.  Configurable with various options, `long-time-ago` will send e-mails to a defined list with one or more images based on the configuration.

## Why?
When my wife and I had our first son, we realized after a month that we had pictures from every day of his life.  Since then, we decided to continue to save a picture per day.  After several years, we've found it was a lot of fun looking back at this day, a year ago, and compare how our son had changed.  Now that we have another child, this is even more important to recall these memories.

`long-time-ago` was primarily designed around this use case.  Every day, we wanted to receive an e-mail that contains yesterday's picture and all pictures from this day in previous years.

## Starting
Start the process locally using the GitHub repo.

1.  Clone repo
1.  `cd long-time-ago`
1.  `npm install`
1.  Create a configuration file.  Use `long-time-ago.config.js` as a guide.  This file can be edited directly or you can create a new filename with the same format.
1.  `npm start -- --config CONFIG-FILENAME.js`

The application is meant to run as a long running process.  This works best if you run it in the background or inside something like `screen`.

## Command Line Args
Arguments can be passed as part of the `npm start` command by passing them after `--`.

`npm start -- ARGS HERE`

| Argument | Purpose |
| ------------- | ------------- |
| `--config CONFIG-FILE` | Specifies configuration file to use. |
| `--skipfirst` | Skips the first image and will not send it as an email.  Useful if you are restarting a process and don't want to trigger an e-mail. |

## Configuration File
Configuation values are described in comments in the `long-time-ago.config.js` file.  The configuration file is required in order for `long-time-ago` to function properly.

## Using Docker
`long-time-ago` can be run within a Docker container if desired.  The image is not yet published to DockerHub, however the `Dockerfile` is located in this repo and can be downloaded, built, and run locally.

The container assumes that the config file is named `long-time-ago.config.js` and is located in the `/data` directory inside the container.  A directory/volume should be provided when starting that contains this.  You can override the name path by setting the `CONFIG_FILE` environment variable.

1.  Clone repo
1.  `cd long-time-ago`
1.  Build the image: `docker build -t YOUR_NAME/long-time-ago:1.0.0 .`
1.  Create a Docker volume: `docker create volume VOLUME_NAME`
1.  Run the container: `docker run -d -v VOLUME_NAME:/data --name=NAME_OF_CONTAINER YOUR_NAME/long-time-ago:1.0.0`
1.  Check logs if desired: `docker logs NAME_OF_CONTAINER`


## TODO List
- [ ] Better handling when images are not there
- [ ] Tests
- [ ] Build
- [ ] Publish to NPM
- [ ] Dynamic updating of e-mail list without having to restart app
