import { ref } from 'vue'
import { defineStore } from 'pinia'

export enum CurrentGameScreen {
  NIGHT,
  RESULTS,
  DAY,
  VOTING
}

export const usePlayRoom = defineStore('playRoom', () => {
  const currentScreen = ref<CurrentGameScreen>(CurrentGameScreen.NIGHT)

  function nextCycle() {
    if(currentScreen.value === CurrentGameScreen.NIGHT){
      currentScreen.value = CurrentGameScreen.RESULTS
    }
    else if(currentScreen.value === CurrentGameScreen.RESULTS){
      currentScreen.value = CurrentGameScreen.DAY
    }
    else if(currentScreen.value === CurrentGameScreen.DAY){
      currentScreen.value = CurrentGameScreen.VOTING
    }
    else if(currentScreen.value === CurrentGameScreen.VOTING){
      currentScreen.value = CurrentGameScreen.NIGHT
    }
  }

  return { 
    currentScreen,
    nextCycle
  }
})
