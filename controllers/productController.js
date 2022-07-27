const Product = require("../models/Product");

module.exports.getAll = () => {
	return Product.find().then(result => {
		return result;
	})
}

module.exports.getAllActive = () => {
	return Product.find({isActive : true}).then(result => {
		return result;
	})
}

module.exports.addProduct = (body) => {
	let newProduct = new Product({
		name : body.name,
		description : body.description,
		price : body.price
	});

	return newProduct.save().then((product, error) => {
		if (error) {
			return false;
		} else {
			return true;
		}
	})
}

module.exports.getProduct = (productId) => {
	return Product.findById(productId).then(result => {
		return result;
	})
}

module.exports.updateProduct = (productId, body) => {
	let updatedProduct = {
		name : body.name,
		description	: body.description,
		price : body.price
	}

	return Product.findByIdAndUpdate(productId, updatedProduct).then((product, error) => {
		if (error) {
			return false;
		} else {
			return true;
		}
	})
}

module.exports.archiveProduct = (productId) => {
	let updateActiveField = {
		isActive : false
	}

	return Product.findByIdAndUpdate(productId, updateActiveField).then((course, error) => {
		if (error) {
			return false;
		} else {
			return true;
		}
	})
}

module.exports.activateProduct = (productId) => {
	let updateActiveField = {
		isActive : true
	}

	return Product.findByIdAndUpdate(productId, updateActiveField).then((course, error) => {
		if (error) {
			return false;
		} else {
			return true;
		}
	})
}
