/* eslint-env node */
const config = {
  email: {
    from: '',
    to: [''],
    bcc: [''],
    subject: 'Long Time Ago Email'
  },
  smtp: {
    host: '',
    port: '',
    user: '',
    password: ''
  },
  frequency: {
    value: 1, // Number of units
    unit: 'year', // Time period between images to send
    howOften: 60 * 60 * 5 * 1000 // How often does the application check for new images (milliseconds)
  },
  baseDateOffset: {
    // Offset to subract from current date.  For sending images based on older dates instead of today
    value: 1, // Amount of offset to apply to current date
    unit: 'day' // Unit of offset
  },
  images: {
    path: './path/to/images/', // Must include trailing slash
    format: 'YYYY-MM-DD', // Moment.js format
    extension: '.jpg', // Must include period
    includeAll: true // Include all matches of images based on frequency unit
  }
};

module.exports = config;
