var express = require('express');
var router = express.Router();
const ProductModel = require('../models/product-model')

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.log('error', error);
    res.status(400).json({message: 'There was and error fetching products'})
  }

});

router.get('/:id', async (req, res) => {
  try {
    const product = await ProductModel.findOne({_id: req.params.id});
    if (!product) console.log('Error: product does not exists');
    res.status(200).json(product);
  } catch (error) {
    console.log('Error', error);
    res.status(401).json({message: 'Please provide a correct productID'})
  }
});

router.post('/add', async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log('error', error);
    res.status(401).json({message: 'There was and error creating product'})
  }
});





module.exports = router;
