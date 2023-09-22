import HttpStatusCode from '../../constants/httpStatus';
import { AsyncFn, HttpResponse } from '../../helpers/http';
import userService from '../services/user.service';

export default {
	/**
	 * @endpoint /create-user
	 * @method POST
	 * */
	createUser: AsyncFn(async (req, res) => {
		const newUser = await userService.createUser(req.body);
		const response = new HttpResponse(newUser, 'Created new user');
		return res.status(HttpStatusCode.CREATED).json(response);
	}),

	/**
	 * @endpoint /users
	 * @method GET
	 * */
	getUsers: AsyncFn(async (req, res) => {
		const limit = (req.query.limit ??= 10);
		const users = await userService.getAllUsers(limit);
		const response = new HttpResponse(users, 'Ok');
		return res.status(HttpStatusCode.OK).json(response);
	})
};
