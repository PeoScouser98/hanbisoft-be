import mongoose, { Document, Model } from 'mongoose';

/** @constant */
const COLLECTION_NAME = 'menu_navigation';
/** @constant */
const DOCUMENT_NAME = 'MenuNavigation';

/** @type {MenuNavigationDocument} */
const MenuNavigationSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true
		},
		parentId: {
			type: String
		},
		path: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true
		},
		name: {
			en: {
				type: String,
				required: true,
				trim: true,
				lowercase: true
			},
			kr: {
				type: String,
				required: true,
				trim: true,
				lowercase: true
			}
		},
		accessible_roles: {
			type: [mongoose.Schema.Types.ObjectId],
			default: []
		}
	},
	{
		_id: false,
		timestamps: true,
		collection: COLLECTION_NAME
	}
);

/** @type {MenuNavigationModel} */
const MenuNavigationModel = mongoose.model(DOCUMENT_NAME, MenuNavigationSchema);

export default MenuNavigationModel;

/**
 * @typedef MenuNavigation
 * @property {string} id
 * @property {string} parentId
 * @property {string} path
 * @property {{en: string, kr: string}} name
 * @property {Array<string>} accessible_roles
 * ----------------------------------------------------
 * @typedef {Document & MenuNavigation} MenuNavigationDocument
 * @typedef {Model<MenuNavigationDocument>} MenuNavigationModel
 */
