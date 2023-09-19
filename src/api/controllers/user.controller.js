import _configs from '../../configs/app.config';
import HttpStatusCode from '../../constants/httpStatus';
import { HttpResponse, AsyncFn } from '../../helpers/http';
import userService from '../services/user.service';
import jwt from 'jsonwebtoken';

export default {
	/**
	 *  @method post('signin') 
	 * */
	signin: AsyncFn(async (req, res) => {
		const user = await userService.signin(req.body);
		const accessToken = jwt.sign({ email: user.email, role: user.role }, _configs.JWT_SECRET, {
			expiresIn: _configs.JWT_EXPIRES
		});
		const response = new HttpResponse({ user, accessToken }, 'Signed in successfully');
		return res.status(200).json(response);
	}),

	/**
	 *  @method post('/create-user')
	 * */
	createUser: AsyncFn(async (req, res) => {
		const newUser = await userService.createUser(req.body);
		const response = new HttpResponse(newUser, 'Created new user')
		return res.status(HttpStatusCode.CREATED).json(response);
	}),

	/**
	 *  @method get('/users')
	 * */
	getUsers: AsyncFn(async (req, res) => {
		const limit = req.query.limit??=10
		const users = await userService.getAllUsers(limit);
		const response = new HttpResponse(users, 'Ok')
		return res.status(HttpStatusCode.OK).json(response);
	})
};
