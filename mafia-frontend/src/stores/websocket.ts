import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWebsocket = defineStore('websocket', () => {
  const messages = ref<string>('')

  const userName = ref<string>('')
  const roomId = ref<string>('')

  const players = ref<string[]>([])

  const socket = ref<WebSocket | null>(null)

  function joinNewSocket() {
    if (!socket.value) {
      socket.value = new WebSocket(
        `ws://localhost:8000?username=${userName.value}&room_id=${roomId.value}`
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
          } else {
            removePlayer(message.user);
          }
        } catch (parseError) {
          console.error('Error parsing WebSocket message:', parseError)
        }
      }

      socket.value.onclose = (event) => {
        console.log('CLOSED PLAYER: ', event)
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