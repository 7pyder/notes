var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var config = require('../config.json');
var auth = require('../utils/auth.js')

router.use(auth.verify)

var db
mongodb.MongoClient.connect(config.connectionString, function(err, database) {
	if (err) throw err
		db = database;
	console.log('connected to database!');
});

router.post('/add', function (req, res) {
	let {name, parent} = req.body
	if (!name.trim()) return res.status(422).send('folder name can\'t be empty');
	db.collection('folders').insertOne({name, parent}, function (err, result) {
		if (err) res.status(500).send(err.name + ': ' + err.message);
		res.send({_id: result.insertedId});
	});
})

router.get('/get', function (req, res) {
	var {_id} = req.query
	let filter = {}

	if (_id) filter._id = new mongodb.ObjectId(_id)

	db.collection('folders').find(filter).sort({_id: -1}).toArray(function (err, result) {
		if (err) res.status(500).send(err.name + ': ' + err.message);
		res.send(result);
	});
})

router.put('/edit', function (req, res) {
	let {_id, name} = req.body
	if (!name.trim()) return res.status(422).send('folder name can\'t be empty');
	let data = {name}
	db.collection('folders').updateOne(
		{ _id: new mongodb.ObjectId(_id) },
		{ $set: data },
		function (err, result) {
			if (err) res.status(500).send(err.name + ': ' + err.message);
			res.send(result);
		}
	);
})

module.exports = router;
