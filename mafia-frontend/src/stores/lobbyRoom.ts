import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Players {
  id: number,
  name: string,
}

export const useLobbyRoom = defineStore('lobbyRoom', () => {
  const players = ref<Players[]>([])

  players.value = ([
    {
      id: 1,
      name: "Antonio"
    },
    {
      id: 2,
      name: "Lara"
    },
    {
      id: 3,
      name: "Dac"
    },
  ])

  return { 
    players,
  }
})
