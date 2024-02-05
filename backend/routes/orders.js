var express = require('express');
var router = express.Router();
const OrderModel = require('../models/order-model')
const ProductModel = require('../models/product-model');

/* GET users listing. */
router.get('/all/:id', async (req,res) => {
  try {
    if (req.params.id === process.env.API_KEY) {
      const order = await OrderModel.find()
      res.status(201).json(order);
    } else if (req.params.id !== process.env.API_KEY || !req.params.id) {
      return res
      .status(401)
      .json({ message: 'Resource not authorized' });
    }
  } catch (error) {
    console.log('error', error);
		res.status(401).json({ message: 'There was an error accessing resouce' });
  }
});

router.post('/add', async (req,res) => {
  try {
    const order = await OrderModel.create({
      user: req.body.user,
      products: req.body.products
    });
    
    orderComplete = true;

    for (const orderedProducts of req.body.products) {
      const orderStock = orderedProducts.quantity;
      const product = await ProductModel.findById(orderedProducts.productId);


      if (product.lager >= orderStock) {
        product.lager -= orderStock;
        await product.save();
      } else {
        orderComplete = false;
      }
    }

    if (orderComplete) {
          const placedOrder = await order.save();
          res.status(201).json(placedOrder);
    } else if (!orderComplete) {
      res.json({Error: 'Insufficient items in stock'});
    }
  } catch (error) {
    console.log('error', error);
		res.status(401).json({ message: 'There was an error accessing resouce' });
  }
});

router.post('/user', async (req, res) => {
  try {
    if (req.body.token === process.env.TOKEN) {
      const orders = await OrderModel.find({user: req.body.user});
      if (orders.length >= 1) {
        res.status(200).json(orders);
      } else {
        res.status(404).json({message: 'There was and error fetching products'})
      } 
    } else {
      res.status(401).json({message: 'Unauthorized to get request'})
    }
  } catch (error) {
    console.log('error', error);
    res.status(400).json({message: 'There was and error fetching products'})
  }

});

module.exports = router;
