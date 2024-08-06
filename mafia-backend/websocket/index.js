const WebSocket = require('ws')
const querystring = require('node:querystring')
const roomManagement = require('../helpers/roomManagement')
const { log } = require('node:console')

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
                return
            }


            roomManagement.addClientToRoom(connectionParams.room_id, connectionParams.username, socket)

            this.broadcast(JSON.stringify({"status": "user_connected", "user": connectionParams.username}), connectionParams.room_id, connectionParams.username)

            const players = Array.from(roomManagement.getRoom(connectionParams.room_id).keys())
            socket.send(JSON.stringify({"status": "connected", "players": players}))

            socket.on('close', () => {
                roomManagement.removeClientFromRoom(connectionParams.room_id, connectionParams.username)
                
                this.broadcast(JSON.stringify({"status": "user_disconnected", "user": connectionParams.username}), connectionParams.room_id)
            })
        })
    }

    broadcast(message, roomId, username = undefined) {        
        let room = roomManagement.getRoom(roomId)
        if (room === undefined) {
            return
        }
        room.forEach((socket, userID) => {
            if (userID !== username && socket.readyState === WebSocket.OPEN) {
                socket.send(message);
            }
        });
    }
}

const webSocketServer = new WebSocketServer()
module.exports = webSocketServer