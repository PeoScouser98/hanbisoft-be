import mongoose, { Model, PaginateModel, Document } from 'mongoose';
import { decimalToJSON } from '../../helpers/global';
import mongoosePaginate from 'mongoose-paginate-v2';

/** @constant */
const COLLECTION_NAME = 'equipments';

/** @constant */
const DOCUMENT_NAME = 'Equipment';

/** @type {EquipmentDocument} */
const EquipmentSchema = new mongoose.Schema(
	{
		item_cd: String,
		prod_type3: String,
		prod_type1: String,
		prod_type2: String,
		prod_type: String,
		prod_etc1: String,
		carcass_cd: String,
		fg_cd: String,
		sale_status: String,
		sales_cd: String,
		sale_dept_cd: String,
		spec: String,
		width: mongoose.Types.Decimal128,
		weight: mongoose.Types.Decimal128,
		length: String,
		area: mongoose.Types.Decimal128,
		yag: String,
		pyeong: mongoose.Types.Decimal128
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
		toJSON: true
	}
);

EquipmentSchema.set('toJSON', {
	transform: (_, r) => {
		decimalToJSON(r);
		return r;
	}
});

EquipmentSchema.index({ item_cd: 'text', carcass_cd: 'text' });
EquipmentSchema.plugin(mongoosePaginate);

/** @type {EquipmentPaginateModel} */
const EquipmentModel = mongoose.model(DOCUMENT_NAME, EquipmentSchema);

export default EquipmentModel;

/** @declare */

/**
 * @typedef {import('mongoose').Document} Document
 * @typedef {import('mongoose').Model} Model
 * @typedef {import('mongoose').PaginateModel} PaginateModel
 * @typedef {Equipment & Document} EquipmentDocument
 * @typedef {PaginateModel<EquipmentDocument>} EquipmentPaginateModel
 */

/**
 * @exports @typedef Equipment
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
