import createHttpError from 'http-errors';
import UserModel from '../models/user.model';

export default {
	/**

	 * @param {{email: string, password: string}} payload
	 */
	signin: async (payload) => {
		const user = await UserModel.findOne({ email: payload.email });
		if (!user) throw createHttpError.BadRequest('User not found');
		if (!user.authenticate(payload.password)) throw createHttpError.BadRequest('Incorrect password');
		user.password = undefined;
		return user;
	},
	/**
	 * @param {{email: string, displayName: string, password: string,picture }} payload
	 */
	createUser: async (payload) => {
		const existedUser = await UserModel.exists({ email: payload.email });
		if (existedUser) throw createHttpError.BadRequest('User already existed');
		return await new UserModel(payload).save();
	},
	/**
	 * @param {{limit: number}} param
	 */
	getAllUsers: async (param) => {
		return await UserModel.find().limit(param.limit);
	}
};
