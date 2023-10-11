import mongoose from 'mongoose';
import __configs from '../configs/app.config';

// Singleton pattern
export default class Database {
	/**@private */
	#mongoURI = __configs.MONGO_URI;

	constructor() {
		this.#connect();
	}

	/**@private */
	async #connect() {
		{
			try {
				mongoose.set('strictQuery', false);
				mongoose.set('strictPopulate', false);
				await mongoose.connect(this.#mongoURI, {
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
