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
                return
            }

            roomManagement.addClientToRoom(connectionParams.room_id, connectionParams.username, socket)

            socket.on('close', () => {
                roomManagement.removeClientFromRoom(connectionParams.room_id, connectionParams.username);
                console.log('Client disconnected')
            })
        })
    }

    broadcast(message, sender, roomId) {
        roomManagement.broadcast(message, sender, roomId);
    }
}

const webSocketServer = new WebSocketServer()
module.exports = webSocketServer