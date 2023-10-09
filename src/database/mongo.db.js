import mongoose from 'mongoose';
import __configs from '../configs/app.config';

// Singleton pattern
export default class Database {
	/**@private */
	#mongoConnectString = __configs.MONGO_CONNECT_STRING;

	constructor() {
		this.#connect();
	}

	/**@private */
	async #connect() {
		{
			try {
				mongoose.set('strictQuery', false);
				await mongoose.connect(this.#mongoConnectString, {
					maxPoolSize: 100, // If number of connection > 100, the 101st connection must wait until there is at least one connection are free
					connectTimeoutMS: 10000
				});
				console.info('[SUCCESS] Connected to database!');
			} catch (error) {
				console.log('[ERROR] ::: Failed to connect mongodb!');
			}
		}
	}

	/**@static */
	static getInstance() {
		if (!Database.instance) Database.instance = new Database();
		return Database.instance;
	}
}

// if (__configs.NODE_ENV === 'development') {
// 	mongoose.set('debug', true);
// 	mongoose.set('debug', {
// 		color: true
// 	});
// }
