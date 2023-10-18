'use strict';

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import __configs from '../../configs/app.config';
import generatePictureByName from '../../helpers/generatePicture';

/** @constant */
const COLLECTION_NAME = 'users';

/** @constant */
const DOCUMENT_NAME = 'Users';

/**
 * @type {User & Document & {authenticate: (string) => boolean}}
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
			minLength: 6
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
			type: mongoose.Schema.Types.ObjectId,
			ref: 'UserRoles'
		}
	},
	{
		timestamps: true,
		strictPopulate: false,
		collection: COLLECTION_NAME
	}
);

UserSchema.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(__configs.SALT_ROUND));
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

/**
 * Encrypt password before save
 * @param {string} password
 */
UserSchema.methods.encryptPassword = function (password) {
	this.password = bcrypt.hashSync(password, __configs.SALT_ROUND);
};

UserSchema.plugin(require('mongoose-autopopulate'));
UserSchema.plugin(require('mongoose-paginate-v2'));

const UserModel = mongoose.model(DOCUMENT_NAME, UserSchema);

export default UserModel;

/**
 * @typedef User
 * @property {mongoose.Types.ObjectId | string} _id
 * @property {string} email
 * @property {string} password
 * @property {string} displayName
 * @property {Date} dateOfBirth
 * @property {string} address
 * @property {string} picture
 * @property {mongoose.Types.ObjectId | string} role
 */
