import mongoose from 'mongoose';
import { ActionEnum } from '../../constants/enum';
import EquipmentModel from '../models/equipment.model';
import crypto from 'crypto';
/**
 * @typedef {import('../models/equipment.model').Equipment} Equipment
 */

/**
 * @mixin
 */
export default {
	getAll: async ({ limit = 50, skip = 0 }) => {
		return await EquipmentModel.find().limit(limit).skip(skip).sort({ item_cd: 1 });
	},
	getLookupValues: async () => {
		// const []
	},
	/**
	 * @param {{[key: string]: string|number|boolean}} searchTermsObj
	 */
	search: async (searchTermsObj) => {
		const filter = {};
		Object.keys(searchTermsObj).forEach((key) => {
			if (searchTermsObj[key]) filter[key] = new RegExp(searchTermsObj[key], 'i');
		});

		const result = await EquipmentModel.find(searchTermsObj);
		return result;
	},
	/**
	 * @param {Array<{data:Equipment, type: ActionEnum}>} data
	 */
	update: async (data) => {
		const itemsToInsertOrUpdate = data
			.filter((item) => item.type === ActionEnum.CREATE || item.type === ActionEnum.UPDATE)
			.map((item) => {
				if (item.type === ActionEnum.CREATE) {
					item.data._id = crypto.randomBytes(12).toString('hex');
					return item.data;
				}
				return item.data;
			});

		const bulkOperations = itemsToInsertOrUpdate.map((item) => ({
			updateOne: {
				filter: { _id: new mongoose.Types.ObjectId(item._id) },
				update: item,
				upsert: true
			}
		}));
		return await EquipmentModel.bulkWrite(bulkOperations);
	},
	/**
	 * @param {Array<string>} itemKeys
	 * */
	delete: async (itemKeys) => {
		return await EquipmentModel.deleteMany({ _id: { $in: itemKeys } });
	}
};
