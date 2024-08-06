class RoomManager {
    constructor() {
        this.rooms = new Map()
    }

    generateRoomId() {
        let roomId
        do {
            roomId = Math.floor(100000 + Math.random() * 900000).toString()
        } while (this.rooms.has(roomId))
        return "1234"
    }

    createRoom() {
        const roomId = this.generateRoomId()
        this.rooms.set(roomId, new Map())
        return roomId
    }

    getRoom(roomId) {
        return this.rooms.get(roomId) || undefined
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

    getRoomSize(roomId) {
        const clients = this.rooms.get(roomId)
        if (clients) {
            return clients.size
        }
        return 0
    }

    shuffleArray(array) {
        console.log(array)
        let currentIndex = array.length
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        } 
        return array
    }
}

module.exports = new RoomManager()
