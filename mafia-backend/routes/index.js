const express = require('express');
const router = express.Router();
const roomManager = require('../helpers/roomManagement.js');
const roomManagement = require('../helpers/roomManagement.js');

router.get('/createRoom', function (req, res, next) {
    const roomId = roomManager.createRoom()
    res.json({ roomId, message: 'Room created' })
})

router.post('/checkRoom', function (req, res, next) {
    const { roomId, username } = req.body
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


router.post('/startGame', function (req, res, next) {
    const { roomId, roles } = req.body
    if (!roomId || !roles) {
        return res.status(400).send('Room ID and roles are required')
    }
    const room = roomManager.getRoom(roomId)
    if (!room) {
        return res.status(404).send('Room not found')
    }

    console.log(roles.length)
    if (roles.length !== roomManagement.getRoomSize(roomId)) {
        return res.status(404).send('Number of roles is not the same as number of players')
    }

    const shuffledRoles = roomManagement.shuffleArray(roles)
    let i = 0;
    room.forEach((client, username) => {
        const role = shuffledRoles[i++]
        client.role = role
        client.alive = true
        client.socket.send(JSON.stringify({ "status": "game_started" }))
        client.socket.send(JSON.stringify({ "status": "role", "role": role, "alive": true }))
    });


    res.send('Roles assigned and sent to players')
})


module.exports = router;