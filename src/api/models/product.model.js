import mongoose from 'mongoose';
import { ProductTypeEnum } from '../../constants/enum';

const ProductSchema = new mongoose.Schema(
	{
		prod_cd: {
			type: String,
			uppercase: true,
			trim: true
		},
		prod_name: {
			type: String,
			required: true,
			trim: true
		},
		prod_price: {
			type: Number,
			required: true,
			min: 0
		},
		prod_qty: {
			type: Number,
			required: true,
			min: 0
		},
		prod_description: {
			type: String,
			trim: true
		},
		prod_thumb: {
			type: String,
			required: true
		},
		prod_attributes: {
			type: mongoose.Schema.Types.Mixed,
			required: true
		},
		prod_type: {
			type: String,
			required: true,
			enum: Object.values(ProductTypeEnum)
		}
	},
	{
		timestamps: true,
		collection: 'products'
	}
);

const ProdGameConsoleSchema = new mongoose.Schema(
	{
		manufactory: {
			type: String,
			required: true
		},
		physical_stats: {
			color: {
				type: String,
				required: true
			},
			weight: {
				type: Number,
				required: true
			}
		},
		detailed_configuration: {
			cpu: {
				type: String,
				trim: true
			},
			ram: {
				type: String,
				trim: true
			},
			disk: {
				type: String,
				trim: true
			},
			av_output: {
				type: String
			}
		}
	},
	{
		collection: 'prod_game_console'
	}
);

const ProdGameControllerSchema = new mongoose.Schema(
	{
		manufactory: {
			type: String,
			required: true
		},
		physical_stats: {
			dimension: { type: String, trim: true },
			weight: { type: Number, min: 0 }
		},
		detailed_configuration: {
			connection: {
				type: String
			}
		}
	},
	{
		collection: 'prod_game_controller'
	}
);

const ProdGameSchema = new mongoose.Schema(
	{
		publisher: {
			type: String,
			required: true
		},
		category: {
			type: String,
			required: true
		},
		publish_at: {
			type: Date,
			required: true,
			default: new Date()
		},
		language_sp: {
			type: [String]
		}
	},
	{
		collection: 'prod_games'
	}
);

export const ProductModel = mongoose.model('Products', ProductSchema);
export const ProdGameConsoleModel = mongoose.model('GameConsole', ProdGameConsoleSchema);
export const ProdGameControllerModel = mongoose.model('GameController', ProdGameControllerSchema);
export const ProdGamesModel = mongoose.model('Games', ProdGameSchema);
