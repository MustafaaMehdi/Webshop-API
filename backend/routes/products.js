var express = require('express');
var router = express.Router();
const ProductModel = require('../models/product-model');
const CategoryModel = require('../models/categories-model');

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
		if (!product) res.status(404).json({ message: 'Product not found' });
	} catch (error) {
		console.log('Error', error);
		res.status(404).json({ message: 'Please provide a correct productID' });
	}
});

router.post('/add', (req, res) => {
	try {
		if (req.body.token === process.env.TOKEN) {
			CategoryModel.findById(req.body.category)
				.exec()
				.then(async (category) => {
					console.log(category);
					if (!category) {
						return res
							.status(404)
							.json({ message: 'Please select an existing category' });
					} else {
						const product = await ProductModel.create({
							name: req.body.name,
							description: req.body.description,
							price: req.body.price,
							lager: req.body.lager,
							category: req.body.category,
						});
						product.save().then((result) => {
							console.log(result);
							res.status(201).json(product);
						});
					}
				});
		} else {
			res.status(401).json({ message: 'Unauthorized to create product' });
		}
	} catch (error) {
		console.log('error', error);
		res.status(401).json({ message: 'There was and error creating product' });
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
