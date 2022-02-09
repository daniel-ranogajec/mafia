var express = require('express');
var router = express.Router();
const Room = require('../models/room')
const fetch = require("node-fetch");

//
//TODO: make trigger to delete room when expires_at comes
//
//
//

router.get('/room/:roomId', function(req, res, next) {
  Room.find({"id": req.params.roomId}).then((result) => {
		res.send(result)
	}).catch((err) => console.log(err))
});

//parameters sent: id, owner as { user_id: "", firstname: "", lastname: "", picture: "" }, expires_at
router.post('/addRoom', function(req, res, next) {
	const room = new Room({
		id: req.body.id,
		owner: req.body.owner,
		users: [],
		expires_at: req.body.expires_at
	})

	room.save().then((result) => {
		res.send(result)
	}).catch((err) => console.log(err))
});

//parameters sent: user as { user_id: "", firstname: "", lastname: "", picture: "" }
router.post('/room/:roomId/addUser', function(req, res, next) {
	Room.updateOne({"id": req.params.roomId}, {$push: {"users": req.body.user}}).then((result) => {
		res.send(result)
	}).catch((err) => console.log(err))
});

//parameters sent: user as { user_id: "", firstname: "", lastname: "", picture: "" }
router.post('/room/:roomId/removeUser', function(req, res, next) {
	Room.updateOne({"id": req.params.roomId}, {$pull: {"users": req.body.user}}).then((result) => {
		res.send(result)
	}).catch((err) => console.log(err))
});



module.exports = router;
