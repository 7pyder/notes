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
	let {title, folder, text} = req.body
	if (!(title.trim() || text.trim())) {
		return res.status(422).send('Invalid data');
	}
	let data = {title, folder, text}
	data.created_at = new Date()
	db.collection('notes').insertOne(data, function (err, result) {
		if (err) res.status(500).send(err.name + ': ' + err.message);
		res.send({_id: result.insertedId});
		data.note_id = result.insertedId
		data.updated_at = new Date()
		db.collection('notes_history').insertOne(data)
	});

})

router.get('/get', function (req, res) {
	var {_id, folder} = req.query
	let filter = {}

	if (_id) filter._id = new mongodb.ObjectId(_id)
	if (folder) filter.folder = folder

	db.collection('notes').find(filter).sort({created_at: -1, updated_at: -1}).toArray(function (err, result) {
		if (err) res.status(500).send(err.name + ': ' + err.message);
		res.send(result);
	});
})

router.put('/edit', function (req, res) {
	let {_id, title, folder, text} = req.body
	let data = {title, folder, text}
	data.last_updated_at = new Date()
	db.collection('notes').updateOne(
		{ _id: new mongodb.ObjectId(_id) },
		{ $set: data },
		function (err, result) {
			if (err) res.status(500).send(err.name + ': ' + err.message);
			res.send(result);
			data.note_id = _id
			data.updated_at = new Date()
			db.collection('notes_history').insertOne(data)
		}
	);
})

module.exports = router;
