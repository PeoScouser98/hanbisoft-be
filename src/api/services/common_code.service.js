import CommonCodeModel from '../models/common_code.model';

/**
 * @typedef {import('express').Express} Express
 * @typedef {import('../models/common_code.model').CommonCode} CommonCode
 */
export default class CommonCodeService {
	/**
	 * Get all database fields and their definitions
	 */
	static getCommonCodes = async () => await CommonCodeModel.find();

	/**
	 * Import collection information from excel file
	 * @param {Array<CommonCode>} data
	 */
	static importCommonCodes = async (data) => {
		const bulkWriteOptions = data.map((item) => ({
			updateOne: {
				filter: { code: item.code },
				update: item,
				upsert: true
			}
		}));
		const { modifiedCount, upsertedCount } = await CommonCodeModel.bulkWrite(bulkWriteOptions);
		return { modifiedCount, upsertedCount };
	};
}
