import mongoose from 'mongoose';
import _configs from '../configs/app.config';

(async () => {
	{
		try {
			mongoose.set('strictQuery', false);
			await mongoose.connect(_configs.MONGO_URI,);
			console.info('[SUCCESS] Connected to database!');
		} catch (error) {
			console.log('[ERROR] ::: Failed to connect mongodb!');
		}
	}
})();
