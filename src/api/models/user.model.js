import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import _configs from '../../configs/app.config';
import { UserRoleEnum } from '../../constants/enum';
import generatePictureByName from '../../helpers/generatePicture';

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minLength: 6,
			maxLength: 16
		},
		displayName: {
			type: String,
			required: true
		},
		dateOfBirth: {
			type: Date,
			required: true,
			default: new Date()
		},
		address: {
			type: String,
			trim: true,
			required: true
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
		collection: 'users'
	}
);

UserSchema.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(_configs.SALT_ROUND));
	this.picture = generatePictureByName(this.displayName)
	next();
});

/**
 * @description Compare password to authenticate
 * @param {string} password
 */
UserSchema.methods.authenticate = function (password) {
	const result =  bcrypt.compareSync(password, this.password);
	return result
};

UserSchema.plugin(require('mongoose-paginate-v2'));

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;
