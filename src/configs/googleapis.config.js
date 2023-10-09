import { google } from 'googleapis';
import __configs from './app.config';

const OAuth2Client = new google.auth.OAuth2(
	__configs.OAUTH2_CLIENT_ID,
	__configs.OAUTH2_CLIENT_SECRET,
	__configs.OAUTH2_REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: __configs.OAUTH2_REFRESH_TOKEN });
OAuth2Client.getAccessToken().catch((error) => console.log(error.message));

export default OAuth2Client;
