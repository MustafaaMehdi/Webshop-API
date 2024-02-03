var express = require('express');
var router = express.Router();
const ProductModel = require('../models/product-model')

/* GET users listing. */
router.get('/', async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
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
