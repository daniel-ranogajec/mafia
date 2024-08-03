const express = require('express');
const router = express.Router();

router.post('/createRoom', function (req, res, next) {
    res.send("room created")
});

router.post('/getRoom', function (req, res, next) {
    res.send("get room")
});

module.exports = router;