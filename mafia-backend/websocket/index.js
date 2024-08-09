const WebSocket = require('ws')
const querystring = require('node:querystring')
const roomManagement = require('../helpers/roomManagement')

class WebSocketServer {
    constructor() {
        this.websocketServer = null
    }

    init(server) {
        this.websocketServer = new WebSocket.Server({server})

        this.websocketServer.on('connection', (socket, connectionRequest) => {
            const [_path, params] = connectionRequest?.url?.split("?")
            const connectionParams = querystring.parse(params)

            if (connectionParams.username === undefined || connectionParams.room_id === undefined) {
                socket.send(JSON.stringify({"error": "username and/or room_id is undefined" }))
                socket.close()
                return
            }

            const room = roomManagement.getRoom(connectionParams.room_id)
            if (room === undefined) {
                socket.send(JSON.stringify({"error": "room is unknown" }))
                socket.close()
                return
            }

            roomManagement.addClientToRoom(connectionParams.room_id, connectionParams.username, socket)

            this.broadcast(JSON.stringify({"status": "user_connected", "user": connectionParams.username}), connectionParams.room_id, connectionParams.username)

            const players = Array.from(roomManagement.getRoom(connectionParams.room_id).keys())
            socket.send(JSON.stringify({"status": "connected", "players": players}))

            socket.on('message', (message) => {
                console.log(`Received message from ${connectionParams.username}: ${message}`)

                let messageJSON = JSON.parse(message)
                if (messageJSON.message === "refresh") {
                    let client = room.get(connectionParams.username)
                    if (client === undefined) {
                        socket.send(JSON.stringify({"error": "client is undefined" }))
                        return
                    }
                    socket.send(JSON.stringify({"status": "connected", "players": players}))
                    if (client.role !== "") {
                        socket.send(JSON.stringify({"status": "role", "role": client.role, "alive": client.alive }))
                    }
                } else if (messageJSON.message === "night") {
                    if (messageJSON.player !== null) {
                        roomManagement.setVotes(connectionParams.room_id, messageJSON.player, messageJSON.message)
                    }

                    this.broadcast(JSON.stringify({"status": "user_voted_night", "user": connectionParams.username}), connectionParams.room_id, connectionParams.username)
                } else if (messageJSON.message === "voting") {
                    if (messageJSON.player !== null) {
                        roomManagement.setVotes(connectionParams.room_id, messageJSON.player, messageJSON.message)
                    }

                    this.broadcast(JSON.stringify({"status": "user_voted", "user": connectionParams.username}), connectionParams.room_id, connectionParams.username)
                }
            })

            socket.on('close', () => {
                roomManagement.removeClientFromRoom(connectionParams.room_id, connectionParams.username)

                this.broadcast(JSON.stringify({"status": "user_disconnected", "user": connectionParams.username}), connectionParams.room_id)
            })
        })
    }

    broadcast(message, roomId, username = undefined) {
        let room = roomManagement.getRoom(roomId)
        if (room === undefined) {
            console.log("unable to broadcast, room is undefined")
            return
        }
        room.forEach((client, userID) => {
            if (userID !== username && client.socket.readyState === WebSocket.OPEN) {
                client.socket.send(message);
            }
        });
    }
}

const webSocketServer = new WebSocketServer()
module.exports = webSocketServer