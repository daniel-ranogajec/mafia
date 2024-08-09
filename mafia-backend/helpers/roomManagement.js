const WebSocket = require("ws");

class RoomManager {
    constructor() {
        this.rooms = new Map()
        this.votes = new Map()
        this.count = new Map()
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
        this.votes.set(roomId, [])
        this.count.set(roomId, 0)
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
        let votes = this.votes.get(roomId)
        votes.push({"player": username, count: 0})
        if (!clients) {
            clients = new Map()
            this.rooms.set(roomId, clients)
            this.votes.set(roomId, votes)
        }
        clients.set(username, {role: "", alive: true, socket: socket, "voted_for": ""})
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
        let currentIndex = array.length
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        }
        return array
    }

    setVotes(roomId, player, votedFor, phase) {
        if (phase === "voting") {
            let votes = this.votes.get(roomId)
            votes.forEach(e => {
                if (e.player === votedFor) {
                    e.count++
                }
            })
        } else if (phase === "night") {
            let clients = this.rooms.get(roomId)
            let client = clients.get(player)
            if (client.role.toLowerCase() === "detective") {
                let role = clients.get(votedFor).role
                if (role !== undefined) {
                    client.socket.send(JSON.stringify({"status": "check_role", "player": votedFor, "role": clients.get(votedFor).role}))
                } else {
                    client.socket.send(JSON.stringify({"error": "player role not found"}))
                }
            }
            client.voted_for = votedFor
        }

        let count = this.count.get(roomId)
        this.count.set(roomId, ++count)
        this.checkIfAllVoted(roomId, phase)
    }

    checkIfAllVoted(roomId, phase) {
        let clients = this.rooms.get(roomId)
        let clientsArray = Array.from(clients.values());
        let aliveVotes = clientsArray.filter(e => e.alive)

        if (this.count.get(roomId) >= aliveVotes.length) {
            this.resolveAction(roomId, phase)
        }
    }

    resolveAction(roomId, phase) {
        let playerToKill
        if (phase === "voting") {
            let votes = this.votes.get(roomId)
            let maxCount = Math.max(...votes.map(player => player.count))
            let playersWithMaxCount = votes.filter(player => player.count === maxCount)

            let randomIndex = Math.floor(Math.random() * playersWithMaxCount.length)
            playerToKill = playersWithMaxCount[randomIndex].player
        } else if (phase === "night") {
            let clients = this.rooms.get(roomId)
            let clientsArray = Array.from(clients.values());
            let mafiaVotes = clientsArray.filter(e => { return e.role.toLowerCase() === "mafia"}).map(e => e.voted_for)

            let count = {}

            mafiaVotes.forEach(player => {
                if (count[player]) {
                    count[player]++;
                } else {
                    count[player] = 1;
                }
            })
            let maxCount = Math.max(...Object.values(count))
            let playersWithMaxCount = Object.keys(count).filter(name => count[name] === maxCount)

            let randomIndex = Math.floor(Math.random() * playersWithMaxCount.length)

            playerToKill = playersWithMaxCount[randomIndex]

            let doctorVotes = clientsArray.filter(e => { return e.role.toLowerCase() === "mafia"}).map(e => e.voted_for)

            if (doctorVotes.length > 0) {
                if (doctorVotes[0] === playerToKill) {
                    playerToKill = undefined
                }
            }

        }

        if (playerToKill !== undefined) {
            let clients = this.rooms.get(roomId)
            let player = clients.get(playerToKill)
            player.alive = false

            this.rooms.get(roomId).forEach((client, userID) => {
                client.socket.send(JSON.stringify({"status": "voted_out", "player": playerToKill}))
            })
        }
        let voting = this.votes.get(roomId)
        let votingNew = voting.filter(e => e.player !== playerToKill).map(e => { return {"player": e.player, "count": 0}})
        this.votes.set(roomId, votingNew)
        this.count.set(roomId, 0)


    }

}

module.exports = new RoomManager()
