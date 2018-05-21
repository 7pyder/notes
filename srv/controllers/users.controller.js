let express = require('express');
let router = express.Router();
let mongodb = require('mongodb');
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let config = require('../config.json');

let db
mongodb.MongoClient.connect(config.connectionString, function(err, database) {
	if (err) throw err
	db = database;
	console.log('connected to database!');
});

let expiresIn = 7 * 24 * 3600
let saltRounds = 10

let generateToken = (id) => jwt.sign({ id, expiresIn }, 'secret')

router.post('/login', (req, res) => {
	let { username, password } = req.body
	if (!username || !password) return res.status(422).send('Invalid Data')

	db.collection('users').findOne({username}, async function (err, result) {
		if (err) return res.status(500).send(err.name + ': ' + err.message);
		if (!result) return res.status(404).send('user not found!')

		let token = generateToken(result.username)
		await bcrypt.compare(password, result.password)
			.then((result) => {
				if (!result) return res.status(422).send('Invalid username or password')
				res.cookie('jwt', token, {
					maxAge: expiresIn * 1000,
					httpOnly: false,
					secure: false
				}).send('Logged in')
			})
			.catch((err) => res.status(500).send(err.name + ': ' + err.message))
	});
})

router.post('/register', function (req, res) {
	let { username, password } = req.body
	if (!username || !password) return res.status(422).send('Invalid Data')

	db.collection('users').findOne({username}, async function (err, result) {
		if (err) return res.status(500).send(err.name + ': ' + err.message);
		if (result) return res.status(422).send('username already exists!')

		await bcrypt.hash(password, saltRounds)
			.then((hash) => { password = hash })
			.catch((err) => res.status(500).send(err.name + ': ' + err.message))

		let data = {username, password}
		db.collection('users').insertOne(data, function (err, result) {
			if (err) res.status(500).send(err.name + ': ' + err.message);
			res.send({_id: result.insertedId});
		});
	});
})

module.exports = router;
