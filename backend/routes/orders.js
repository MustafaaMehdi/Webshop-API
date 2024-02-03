var express = require('express');
var router = express.Router();
// const { ObjectId } = require('mongodb');
// const mongoose = require('mongoose');
const OrderModel = require('../models/order-model')
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

    const placedOrder = await order.save();
    console.log({user: order.name});
    res.status(201).json(placedOrder);
});

module.exports = router;
