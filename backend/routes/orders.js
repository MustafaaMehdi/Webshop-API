var express = require('express');
var router = express.Router();
const OrderModel = require('../models/order-model')
const ProductModel = require('../models/product-model');

/* GET users listing. */
router.get('/all', async (req,res) => {
  const order = await OrderModel.find()
  res.status(201).json(order);
});

router.post('/add', async (req,res) => {
    const order = await OrderModel.create({
      user: req.body.user,
      products: req.body.products,
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
});

module.exports = router;
