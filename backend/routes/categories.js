var express = require('express');
var router = express.Router();
const CategoryModel = require('../models/categories-model');
const productModel = require('../models/product-model');

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log('error', error);
    res.status(400).json({message: 'There was and error fetching products'})
  }
});

router.post('/add', async (req, res) => {
  try {
    if (req.body.token === process.env.TOKEN) {
      CategoryModel.find({name: req.body.name}).exec()
    .then(async category => {
      if (category.length >= 1) {
        return res.status(409).json({message: 'Category already exists'})
      } else {
          const category = await CategoryModel.create({
            name: req.body.name,
            // token: req.body.token
          })
          category.save().then(result =>{
            console.log(result);
            res.status(201).json(category);
          })
      }
    })
    } else {
      res.status(401).json({ message: 'Unauthorized to add category' });
    }
  } catch (error) {
    console.log('error', error);
		res.status(401).json({ message: 'There was and error creating category' });
  }




  // try {
  //   CategoryModel.find({name: req.body.name}).exec()
  //   .then(async category => {
  //     if (category.length >= 1) {
  //       return res.status(409).json({message: 'Category already exists'})
  //     } else {
  //       if (req.body.token === process.env.TOKEN) {
  //         const category = await CategoryModel.create({
  //           name: req.body.name,
  //           token: req.body.token
  //         })
  //         category.save("-token").then(result =>{
  //           console.log(result);
  //           res.status(201).json(category);
  //         })
  //       } else {
  //         res.status(401).json({ message: 'Unauthorized to add category' });
  //       }
  //     }
  //   })
  // } catch (error) {
  //   console.log('error', error);
	// 	res.status(401).json({ message: 'There was and error creating category' });
  // }

});





module.exports = router;
