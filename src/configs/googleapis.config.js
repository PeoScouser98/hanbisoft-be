import { google } from 'googleapis';
import _configs from './app.config';

const oAuth2Client = new google.auth.OAuth2(
	_configs.OAUTH2_CLIENT_ID,
	_configs.OAUTH2_CLIENT_SECRET,
	_configs.OAUTH2_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: _configs.OAUTH2_REFRESH_TOKEN });

export default oAuth2Client;
