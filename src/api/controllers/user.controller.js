'use strict';

import HttpStatusCode from '../../constants/httpStatus';
import { AsyncFn, HttpResponse } from '../../helpers/http';
import UserService from '../services/user.service';

export default class UserController {
	/**
	 * @endpoint /users
	 * @method GET
	 * */
	static getUsers = AsyncFn(async (req, res) => {
		const currentUserId = req.auth;
		const filterOptions = req.query;
		const users = await UserService.getAllUsers(currentUserId, filterOptions);
		const response = new HttpResponse(users, 'Ok');
		return res.status(HttpStatusCode.OK).json(response);
	});
	/**
	 * @endpoint /users/authorize
	 * @method PATCH
	 */
	static putUsers = AsyncFn(async (req, res) => {
		console.log(req.body);
		const result = await UserService.putUsers(req.body);
		const response = new HttpResponse(result, 'Re-Authorized users');
		return res.status(HttpStatusCode.OK).json(response);
	});
	/**
	 * @endpoint /users/deactivate
	 * @method DELETE
	 */
	static deleteUsers = AsyncFn(async (req, res) => {
		if (!req.query._ids) throw createHttpError.BadRequest('"_ids" query param must be provided');
		const ids = req.query._ids.split(',');
		const result = await UserService.deactivateUsers(ids);
		const response = new HttpResponse(result, 'Deleted users');
		return res.status(HttpStatusCode.OK).json(response);
	});
}
