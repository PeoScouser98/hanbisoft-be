'use strict';
/**@jsdocs */
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import createHttpError from 'http-errors';
import __configs from '../../configs/app.config';
import UserModel from '../models/user.model';
import sendMail from './nodemailer.service';

export default class AuthService {
	/**
	 * @param {Pick<User, 'email' | 'password'>} payload
	 */
	static signin = async (payload) => {
		const user = await UserModel.findOne({ email: payload.email }).populate('role');
		console.log(user);
		if (!user) throw createHttpError.BadRequest('User not found');
		if (!user.authenticate(payload.password)) throw createHttpError.BadRequest('Incorrect password');
		user.password = undefined;
		return user;
	};
	/**
	 * @param {string} authId
	 */
	static getUserInfo = async (authId) => {
		return await UserModel.findById(authId).select('-password');
	};
	/**
	 * update user info
	 * @param {string} id
	 * @param {Partial<User>} payload
	 */
	static updateUser = async (id, payload) => {
		const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, payload, { new: true });
		if (!updatedUser) throw createHttpError.NotFound('User to update not found');
		updatedUser.password = undefined;
		return updatedUser;
	};
	/**
	 * @param {string} authId
	 * @param {{currentPassword: string, newPassword: string, confirmNewPassword: string}} payload
	 */
	static changePassword = async (authId, payload) => {
		const user = await UserModel.findById(authId);
		if (user.authenticate(payload.currentPassword) === false)
			throw createHttpError.UnprocessableEntity('Incorrect current password');

		const result = await UserModel.findOneAndUpdate(
			{ _id: user._id },
			{ password: bcrypt.hashSync(payload.newPassword, __configs.SALT_ROUND) }
		);
		result.password = undefined;
		return result;
	};
	/**
	 * @param {string} email
	 */
	static recoverPassword = async (email) => {
		const user = await UserModel.findOne({ email: email });
		if (!user) throw createHttpError.NotFound('Account does not exist!');
		const randomPassword = crypto.randomBytes(12).toString('hex').slice(0, 6);
		await sendMail({
			to: email,
			subject: 'Recover password - Hanbisoft',
			text: '',
			html: /* html */ `
				<p>Your new password is: <b>${randomPassword}</b></p>
			`
		});
		const result = await UserModel.findOneAndUpdate(
			{ email: email },
			{
				password: bcrypt.hashSync(randomPassword, __configs.SALT_ROUND)
			},
			{ new: true }
		);
		result.password = undefined;
		return result;
	};
}
