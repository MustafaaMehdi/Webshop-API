var express = require('express');
var router = express.Router();
const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', async (req, res) => {
	const users = await UserModel.find().select('-password');
	res.status(200).json(users);
});

router.post('/', async (req, res) => {
	try {
		// const id = req.body.id;
		const user = await UserModel.findById({_id: req.body.id}); //kolla handledning sen om OK
		res.status(200).json(user);
	} catch (error) {
		console.log('Error', error);
		res.status(401).json({ message: 'Please provide a correct userID' });
	}
});

router.post('/add', (req, res) => {
  try {
    UserModel.find({email: req.body.email}).exec().then(user => {
      if (user.length >= 1) {
        return res.status(409).json({message: 'E-mail address already exists'})
      } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            })
          } else {
            const user = await UserModel.create({
              name: req.body.name,
              email: req.body.email,
              password: hash
            });
            user.save().then(result => {
              console.log(result);
              res.status(201).json(user)});
          }
        })
      }
    })
	} catch (error) {
		console.log('error', error);
		res.status(401).json({ message: 'There was and error creating user' });
	}
});

router.post('/login', async (req, res) => {
  try {
    const inputPassword = req.body.password;
    const user = await UserModel.findOne({ email: req.body.email }).exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).json({
          message: 'User does not exist'
        })
      } 
      bcrypt.compare(inputPassword, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Login failed'
          })
        }
        if (result) {
          return res.status(200).json({
            message: 'Login success'
          })
        } else if (!result) {
          return res.status(401).json({
            message: 'Login failed'
          })
        }
      })
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({error})
  }
});

module.exports = router;
