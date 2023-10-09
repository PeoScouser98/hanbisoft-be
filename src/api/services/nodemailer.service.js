'use strict';

import __configs from '../../configs/app.config';
import nodemailer from 'nodemailer';
import OAuth2Client from '../../configs/googleapis.config';
import createHttpError from 'http-errors';

/**
 * @description Send mail
 * @param {{to: string, subject: string, text?: string, html?: string}} param
 */
export default async function sendMail({ to, subject, text = '', html = '' }) {
	try {
		const accessToken = await OAuth2Client.getAccessToken();

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			port: __configs.MAILER_PORT,
			secure: true,
			auth: {
				type: 'OAuth2',
				user: __configs.MAILER_AUTH,
				pass: __configs.MAILER_PASSWORD,
				clientId: __configs.OAUTH2_CLIENT_ID,
				clientSecret: __configs.OAUTH2_CLIENT_SECRET,
				refreshToken: __configs.OAUTH2_REFRESH_TOKEN,
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
	}
}
