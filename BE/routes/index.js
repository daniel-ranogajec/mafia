var express = require('express');
var router = express.Router();
const Room = require('../models/room')
const fetch = require("node-fetch");

router.get('/', function(req, res, next) {
  Room.find().then((result) => {
		res.send(result)
	}).catch((err) => console.log(err))
});

router.post('/addRoom', function(req, res, next) {
  
});

module.exports = router;
