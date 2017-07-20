/* eslint-env node */
const nodemailer = require('nodemailer');
const moment = require('moment');

class MailClient {
	constructor(config) {
		this.config = config;
		this.transporter = nodemailer.createTransport({
			host: config.smtp.host,
			port: config.smtp.port,
			secure: true,
			auth: {
				user: config.smtp.user,
				pass: config.smtp.password
			}
		});
	}

	sendMessage(images) {
		const attachments = this._generateAttachments(images);
		const dateString = moment(new Date()).format(this.config.images.format);
		this.transporter.sendMail({
			from: this.config.email.from,
			to: this.config.email.to.join(','),
			bcc: this.config.email.bcc.join(','),
			subject: this.config.email.subject + ' - ' + dateString,
			html: this._generateHTML(attachments),
			attachments: attachments

		}, (error, info) => {
			if (error) {
				return console.error(error);
			}
			console.log('SendMail response: ', info);
			console.log();
		});
	}

	_generateAttachments(images) {
		const cidSuffix = new Date().getTime();
		let attachments = [];
		images.forEach((image, index) => {
			attachments.push({
				filename: image.filename,
				path: image.path + image.filename,
				cid: 'cid:image-' + cidSuffix + index,
				image: image
			});
		});
		return attachments;
	}

	_generateHTML(attachments) {
		let html = '';
		attachments.forEach(attachment => {
			const momentDate = moment(attachment.image.date);
			html += 'Date: ' + momentDate.format(this.config.images.format) + ' <img src="' + attachment.cid + '"><br/>';
		});
		return html;
	}
}

module.exports = MailClient;