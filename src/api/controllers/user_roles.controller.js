'use strict';

import HttpStatusCode from '../../constants/httpStatus';
import { HttpRequest, HttpResponse } from '../../helpers/http';
import UserRolesService from '../services/user_roles.service';

export default class UserRolesController {
	constructor() {}
	/**
	 * @endpoint /user-roles
	 * @method GET
	 */
	static getAllPermission = HttpRequest(async (req, res) => {
		const permissions = await UserRolesService.getAllUserRoles();
		const response = new HttpResponse(permissions, 'Ok', HttpStatusCode.OK);
		return res.status(HttpStatusCode.OK).json(response);
	});

	/**
	 * @endpoint /user-roles/upsert
	 * @method POST
	 */
	static upsertUserRoles = HttpRequest(async (req, res) => {
		const newPermission = await UserRolesService.upsertUserRoles(req.body);
		const response = new HttpResponse(newPermission, 'Upserted roles successfully', HttpStatusCode.CREATED);
		return res.status(HttpStatusCode.CREATED).json(response);
	});

	/**
	 * @endpoint /user-roles/delete
	 * @method DELETE
	 */
	static deletePermission = HttpRequest(async (req, res) => {
		const deletedPermission = await UserRolesService.deleteRoles(req.params.id);
		const response = new HttpResponse(deletedPermission, 'Deleted roles', HttpStatusCode.NO_CONTENT);
		return res.status(HttpStatusCode.NO_CONTENT).json(response);
	});
}
