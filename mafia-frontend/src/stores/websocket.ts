import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useWebsocket = defineStore('websocket', () => {
  const router = useRouter()
  const messages = ref<string>('')

  const uname = localStorage.getItem("username")
  const userName = ref<string>( uname ? uname : "")
  const roomId = ref<string>('')

  const players = ref<string[]>([])

  const socket = ref<WebSocket | null>(null)

  function joinNewSocket() {
    if (!socket.value) {
      if (userName.value == "") {
        return
      }
      localStorage.setItem("username", userName.value)
      socket.value = new WebSocket(
        `${import.meta.env.VITE_API_BASE_URL}?username=${userName.value}&room_id=${roomId.value}`
      )

      socket.value.onopen = () => {
        console.log('WebSocket connection established')
      }

      socket.value.onerror = (error) => {
        console.error('WebSocket encountered an error:', error)
      }

      socket.value.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          if (message.status === 'user_connected' || message.status === 'connected') {
            if (message.players !== undefined) {
              players.value = message.players
            } else {
              players.value.push(message.user)
            }
          } else if (message.status === 'user_disconnected' ){
            removePlayer(message.user);
          } else if (message.status === 'role') {
            localStorage.setItem("role", message.role)
          }
          if(message.status === "role") {
            router.push({path: `/PlayRoom/${roomId.value}`})
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
    const index = players.value.indexOf(playerName);
    if (index !== -1) {
      players.value.splice(index, 1);
    }
  }

  return {
    socket,
    joinNewSocket,
    messages,
    userName,
    roomId,
    players
  }
})
