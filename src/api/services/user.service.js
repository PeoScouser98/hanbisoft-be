'use strict';

import crypto from 'crypto';
import createHttpError from 'http-errors';
import { ActionEnum, UserRoleEnum } from '../../constants/enum';
import UserModel from '../models/user.model';
import sendMail from './nodemailer.service';
import bcrypt from 'bcrypt';
import _configs from '../../configs/app.config';

/** @typedef {import('../models/user.model').User} User */

export default class UserService {
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
			if (!!filterOptions[key]) filterQuery[key] = new RegExp(`^${filterOptions[key]}`, 'gi');
		}

		return await UserModel.find({
			$and: [{ _id: { $ne: currentUserId } }, { role: { $ne: UserRoleEnum.SUPER_ADMIN } }, filterQuery]
		});
	};

	/** @param {Array<Partial<User>>} payload */
	static putUsers = async (payload) => {
		// New users
		const newUsers = payload
			.filter((item) => item.type === ActionEnum.CREATE)
			.map((item) => {
				const randomPassword = crypto.randomBytes(12).toString('hex').slice(0, 6);
				return {
					...item.data,
					_id: crypto.randomBytes(12).toString('hex'),
					_password: randomPassword,
					password: bcrypt.hashSync(randomPassword, _configs.SALT_ROUND)
				};
			});

		if (newUsers.length > 0) {
			await Promise.all(
				newUsers.map((user) => {
					return Promise.resolve(
						sendMail({
							to: user?.email,
							subject: 'Hanbisoft - send your password',
							html: /* html */ `<i>Your password is: </i> <b>${user._password}</b>`
						})
					);
				})
			);
		}
		// Update users
		const updateUsers = payload
			.filter((item) => item.type === ActionEnum.UPDATE)
			.map((item) => item.data)
			.filter((item) => !!item)
			.concat(newUsers);
		const bulkWriteOptions = updateUsers.map((item) => ({
			updateOne: {
				filter: { email: item.email },
				update: item,
				upsert: true
			}
		}));
		// Delete users
		const updateResult = await UserModel.bulkWrite(bulkWriteOptions);
		return { result: updateResult.modifiedCount + ' modified' };
	};

	static deactivateUsers = async (userIds) => {
		return await UserModel.deleteMany({ _id: { $in: userIds } });
	};
}
