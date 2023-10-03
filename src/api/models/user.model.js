'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import _configs from '../../configs/app.config';
import { UserRoleEnum } from '../../constants/enum';
import generatePictureByName from '../../helpers/generatePicture';

/** @constant */
const COLLECTION_NAME = 'users';

/** @constant */
const DOCUMENT_NAME = 'Users';

/**
 * @type {mongoose.Schema<User> & {authenticate: (string) => boolean}}
 */
const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			index: true
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minLength: 6,
			maxLength: 16
		},
		display_name: {
			type: String,
			required: true,
			trim: true,
			index: true
		},
		phone: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		address: {
			type: String,
			trim: true
		},
		picture: {
			type: String
		},
		role: {
			type: Number,
			enum: Object.values(UserRoleEnum)
		}
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME
	}
);

UserSchema.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(_configs.SALT_ROUND));
	this.picture = generatePictureByName(this.displayName);
	next();
});

/**
 * Compare password to authenticate
 * @param {string} password
 */
UserSchema.methods.authenticate = function (password) {
	const result = bcrypt.compareSync(password, this.password);
	return result;
};

UserSchema.methods.encryptPassword = function (password) {
	this.password = bcrypt.hashSync(password, _configs.SALT_ROUND);
};

UserSchema.plugin(require('mongoose-paginate-v2'));

const UserModel = mongoose.model(DOCUMENT_NAME, UserSchema);

export default UserModel;

/**
 * @exports @typedef User
 * @readonly @property {mongoose.Types.ObjectId | string} _id
 * @property {string} email
 * @private @property {string} password
 * @property {string} displayName
 * @property {Date} dateOfBirth
 * @property {string} address
 * @property {string} picture
 * @property {number} role
 */
