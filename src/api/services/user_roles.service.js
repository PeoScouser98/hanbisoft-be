'use strict';

import crypto from 'crypto';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { ActionEnum } from '../../constants/enum';
import UserRoleModel from '../models/user_role.model';

/**
 * @typedef {import('../models/user_role.model').UserRole} UserRole
 * -------------------------------------------------------------------
 * @typedef DataChange<T>
 * @property {'insert'|'update'|'remove'} type
 * @property {Array<T>} data
 * @property {Array<string>} key
 */

export default class UserRolesService {
	/** @param {void} */
	static async getAllUserRoles() {
		return await UserRoleModel.find();
	}

	/** @param {Array<DataChange<UserRole>>} payload */
	static async upsertUserRoles(payload) {
		const result = {
			modifiedCount: 0,
			insertedCount: 0
		};

		if (!Array.isArray(payload) || payload.length == 0) return result;

		let latestRoleCd;
		const [latestRole] = await UserRoleModel.find().sort({ role_cd: -1 });
		latestRoleCd = latestRole?.role_cd || 0;

		const dataToInsert = payload
			.filter((item) => item.type === ActionEnum.CREATE)
			.map((item, index) => {
				const id = crypto.randomBytes(12).toString('hex');
				return {
					...item,
					key: id,
					data: {
						...item.data,
						role_cd: latestRoleCd + index + 1,
						_id: id
					}
				};
			});

		const dataToUpdate = payload.filter((item) => item.type === ActionEnum.UPDATE);

		for (const item of [...dataToUpdate, ...dataToInsert]) {
			const { data } = item;
			const existedPermission = await UserRoleModel.exists({
				$and: [{ role_name: data?.role_name?.trim()?.toLowerCase() }, { role_cd: { $ne: data?.role_cd } }]
			});
			if (existedPermission) throw createHttpError.Conflict('Role already existed !');
		}

		const bulkWriteOptions = [...dataToInsert, ...dataToUpdate].map((item) => {
			console.log(item.data);
			return {
				updateOne: {
					filter: { _id: new mongoose.Types.ObjectId(item.key) },
					update: item.data,
					upsert: true
				}
			};
		});

		const { modifiedCount, insertedCount } = await UserRoleModel.bulkWrite(bulkWriteOptions);
		result.modifiedCount = modifiedCount;
		result.insertedCount = insertedCount;

		return result;
	}

	/** @param {string} permissionId */
	static async deleteRoles(permissionId) {
		return await UserRoleModel.findOneAndDelete({ _id: permissionId });
	}
}
