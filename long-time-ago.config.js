/* eslint-env node */
const config = {
	"email": {
		"from": "",
		"to": [
			""
		],
		"subject": ""
	},
	"smtp": {
		"host": "",                             // https only
		"port": "",
		"user": "",
		"password": ""
	},
	"frequency": {
		"unit": ""                              // year, month, day
	},
	"images": {
		"path": "./path/with/slash/at/end/",    // must have slash at end
		"format": "YYYY-MM-DD",                 // momentjs format
		"extension": ".jpg"                     // extension including period
	}
}

module.exports = config;