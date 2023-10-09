'use strict';

import createHttpError from 'http-errors';
import UserRoleModel from '../models/user_role.model';

/**
 * @typedef {import('../models/user_role.model').Permission} Permission
 */

export default class UserRolesService {
	/** @param {void} */
	static async getAllPermissions() {
		return await UserRoleModel.find();
	}

	/** @param {Omit<Permission, '_id'>} payload */
	static async createPermission(payload) {
		const existedPermission = await UserRoleModel.exists({ role_name: payload.role_name.trim().toLowerCase() });
		if (existedPermission) throw createHttpError.Conflict('Permission already existed!');
		return await new UserRoleModel(payload).save();
	}

	/**
	 * @param {Partial<Permission>} payload
	 * @param {string} permissionId
	 */
	static async updatePermission(permissionId, payload) {
		const existedPermission = await UserRoleModel.exists({
			_id: { $ne: permissionId },
			role_name: payload.role_name.trim().toLowerCase()
		});
		if (existedPermission) throw createHttpError.Conflict('Permission already existed!');
		return await UserRoleModel.findOneAndUpdate({ _id: permissionId }, payload);
	}

	/** @param {string} permissionId */
	static async deletePermission(permissionId) {
		return await UserRoleModel.findOneAndDelete({ _id: permissionId });
	}
}
