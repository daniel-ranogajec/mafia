import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { usePlayRoom } from './playRoom'

export const useWebsocket = defineStore('websocket', () => {
  const router = useRouter()
  const messages = ref<string>('')
  const playRoom = usePlayRoom();

  const uname = localStorage.getItem('username')
  const userName = ref<string>(uname ? uname : '')
  const role = ref<string>("")
  const roomId = ref<string>('')
  const playerVoutedOut = ref<string | null>(null)
  const allReady = ref<boolean>(false)
  const endMesagge = ref<string>('')

  const players = ref<string[]>([])
  const deadPlayers = ref<string[]>([])

  const socket = ref<WebSocket | null>(null)

  function joinNewSocket() {
    playerVoutedOut.value = null;
    endMesagge.value = '';
    messages.value = '';

    if (!socket.value) {
      if (userName.value == '') {
        return
      }
      localStorage.setItem('username', userName.value)
      socket.value = new WebSocket(
        `${import.meta.env.VITE_API_BASE_URL}?username=${userName.value}&room_id=${roomId.value}`
      )

      socket.value.onopen = () => {
        console.log('WebSocket connection established')
        socket.value?.send(JSON.stringify({'message': 'refresh'}))
      }

      socket.value.onerror = (error) => {
        console.error('WebSocket encountered an error:', error)
      }

      socket.value.onmessage = (event) => {
        allReady.value = false;
        try {
          const message = JSON.parse(event.data)
          if (message.status === 'user_connected' || message.status === 'connected') {
            if (message.players !== undefined) {
              players.value = message.players
            } else {
              players.value.push(message.user)
            }
          } else if (message.status === 'user_disconnected') {
            removePlayer(message.user)
          } else if (message.status === 'all_ready') {
            playRoom.nextCycle();
          }
          if (message.status === 'role') {
            role.value = message.role
            router.push({ path: `/PlayRoom/${roomId.value}` })
          }
          if (message.status === 'voted_out') {
            deadPlayers.value.push(message.player)
            playerVoutedOut.value = message.player
            const newArray = players.value.filter((val) => val !== message.player)
            players.value = newArray
            playRoom.nextCycle();
          }
          if (message.status === 'nothing') {
            messages.value = message.message
            playRoom.nextCycle();
          }
          if (message.status === 'game_over') {
            if(message.message === 'mafia_wins') {
              endMesagge.value = 'Mafia won!'
            } else {
              endMesagge.value = 'Villagers won!'
            }
          }
        } catch (parseError) {
          console.error('Error parsing WebSocket message:', parseError)
        }
      }

      socket.value.onclose = (event) => {
        console.log('CLOSED PLAYER: ', event)
        //router.push({path: `/`})
      }
    }
  }

  function removePlayer(playerName: string) {
    const index = players.value.indexOf(playerName)
    if (index !== -1) {
      players.value.splice(index, 1)
    }
  }

  return {
    socket,
    joinNewSocket,
    messages,
    userName,
    roomId,
    players,
    playerVoutedOut,
    allReady,
    endMesagge,
    deadPlayers,
    role
  }
})
