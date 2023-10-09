import createHttpError from 'http-errors';
import { ProductTypeEnum } from '../../constants/enum';

const { ProdGameConsoleModel, ProductModel } = require('../models/product.model');

// Product service factory pattern
class ProductFactory {
	static async createProduct(type, payload) {
		switch (type) {
			case ProductTypeEnum.GAME_CONSOLE:
				return new GameConsole(payload);

			default:
				throw createHttpError.BadRequest('Invalid product type');
		}
	}
	static async updateProduct() {}
}

// Base product
class Product {
	constructor(prod_name, prod_thumb, prod_description, prod_price, prod_type, prod_attributes, prod_quantity) {
		this.prod_name = prod_name;
		this.prod_thumb = prod_thumb;
		this.prod_description = prod_description;
		this.prod_price = prod_price;
		this.prod_type = prod_type;
		this.prod_attributes = prod_attributes;
		this.prod_quantity = prod_quantity;
	}
	async createProduct(prod_id) {
		return await ProductModel.create({ ...this, _id: prod_id });
	}
}

// Game console product
class GameConsole extends Product {
	async createProduct() {
		const newGameConsole = await ProdGameConsoleModel.create(this.prod_attributes);
		if (!newGameConsole) throw createHttpError.BadRequest('Failed to add new game console');
		const newProduct = await super.createProduct(newGameConsole._id);
		if (!newProduct) throw createHttpError.BadRequest('Failed to add new game console');
		return newProduct;
	}
}

export { GameConsole };
