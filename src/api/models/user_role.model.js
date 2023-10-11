import mongoose, { Document, Model } from 'mongoose';

/** @constant */
const COLLECTION_NAME = 'user_roles';

/** @constant */
const DOCUMENT_NAME = 'UserRoles';

/**@type {UserRoleDocument} */
const UserRolesSchema = new mongoose.Schema(
	{
		role_cd: {
			type: Number,
			required: true,
			unique: true
		},
		role_name: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true
		},
		permissions: {
			allow_adding: Boolean,
			allow_updating: Boolean,
			allow_deleting: Boolean
		}
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
		versionKey: false
	}
);

/**@type {Model<UserRoleDocument>} */
const UserRoleModel = mongoose.model(DOCUMENT_NAME, UserRolesSchema);

export default UserRoleModel;

/**
 * @typedef UserRole
 * @property {mongoose.Types.ObjectId} _id
 * @property {string} role_name
 * @property {{allowAdding: boolean, allowUpdating: boolean, allowDeleting: boolean}} permission
 * ----------------------------------------------------------------------------------------------
 * @typedef {UserRole & Document} UserRoleDocument
 */
