'use strict';

import createHttpError from 'http-errors';
import UserModel from '../models/user.model';
import mongoose from 'mongoose';
import { ActionEnum } from '../../constants/enum';
import crypto from 'crypto';

/** @typedef {import('../models/user.model').User} User */

export default class userService {
	/** @param {Omit<User, 'id'>} payload */
	static createUser = async (payload) => {
		const existedUser = await UserModel.exists({ email: payload.email });
		if (existedUser) throw createHttpError.BadRequest('User already existed');
		return await new UserModel(payload).save();
	};

	/** @param {currentUserId: string, page: number} _params */
	static getAllUsers = async (currentUserId, filterOptions = {}) => {
		/** @type {FilterQuery} */
		const filterQuery = {};

		for (const key in filterOptions) {
			if (filterOptions[key]) filterQuery[key] = new RegExp(`^${filterOptions[key]}`, 'gi');
		}

		return await UserModel.find({
			$and: [{ _id: { $ne: currentUserId } }, filterQuery]
		});
	};

	/** @param {Array<Partial<User>>} payload */
	static putUsers = async (payload) => {
		const bulkWriteOptions = payload
			.map((item) => {
				if (item.type === ActionEnum.CREATE) return { ...item.data, _id: crypto.randomBytes(12).toString('hex') };
				if (item.type === ActionEnum.UPDATE) return item.data;
			})
			.filter((item) => !!item)
			.map((item) => ({
				updateOne: {
					filter: { email: item.email },
					update: item,
					upsert: true
				}
			}));

		return await UserModel.bulkWrite(bulkWriteOptions);
	};
}
