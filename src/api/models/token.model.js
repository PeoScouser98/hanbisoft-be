import mongoose from 'mongoose';

/** @constant */
const COLLECTION_NAME = 'tokens';

/** @constant */
const DOCUMENT_NAME = 'Tokens';

/** @instance */
const TokenSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Users'
		},
		publicKey: {
			type: String,
			required: true
		},
		refreshToken: {
			type: Array,
			default: []
		}
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
		expires: '30d'
	}
);

const TokenModel = mongoose.model(DOCUMENT_NAME, TokenSchema);

export default TokenModel;
