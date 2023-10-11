'use strict';

import mongoose, { FilterQuery } from 'mongoose';
import { ActionEnum } from '../../constants/enum';
import EquipmentModel from '../models/equipment.model';
import crypto from 'crypto';
/**
 * @typedef {import('../models/equipment.model').Equipment} Equipment
 * @typedef {import('mongoose').FilterQuery} FilterQuery
 */

export default class EquipmentService {
	static getEquipments = async ({ page, filter }) => {
		/** @type {FilterQuery} */
		const filterQuery = {};

		for (const key in filter) {
			if (filter[key]) filterQuery[key] = new RegExp(`^${filter[key]}`, 'gi');
		}

		return await EquipmentModel.paginate(filterQuery, {
			sort: {
				item_cd: 1
			},
			limit: 30,
			page: page
		});
		// .limit(paginate.limit).skip(paginate.skip).sort({ item_cd: 1 });
	};
	static getLookupValues = async () => {
		const [sale_cd, sale_status, prod_type, prod_type1, prod_type2, prod_type3] = await Promise.all([
			EquipmentModel.find()
				.distinct('sale_cd')
				.transform((docs) => docs.map((item) => ({ text: item, value: item }))),
			EquipmentModel.find()
				.distinct('sale_status')
				.transform((docs) => docs.map((item) => ({ text: item, value: item }))),
			EquipmentModel.find()
				.distinct('prod_type')
				.transform((docs) => docs.map((item) => ({ text: item, value: item }))),
			EquipmentModel.find()
				.distinct('prod_type1')
				.transform((docs) => docs.map((item) => ({ text: item, value: item }))),
			EquipmentModel.find()
				.distinct('prod_type2')
				.transform((docs) => docs.map((item) => ({ text: item, value: item }))),
			EquipmentModel.find()
				.distinct('prod_type3')
				.transform((docs) => docs.map((item) => ({ text: item, value: item })))
		]);
		return {
			sale_cd,
			sale_status,
			prod_type,
			prod_type1,
			prod_type2,
			prod_type3
		};
	};

	/**
	 * @param {Array<{data:Equipment, type: ActionEnum}>} data
	 */
	static upsertEquipments = async (data) => {
		const dataToModify = data
			.filter((item) => item.type === ActionEnum.CREATE || item.type === ActionEnum.UPDATE)
			.map((item) => {
				if (item.type === ActionEnum.CREATE) {
					item.data._id = crypto.randomBytes(12).toString('hex');
					return item.data;
				}
				return item.data;
			});
		const bulkOperations = dataToModify.map((item) => ({
			updateOne: {
				filter: { _id: new mongoose.Types.ObjectId(item._id) },
				update: item,
				upsert: true
			}
		}));
		return await EquipmentModel.bulkWrite(bulkOperations);
	};
	/**
	 * @param {Array<string>} itemKeys
	 * */
	static deleteEquipments = async (itemKeys) => {
		return await EquipmentModel.deleteMany({ _id: { $in: itemKeys } });
	};
}
