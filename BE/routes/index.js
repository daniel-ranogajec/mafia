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
  const room = new Room({
      id: req.body.id,
      owner_id: req.body.owner_id,
  });
  room.save((err, res) => {
      if(err){
          console.log(err)
      }else{
          res.send(res)
      }
    })
});

module.exports = router;
