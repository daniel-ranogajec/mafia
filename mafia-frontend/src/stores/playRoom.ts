import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebsocket } from './websocket'

export enum CurrentGameScreen {
  NIGHT,
  RESULTS,
  DAY,
  VOTING,
  END
}

export interface ChoosenPlayer {
  name: string,
  choosenPlayer?: string,
}

export const usePlayRoom = defineStore('playRoom', () => {
  const ws = useWebsocket()

  const players = ref<ChoosenPlayer[]>([])
  const choosenPlayer = ref<ChoosenPlayer | null>(null)

  const currentScreen = ref<CurrentGameScreen>(CurrentGameScreen.NIGHT)
  const screenBefore = ref<CurrentGameScreen>(CurrentGameScreen.RESULTS)

  const readyBool = ref<boolean>(false)

  function initialize() {
    players.value = []
    ws.players.map((val) => {
      players.value.push({ name: val })
    })
    checkTheCurrentGame(players.value)
  }

  function checkTheCurrentGame(players: ChoosenPlayer[]) {
    if(players.length === 1) {
      currentScreen.value = CurrentGameScreen.END
    }
  }

  function nextCycle() {
    checkTheCurrentGame(players.value)

    if(currentScreen.value !== CurrentGameScreen.END && players.value.length !== 1){
      if(currentScreen.value === CurrentGameScreen.NIGHT) {
        currentScreen.value = CurrentGameScreen.RESULTS
        screenBefore.value = CurrentGameScreen.NIGHT
      }
      else if(currentScreen.value === CurrentGameScreen.RESULTS) {
        readyBool.value = true;
        if(screenBefore.value === CurrentGameScreen.NIGHT) {
          currentScreen.value = CurrentGameScreen.DAY
          screenBefore.value = CurrentGameScreen.RESULTS
        } else if(screenBefore.value === CurrentGameScreen.VOTING) {
          currentScreen.value = CurrentGameScreen.NIGHT
          screenBefore.value = CurrentGameScreen.RESULTS
        }
      }
      else if(currentScreen.value === CurrentGameScreen.DAY) {
        readyBool.value = false;
        currentScreen.value = CurrentGameScreen.VOTING
        screenBefore.value = CurrentGameScreen.DAY
      }
      else if(currentScreen.value === CurrentGameScreen.VOTING) {
        currentScreen.value = CurrentGameScreen.RESULTS
        screenBefore.value = CurrentGameScreen.VOTING
      }
    }
  }

  return { 
    currentScreen,
    nextCycle,
    players,
    choosenPlayer,
    initialize,
    readyBool,
  }
})
