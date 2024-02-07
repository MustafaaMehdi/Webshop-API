var express = require('express');
var router = express.Router();
const ProductModel = require('../models/product-model');
const CategoryModel = require('../models/categories-model');
const productModel = require('../models/product-model');

/* GET users listing. */
router.get('/', async (req, res) => {
	try {
		const products = await ProductModel.find();
		res.status(200).json(products);
	} catch (error) {
		console.log('error', error);
		res.status(400).json({ message: 'There was and error fetching products' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const product = await ProductModel.findOne({ _id: req.params.id });
		if (!product) return res.status(404).json({ message: 'Product not found' });
		res.status(200).json({product})
	} catch (error) {
		console.log('Error', error);
		res.status(404).json({ message: 'Please provide a correct productID' });
	}
});

router.post('/add', async (req, res) => {
	try {
		if (req.body.token === process.env.TOKEN) {
			const category = await CategoryModel.findById(req.body.category)

			if (!category || category === null) {
				return res.status(404).json({message: "Please select an existing category"})
			} else {
				const product = await productModel.create({
					name: req.body.name,
					description: req.body.description,
					price: req.body.price,
					lager: req.body.lager,
					category: req.body.category
				})
				const result = await product.save()
				return res.status(201).json(product)
			}
		} else {
			return res.status(401).json({message: "Unauthorized to create product"})
		}
	}
	catch (error) {
		console.log('error', error);
		return res.status(500).json({message: "There was an error creating product, please make sure to choose an existing category"})
	} 
});

router.get('/category/:id', async (req, res) => {
	try {
		const categories = await ProductModel.find({ category: req.params.id });
		if (categories.length < 1) {
			return res.status(404).json({ message: 'No products in this category' });
		}

		res.status(200).json(categories);
	} catch (error) {
		console.log('error', error);
		res.status(400).json({ message: 'There was and error fetching products' });
	}
});

module.exports = router;
