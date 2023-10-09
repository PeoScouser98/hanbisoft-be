import mongoose from 'mongoose';

/** @constant */
const COLLECTION_NAME = 'navigation';
/** @constant */
const DOCUMENT_NAME = 'Navigation';

const NavigationSchema = new mongoose.Schema(
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
		translation: {
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
		collection: COLLECTION_NAME,
		timestamps: true,
		_id: false
	}
);

const NavigationModel = mongoose.model(DOCUMENT_NAME, NavigationSchema);

export default NavigationModel;
