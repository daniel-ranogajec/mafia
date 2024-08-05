const express = require('express');
const router = express.Router();
const roomManager = require('../helpers/roomManagement.js');

router.get('/createRoom', function (req, res, next) {
    const roomId = roomManager.createRoom()
    res.json({ roomId, message: 'Room created' })
})

router.post('/checkRoom', function (req, res, next) {
    const { roomId, username } = req.body
    console.log(roomId)
    console.log(username)
    if (!roomId || !username) {
        return res.status(400).send('Room ID and username are required')
    }
    const room = roomManager.getRoom(roomId)
    if (room) {
        if (room.has(username)) {
            return res.status(400).send('Username already exists in the room')
        }
        res.json({ roomId, "result": "Ok" })
    } else {
        res.status(404).send('Room not found')
    }
})

module.exports = router;