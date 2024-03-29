var express = require('express');
var router = express.Router();
const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const cors = require('cors');

/* GET users listing. */
router.get('/', async (req, res) => {
	try {
		const users = await UserModel.find().select('-password -__v');
		res.status(200).json(users);
	} catch (error) {
		console.log('Error', error);
		res.status(401).json({ message: 'There was an error fetching users' });
	}
});

router.post('/', async (req, res) => {
	try {
		// if (req.body.id) {
		const user = await UserModel.findById({ _id: req.body.id })
			.exec()
			.then((user) => {
				if (user) {
					res.status(200).json(user);
				} else {
					res.status(401).json({ message: 'User does not exist' });
				}
			});
	} catch (error) {
		console.log('Error', error);
		res
			.status(401)
			.json({
				message:
					'Something went wrong, please try again and make sure to provide correct userId',
			});
	}
});

router.post('/add', async (req, res) => {
	try {
		const checkExistingUser = await UserModel.find({email: req.body.email}).exec();

		if (checkExistingUser.length >= 1) {
			return res.status(409).json({ message: 'E-mail address already exists' });
		}

		const cryptedPass = await bcrypt.hash(req.body.password, 10);

		const user = await UserModel.create({
			name: req.body.name,
			email: req.body.email,
			password: cryptedPass,
		});
    const result = await user.save();
    console.log(result);
    return res.status(201).json(user);
	} catch (error) {
		console.log('error', error);
		return res
			.status(500)
			.json({ message: 'There was and error creating user' });
	}
});

router.post('/login', async (req, res) => {
	try {
		let inputPassword = req.body.password;
		let user = await UserModel.findOne({ email: req.body.email }).exec();
		if (!user) {
			return res.status(404).json({
				message: 'User does not exist',
			});
		}
		await bcrypt.compare(inputPassword, user.password, (err, result) => {
			if (err) {
				return res.status(401).json({
					message: 'Login failed',
				});
			}
			if (result) {
				console.log('Login successful');
				return res.status(200).json({
					id: user._id,
					name: user.name,
				});
			} else if (!result) {
				return res.status(401).json({
					message: 'Login failed',
				});
			}
		});
	} catch (error) {
		console.log('ERROR', error);
		res.status(500).json({ error: 'something went wrong' });
	}
});

module.exports = router;

