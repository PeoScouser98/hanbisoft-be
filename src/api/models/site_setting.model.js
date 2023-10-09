import mongoose from 'mongoose';
import __configs from '../../configs/app.config';

/** @constant */
const COLLECTION_NAME = 'site_settings';

/** @constant */
const DOCUMENT_NAME = 'SiteSettings';

const SiteSettingSchema = new mongoose.Schema(
	{
		logo_url: {
			type: String,
			required: true,
			trim: true
		},
		logo_fileID: {
			type: String,
			required: true,
			trim: true
		},
		site_name: {
			type: String,
			required: true,
			trim: true
		},
		address: {
			type: String,
			required: true,
			trim: true
		},
		phone: {
			type: String,
			required: true,
			trim: true,
			maxLength: 10
		},
		email: {
			type: String,
			required: true,
			trim: true
		}
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME
	}
);

// SiteSettingSchema.pre('save', function (next) {
// 	this.logo = __configs.BASE_DOWLOAD_URL + this.logo_fileID;
// 	next();
// });

const SiteSettingModel = mongoose.model(DOCUMENT_NAME, SiteSettingSchema);

export default SiteSettingModel;
