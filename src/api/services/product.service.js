class ProductFactory {
	static async createProductasync() {
		//
	}
	static async updateProduct() {}
}

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
	async createProduct() {}
}
