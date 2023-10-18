import createHttpError from 'http-errors';
import { HttpRequest, HttpResponse } from '../../helpers/http';
import AuthService from '../services/auth.service';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import HttpStatusCode from '../../constants/httpStatus';
import __configs from '../../configs/app.config';
import cookieConfig from '../../configs/cookie.config';

export default class AuthController {
	/**
	 * @endpoint /auth/signin
	 * @method POST
	 * */
	static signin = HttpRequest(async (req, res) => {
		const user = await AuthService.signin(req.body);
		const accessToken = jwt.sign({ _id: user._id, email: user.email, role: user.role }, __configs.JWT_SECRET, {
			expiresIn: __configs.JWT_EXPIRES
		});
		const response = new HttpResponse({ user, accessToken }, 'Signed in successfully', HttpStatusCode.OK);
		return res.status(HttpStatusCode.OK).cookie('access_token', accessToken, cookieConfig).json(response);
	});
	/**
	 * @endpoint /auth/info
	 * @method GET
	 */
	static getUserInfo = HttpRequest(async (req, res) => {
		console.log(req.auth);
		const currentUser = await AuthService.getUserInfo(req.auth);
		const response = new HttpResponse(currentUser, null, HttpStatusCode.OK);
		return res.status(HttpStatusCode.OK).json(response);
	});
	/**
	 * @endpoint /auth/refresh-token
	 * @method GET
	 */
	static refreshToken = HttpRequest(async (req, res) => {
		const id = req.params.authId;
		if (!id) throw createHttpError.BadRequest('Failed to get refresh token due to missing auth ID');
		const user = await UserModel.findById(id);
		if (!user) throw createHttpError.NotFound('Failed to get refresh token due to unable to find user');
		const refreshToken = jwt.sign({ _id: user._id, email: user.email, role: user.role }, __configs.JWT_SECRET, {
			expiresIn: __configs.JWT_EXPIRES
		});
		const response = new HttpResponse(refreshToken, 'Get refresh token successfully', HttpStatusCode.OK);
		return res.status(HttpStatusCode.OK).cookie('access_token', refreshToken, cookieConfig).json(response);
	});
	/**
	 * @endpoint /auth/update-info
	 * @method PATCH
	 */
	static updateUser = HttpRequest(async (req, res) => {
		const authId = req.auth;
		console.log('authId :>> ', authId);
		const updatedUser = await AuthService.updateUser(authId, req.body);
		const response = new HttpResponse(updatedUser, `Updated user's info`, HttpStatusCode.CREATED);
		return res.status(HttpStatusCode.CREATED).json(response);
	});
	/**
	 * @endpoint /auth/change-password
	 * @method PATCH
	 */
	static changePassword = HttpRequest(async (req, res) => {
		const authId = req.auth;
		const result = await AuthService.changePassword(authId, req.body);
		const response = new HttpResponse(result, 'Change password successfully', HttpStatusCode.CREATED);
		return res.status(HttpStatusCode.CREATED).json(response);
	});
	/**
	 * @endpoint /auth/recover-password
	 * @method GET
	 */
	static recoverPassword = HttpRequest(async (req, res) => {
		const email = req.body.email;
		await AuthService.recoverPassword(email);
		const response = new HttpResponse(null, 'Check your email to get new password!', HttpStatusCode.OK);
		return res.status(HttpStatusCode.OK).json(response);
	});
}
