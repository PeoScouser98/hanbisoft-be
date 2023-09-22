import nodemailer from 'nodemailer';
import _configs from './app.config';

const transporter = nodemailer.createTransport({
	service: 'smtp.gmail.com',
	port: _configs.MAILER_PORT,
	secure: true,
	auth: {
		user: _configs.MAILER_AUTH,
		pass: _configs.MAILER_PASSWORD
	},
	tls: {
		rejectUnauthorized: false
	}
});
export default transporter;
