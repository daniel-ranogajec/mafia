class RoomManager {
    constructor() {
        this.rooms = new Map()
    }

    generateRoomId() {
        let roomId
        do {
            roomId = Math.floor(100000 + Math.random() * 900000).toString()
        } while (this.rooms.has(roomId))
        return roomId
    }

    createRoom() {
        const roomId = this.generateRoomId()
        this.rooms.set(roomId, new Map())
        return roomId
    }

    getRoom(roomId) {
        return this.rooms.get(roomId) || null
    }

    deleteRoom(roomId) {
        if (this.rooms.has(roomId)) {
            this.rooms.delete(roomId)
            return true
        }
        return false
    }

    addClientToRoom(roomId, username, socket) {
        let clients = this.rooms.get(roomId)
        if (!clients) {
            clients = new Map()
            this.rooms.set(roomId, clients)
        }
        clients.set(username, socket)
    }

    removeClientFromRoom(roomId, username) {
        const clients = this.rooms.get(roomId)
        if (clients) {
            clients.delete(username)
            if (clients.size === 0) {
                this.rooms.delete(roomId)
            }
        }
    }
}

module.exports = new RoomManager()
