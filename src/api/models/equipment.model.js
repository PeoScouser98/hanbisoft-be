import mongoose, { Model } from 'mongoose';
import { decimalToJSON } from '../../helpers/global';

/**
 * @typedef {Equipment & Document} EquipmentDocument
 * @type {EquipmentDocument}
 */
const EquipmentSchema = new mongoose.Schema(
	{
		prod_etc1: String,
		sale_status: String,
		sale_dept_cd: String,
		spec: String,
		sales_cd: String,
		width: mongoose.Types.Decimal128,
		carcass_cd: String,
		weight: mongoose.Types.Decimal128,
		area: mongoose.Types.Decimal128,
		yag: String,
		prod_type3: String,
		pyeong: mongoose.Types.Decimal128,
		prod_type1: String,
		prod_type: String,
		item_cd: String
	},
	{
		timestamps: true,
		collection: 'equipments',
		toJSON: true
	}
);

EquipmentSchema.set('toJSON', {
	transform: (_, r) => {
		decimalToJSON(r);
		return r;
	}
});

/** @type {Model<EquipmentDocument>} */
const EquipmentModel = mongoose.model('Equipment', EquipmentSchema);
export default EquipmentModel;

/**@declare */

/**
 * @typedef {import('mongoose').Document} Document
 * @typedef {import('mongoose').Model} Model
 */

/**
 * @typedef {Equipment & Document} EquipmentDocument
 * @type {EquipmentDocument}
 */

/**
 * @typedef Equipment
 * @property {mongoose.Types.ObjectId | string} _id
 * @property {string} prod_etc1
 * @property {string} sale_status
 * @property {string} sale_dept_cd
 * @property {string} spec
 * @property {string} sales_cd
 * @property {number} width
 * @property {string} carcass_cd
 * @property {number} weight
 * @property {number} area
 * @property {string} yag
 * @property {string} prod_type3
 * @property {number} pyeong
 * @property {string} prod_type1
 * @property {string} prod_type
 * @property {string} item_cd
 */
