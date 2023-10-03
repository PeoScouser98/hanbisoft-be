import mongoose from 'mongoose';
import _configs from '../configs/app.config';

export default class Mongodb {
	static uri = _configs.MONGO_URI;

	static connect = async () => {
		{
			try {
				mongoose.set('strictQuery', false);
				await mongoose.connect(this.uri);
				console.info('[SUCCESS] Connected to database!');
			} catch (error) {
				console.log('[ERROR] ::: Failed to connect mongodb!');
			}
		}
	};
}
