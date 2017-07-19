# long-time-ago
Application designed to help recall memories.  Configurable with various options, `long-time-ago` will send e-mails to a defined list with one or more images based on the configuration.

## Why?
When my wife and I had our first son, we realized after a month that we had pictures from every day of his life.  Since then, we decided to continue to save a picture per day.  After several years, we've found it was a lot of fun looking back at this day, a year ago, and compare how our son had changed.  Now that we have another child, this is even more important to recall these memories.

`long-time-ago` was primarily designed around this use case.  Every day, we wanted to receive an e-mail that contains yesterday's picture and all pictures from this day in previous years.

## Starting
1.  `npm install`
2.  Create a configuration file.  Use `long-time-ago.config.js` as a guide.  This file can be edited directly or you can create a new filename with the same format.
3.  `npm start -- --config CONFIG-FILENAME.js`

The application is meant to run as a long running process.  This works best if you run it in the background or inside something like `screen`.

## Command Line Args
Arguments can be passed as part of the `npm start` command by passing them after `--`.

`npm start -- ARGS HERE`

| Argument | Purpose |
| ------------- | ------------- |
| `--config CONFIG-FILE` | Specifies configuration file to use.  Default is `long-time-ago.config.js`. |
| `--skipfirst` | Skips the first image and will not send it as an email.  Useful if you are restarting a process and don't want to trigger an e-mail. |

## Configuration File
Configuation values are described in comments in the `long-time-ago.config.js` file.

## TODO List
- [ ] Better handling when images are not there
- [ ] Tests
- [ ] Build
- [ ] Publish to NPM
- [ ] Dynamic updating of e-mail list without having to restart app