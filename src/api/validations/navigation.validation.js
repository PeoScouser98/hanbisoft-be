import Joi from 'joi';

export default class MenuNavigationValidator {
	static validateMenuNavigations = async (value) => {
		const schema = Joi.object({
			id: Joi.string().required(),
			parentId: Joi.string().required(),
			path: Joi.string().lowercase().required(),
			name: Joi.object({
				en: Joi.string().required(),
				kr: Joi.string().required()
			}),
			accessible_roles: Joi.array().items(Joi.string()).required()
		});

		const arraySchema = Joi.array().items(schema);
		return await arraySchema.validateAsync(value);
	};
}
