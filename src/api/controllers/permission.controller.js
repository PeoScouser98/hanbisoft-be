'use strict';

import HttpStatusCode from '../../constants/httpStatus';
import { AsyncFn, HttpResponse } from '../../helpers/http';
import UserRolesService from '../services/user_roles.service';

export default class UserRolesController {
	/**
	 * @endpoint /permissions
	 * @method GET
	 */
	static getAllPermission = AsyncFn(async (req, res) => {
		const permissions = await UserRolesService.getAllPermissions();
		const response = new HttpResponse(permissions, 'Ok', HttpStatusCode.OK);
		return res.status(HttpStatusCode.OK).json(response);
	});

	/**
	 * @endpoint /permissions/create
	 * @method POST
	 */
	static createPermission = AsyncFn(async (req, res) => {
		const newPermission = await UserRolesService.createPermission(req.body);
		const response = new HttpResponse(newPermission, 'Created new permission', HttpStatusCode.CREATED);
		return res.status(HttpStatusCode.CREATED).json(response);
	});

	/**
	 * @endpoint /permissions/:id/update
	 * @method PATCH
	 */
	static updatePermission = AsyncFn(async (req, res) => {
		const updatedPermission = await UserRolesService.updatePermission(req.params.id, req.body);
		const response = new HttpResponse(updatedPermission, 'Updated permission', HttpStatusCode.CREATED);
		return res.status(HttpStatusCode.CREATED).json(response);
	});

	/**
	 * @endpoint /permissions/:id/delete
	 * @method DELETE
	 */
	static deletePermission = AsyncFn(async (req, res) => {
		const deletedPermission = await UserRolesService.deletePermission(req.params.id);
		const response = new HttpResponse(deletedPermission, 'Deleted permission', HttpStatusCode.NO_CONTENT);
		return res.status(HttpStatusCode.NO_CONTENT).json(response);
	});
}
