import createHttpError from 'http-errors';
import { AsyncFn, HttpResponse } from '../../helpers/http';
import authService from '../services/auth.service';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import HttpStatusCode from '../../constants/httpStatus';
import _configs from '../../configs/app.config';

export default {
	/**
	 * @endpoint /auth/signin
	 * @method POST
	 * */
	signin: AsyncFn(async (req, res) => {
		console.log(req.body);
		const user = await authService.signin(req.body);
		const accessToken = jwt.sign({ _id: user._id, email: user.email, role: user.role }, _configs.JWT_SECRET, {
			expiresIn: _configs.JWT_EXPIRES
		});
		const response = new HttpResponse({ user, accessToken }, 'Signed in successfully');
		return res.status(200).json(response);
	}),
	/**
	 * @endpoint /auth/info
	 * @method GET
	 */
	getUserInfo: AsyncFn(async (req, res) => {
		console.log(req.auth);
		const currentUser = await authService.getUserInfo(req.auth);
		const response = new HttpResponse(currentUser);
		return res.status(HttpStatusCode.OK).json(response);
	}),
	/**
	 * @endpoint /auth/refresh-token
	 * @method GET
	 */
	refreshToken: AsyncFn(async (req, res) => {
		const id = req.params.authId;
		if (!id) throw createHttpError.BadRequest('Failed to get refresh token due to missing auth ID');
		const user = await UserModel.findById(id);
		if (!user) throw createHttpError.NotFound('Failed to get refresh token due to unable to find user');
		const refreshToken = jwt.sign({ _id: user._id, email: user.email, role: user.role }, _configs.JWT_SECRET, {
			expiresIn: _configs.JWT_EXPIRES
		});
		const response = new HttpResponse(refreshToken, 'Get refresh token successfully');
		return res.status(HttpStatusCode.OK).json(response);
	}),
	/**
	 * @endpoint /auth/update-info
	 * @method PATCH
	 */
	updateUser: AsyncFn(async (req, res) => {
		const authId = req.auth;
		console.log('authId :>> ', authId);
		const updatedUser = await authService.updateUser(authId, req.body);
		const response = new HttpResponse(updatedUser, `Updated user's info`);
		return res.status(HttpStatusCode.CREATED).json(response);
	}),
	/**
	 * @endpoint /auth/change-password
	 * @method PATCH
	 */
	changePassword: AsyncFn(async (req, res) => {
		const authId = req.auth;
		const result = await authService.changePassword(authId, req.body);
		const response = new HttpResponse(result, 'Change password successfully');
		return res.status(HttpStatusCode.CREATED).json(response);
	}),
	/**
	 * @endpoint /auth/recover-password
	 * @method GET
	 */
	recoverPassword: AsyncFn(async (req, res) => {
		const email = req.body.email;
		await authService.recoverPassword(email);
		const response = new HttpResponse(null, 'Check your email to get new password!');
		return res.status(HttpStatusCode.OK).json(response);
	})
};
