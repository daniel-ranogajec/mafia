const WebSocket = require('ws')
const querystring = require('node:querystring');
const { log } = require('node:console');

class WebSocketServer {
    constructor() {
        this.websocketServer = null;
        this.rooms = new Map()
    }

    init(server) {
        this.websocketServer = new WebSocket.Server({server});

        this.websocketServer.on('connection', (socket, connectionRequest) => {
            const [_path, params] = connectionRequest?.url?.split("?");
            const connectionParams = querystring.parse(params);

            if (connectionParams.username === undefined || connectionParams.room_id === undefined) {
                return
            }

            console.log("username: " + connectionParams.username)
            console.log("room_id: " + connectionParams.room_id)

            let clients = this.rooms.get(connectionParams.room_id)
            if (clients === undefined) {
                clients = new Map()
                this.rooms.set(connectionParams.room_id, clients)
            }

            clients.set(connectionParams.username, socket)
            this.rooms.set(connectionParams.room_id, clients)

            socket.on('close', () => {
                this.rooms.get(connectionParams.room_id).delete(connectionParams.username);
                console.log('Client disconnected');
            });
        });
    }

    broadcast(message, sender, roomId) {
        let room = this.rooms.get(roomId)
        if (room === undefined) {
            return
        }
        room.forEach((socket, userID) => {
            if (userID !== sender && socket.readyState === WebSocket.OPEN) {
                socket.send(message);
            }
        });
    }
};

const webSocketServer = new WebSocketServer();
module.exports = webSocketServer;