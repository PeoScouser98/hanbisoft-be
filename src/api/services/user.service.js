// @ts-check

import createHttpError from 'http-errors';
import UserModel from '../models/user.model';

/** @typedef {import('../models/user.model').User} User */

export default {
	/**
	 * @param {Pick<User, 'email' | 'password'>} payload
	 */
	signin: async (payload) => {
		const user = await UserModel.findOne({ email: payload.email });
		if (!user) throw createHttpError.BadRequest('User not found');
		if (!user.authenticate(payload.password)) throw createHttpError.BadRequest('Incorrect password');
		user.password = undefined;
		return user;
	},
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
	},

	/**
	 * update user info
	 * @param {string} id
	 * @param {Partial<User>} payload
	 */
	updateUser: async (id, payload) => {
		const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, payload, { new: true });
		if (!updatedUser) throw createHttpError.NotFound('User to update not found');
		return updatedUser;
	}
};
