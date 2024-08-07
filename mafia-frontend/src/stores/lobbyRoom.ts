import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Players {
  id: number,
  name: string,
}

export const useLobbyRoom = defineStore('lobbyRoom', () => {
  const players = ref<Players[]>([])

  const ws = ref<any>(null)

  function checkSocket(event: any) {
    ws.value.onmessage = (event) => {
      try {
        // Parse incoming message and handle potential errors
        const message = JSON.parse(event.data);
        console.log(message); // Log the parsed message for debugging
  
        // Update application state based on the message content
        // (Replace this comment with your specific logic)
        // Example:
        // if (message.type === 'updateData') {
        //   // Update your Vuex store or component state
        // }
  
      } catch (parseError) {
        // Log the error and handle parsing failures (optional)
        console.error('Error parsing WebSocket message:', parseError);
  
        // You can optionally handle parsing failures here,
        // such as reconnecting to the WebSocket server or displaying an error message.
      }
    };
  }

  return { 
    players,
    checkSocket
  }
})
