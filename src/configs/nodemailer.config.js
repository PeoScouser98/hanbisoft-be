import nodemailer from 'nodemailer';
import __configs from './app.config';

const transporter = nodemailer.createTransport({
	service: 'smtp.gmail.com',
	port: __configs.MAILER_PORT,
	secure: true,
	auth: {
		user: __configs.MAILER_AUTH,
		pass: __configs.MAILER_PASSWORD
	},
	tls: {
		rejectUnauthorized: false
	}
});
export default transporter;
