import createHttpError from 'http-errors';
import MenuNavigationModel from '../models/menu_navigation.model';
import MenuNavigationValidator from '../validations/navigation.validation';

/**
 * @typedef {import('../models/menu_navigation.model').Navigation} Navigation
 */

export default class MenuNavigationService {
	static getNavigation = async () => {
		return await MenuNavigationModel.find();
	};

	static upsertNavigation = async (payload) => {
		const { error, value } = await MenuNavigationValidator.validateMenuNavigations(payload);
		if (error) throw createHttpError.BadRequest(error.message);
		const dataToModify = value.map((item) => item.data);

		const bulkWriteOptions = dataToModify.map((item) => ({
			updateOne: {
				filter: { id: item.id },
				update: item,
				upsert: true
			}
		}));
		return await MenuNavigationModel.bulkWrite(bulkWriteOptions);
	};

	static deleteNavigation = async (deletedKeys) => {
		return await MenuNavigationModel.deleteMany({ id: { $in: deletedKeys } });
	};
}
