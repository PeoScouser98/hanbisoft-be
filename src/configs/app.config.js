import 'dotenv/config';

const _configs = {
	MONGO_URI: process.env.MONGO_URI,
	PORT: process.env.PORT,
	SALT_ROUND: +process.env.SALT_ROUND,
	NODE_ENV: process.env.NODE_ENV,
	JWT_EXPIRES: 60 * 15,
	JWT_SECRET: process.env.JWT_SECRET
};

export default _configs;
