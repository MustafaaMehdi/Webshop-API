var express = require('express');
var router = express.Router();
const UserModel = require('../models/user-model');

/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  try {
    const id = req.body.id;
    const user = await UserModel.findById(id); //kolla handledning sen om OK
    res.status(200).json(user);
  } catch (error) {
    console.log('Error', error);
    res.status(401).json({message: 'Please provide a correct userID'})
  }
});

router.post('/add', async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log('error', error);
    res.status(401).json({message: 'There was and error creating user'})
  }
});

router.post('/login', async (req, res) => {
  const inputEmail = req.body.email
  const inputPassword = req.body.password
  const user = await UserModel.findOne({email: inputEmail});
  if (user && user.password == inputPassword) {
    console.log(`Welcome ${user.name} we have missed you!`);
    res.status(201).json(user);} else {
    res.status(201).send('nice try bruv')
  }
  
});

module.exports = router;
