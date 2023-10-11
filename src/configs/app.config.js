import 'dotenv/config';

const { env } = process;

/** @constant */
const __configs = {
	// App
	LOCAL_ORIGIN: env.LOCAL_ORIGIN,
	LOCAL_ORIGIN_PREVIEW: env.LOCAL_ORIGIN_PREVIEW,
	REMOTE_ORIGIN: env.REMOTE_ORIGIN,
	PORT: env.PORT,
	SALT_ROUND: +env.SALT_ROUND,
	NODE_ENV: env.NODE_ENV,
	// Mongodb
	MONGO_URI: env.MONGO_URI,
	// Jsonwebtoken
	JWT_EXPIRES: env.JWT_EXPIRES,
	JWT_SECRET: env.JWT_SECRET,
	// Nodemailer
	MAILER_AUTH: env.MAILER_AUTH,
	MAILER_PASSWORD: env.MAILER_PASSWORD,
	MAILER_PORT: env.PORT,
	// Oauth2
	OAUTH2_CLIENT_ID: env.OAUTH2_CLIENT_ID,
	OAUTH2_CLIENT_SECRET: env.OAUTH2_CLIENT_SECRET,
	OAUTH2_REFRESH_TOKEN: env.OAUTH2_REFRESH_TOKEN,
	OAUTH2_REDIRECT_URI: env.OAUTH2_REDIRECT_URI,
	// Drive
	BASE_DOWLOAD_URL: env.BASE_DOWLOAD_URL,
	DRIVE_FOLDER_ID: env.DRIVE_FOLDER_ID
};

export default __configs;
