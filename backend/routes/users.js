var express = require('express');
var router = express.Router();
const UserModel = require('../models/user-model');

/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const id = req.body.id;
  const user = await UserModel.findById(id); //kolla handledning sen om OK
  res.status(200).json(user);
});

router.post('/add', async (req, res) => {
  const user = await UserModel.create(req.body);
  res.status(201).json(user);
});

router.post('/login', async (req, res) => {
  // const inputEmail = req.body.email
  // const inputPassword = req.body.password
  const user = await UserModel.findOne({email: req.body.email, password: req.body.password});
  res.status(201).json(user);
});

module.exports = router;
