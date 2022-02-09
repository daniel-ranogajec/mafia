var express = require('express');
var router = express.Router();
const Room = require('../models/room')
const fetch = require("node-fetch");


//TODO: make trigger to delete room when expires_at comes
router.get('/room/:roomId', function(req, res, next) {
  Room.find({"id": req.params.roomId}).then((result) => {
		res.send(result)
	}).catch((err) => console.log(err))
});

router.post('/addRoom', function(req, res, next) {
	const room = new Room({
		id: req.body.id,
		owner_id: req.body.owner_id,
		expires_at: req.body.expires_at
	})

	room.save().then((result) => {
		res.send(result)
	}).catch((err) => console.log(err))
});




module.exports = router;
