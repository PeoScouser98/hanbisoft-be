// @ts-check

import createHttpError from 'http-errors';
import UserModel from '../models/user.model';

/** @typedef {import('../models/user.model').User} User */

export default {
	/**
	 * @param {Omit<User, 'id'>} payload
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
