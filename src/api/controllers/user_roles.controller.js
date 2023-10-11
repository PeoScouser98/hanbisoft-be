'use strict';

import HttpStatusCode from '../../constants/httpStatus';
import { useAsync, HttpResponse } from '../../helpers/http';
import UserRolesService from '../services/user_roles.service';

export default class UserRolesController {
	/**
	 * @endpoint /permissions
	 * @method GET
	 */
	static getAllPermission = useAsync(async (req, res) => {
		const permissions = await UserRolesService.getAllUserRoles();
		const response = new HttpResponse(permissions, 'Ok', HttpStatusCode.OK);
		return res.status(HttpStatusCode.OK).json(response);
	});

	/**
	 * @endpoint /permissions/create
	 * @method POST
	 */
	static upsertUserRoles = useAsync(async (req, res) => {
		const newPermission = await UserRolesService.upsertUserRoles(req.body);
		const response = new HttpResponse(newPermission, 'Upserted roles successfully', HttpStatusCode.CREATED);
		return res.status(HttpStatusCode.CREATED).json(response);
	});

	/**
	 * @endpoint /permissions/:id/delete
	 * @method DELETE
	 */
	static deletePermission = useAsync(async (req, res) => {
		const deletedPermission = await UserRolesService.deleteRoles(req.params.id);
		const response = new HttpResponse(deletedPermission, 'Deleted roles', HttpStatusCode.NO_CONTENT);
		return res.status(HttpStatusCode.NO_CONTENT).json(response);
	});
}
