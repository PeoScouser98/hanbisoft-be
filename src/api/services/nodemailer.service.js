import _configs from '../../configs/app.config';
import nodemailer from 'nodemailer';
import oAuth2Client from '../../configs/googleapis.config';
import createHttpError from 'http-errors';

/**
 * @description Send mail
 * @param {{to: string, subject: string, text?: string, html?: string}} param
 */
export default async function sendMail({ to, subject, text = '', html = '' }) {
	try {
		const accessToken = await oAuth2Client.getAccessToken();
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			port: _configs.MAILER_PORT,
			secure: true,
			auth: {
				type: 'OAuth2',
				user: _configs.MAILER_AUTH,
				pass: _configs.MAILER_PASSWORD,
				clientId: _configs.OAUTH2_CLIENT_ID,
				clientSecret: _configs.OAUTH2_CLIENT_SECRET,
				refreshToken: _configs.OAUTH2_REFRESH_TOKEN,
				accessToken
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		return await transporter.sendMail(
			{
				from: 'Hanbisoft <hanbisoft@gmail.com>',
				subject,
				to,
				text,
				html
			},
			(err, info) => {
				if (err) console.log(err.message);
				else console.log(info.response);
			}
		);
	} catch (error) {
		console.log(error.message);
		throw createHttpError.InternalServerError('Failed to send mail');
	}
}
