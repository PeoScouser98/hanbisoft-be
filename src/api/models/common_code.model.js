import mongoose, { Document, Model } from 'mongoose';

/** @constant */
const COLLECTION_NAME = 'common_codes';

/** @constant */
const DOCUMENT_NAME = 'CommonCodes';

/** @type {CommonCodeDocument} */
const CommonCodeSchema = new mongoose.Schema(
	{
		field: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true
		},
		expressions: {
			en: {
				type: String,
				required: true,
				trim: true
			},
			kr: {
				type: String,
				required: true,
				trim: true
			}
		},
		collection: {
			type: String,
			required: true,
			trim: true
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			autopopulate: true
		}
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
		versionKey: false
	}
);
/** @type {CommonCodeModel} */
const CommonCodeModel = mongoose.model(DOCUMENT_NAME, CommonCodeSchema);

export default CommonCodeModel;

/**
 * @typedef CommonCode
 * @property {string} code
 * @property {{kr: string, en: string}} expression
 * @property {string} collection
 * @property {mongoose.Types.ObjectId} createdBy
 * -----------------------------------------------------------
 * @typedef {CommonCode & Document} CommonCodeDocument
 * @typedef {Model<CommonCodeDocument>} CommonCodeModel
 */
