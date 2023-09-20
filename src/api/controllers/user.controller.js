import createHttpError from 'http-errors';
import _configs from '../../configs/app.config';
import HttpStatusCode from '../../constants/httpStatus';
import { HttpResponse, AsyncFn } from '../../helpers/http';
import userService from '../services/user.service';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';

export default {
	/**
	 * @endpoint /signin
	 * @method Post()
	 * */
	signin: AsyncFn(async (req, res) => {
		const user = await userService.signin(req.body);
		const accessToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, _configs.JWT_SECRET, {
			expiresIn: _configs.JWT_EXPIRES
		});
		const response = new HttpResponse({ user, accessToken }, 'Signed in successfully');
		return res.status(200).json(response);
	}),

	/**
	 * @endpoint /create-user
	 * @method Post()
	 * */
	createUser: AsyncFn(async (req, res) => {
		const newUser = await userService.createUser(req.body);
		const response = new HttpResponse(newUser, 'Created new user');
		return res.status(HttpStatusCode.CREATED).json(response);
	}),
	/**
	 * @endpoint /users/info
	 * @method Get()
	 */
	getUserInfo: AsyncFn(async (req, res) => {
		const currentUser = await UserModel.findById(req.auth);
		const response = new HttpResponse(currentUser);
		return res.status(HttpStatusCode.OK).json(response);
	}),
	/**
	 * @endpoint /users
	 * @method Get()
	 * */
	getUsers: AsyncFn(async (req, res) => {
		const limit = (req.query.limit ??= 10);
		const users = await userService.getAllUsers(limit);
		const response = new HttpResponse(users, 'Ok');
		return res.status(HttpStatusCode.OK).json(response);
	}),
	/**
	 * @endpoint /refresh-token
	 * @method Get()
	 */
	refreshToken: AsyncFn(async (req, res) => {
		const id = req.params.authId;
		if (!id) throw createHttpError.BadRequest('Failed to get refresh token due to missing auth ID');
		const user = await UserModel.findById(id);
		if (!user) throw createHttpError.NotFound('Failed to get refresh token due to unable to find user');
		const refreshToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, _configs.JWT_SECRET, {
			expiresIn: _configs.JWT_EXPIRES
		});
		const response = new HttpResponse(refreshToken, 'Get refresh token successfully');
		return res.status(HttpStatusCode.OK).json(response);
	})
};
