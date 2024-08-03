import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Roles {
  id: number,
  name: string,
  description: string
}

export const useCreateRoom = defineStore('createRoom', () => {
  const choosenRoles = ref<number[]>([])

  function addRolesToArray(id: number): void {
    const index = choosenRoles.value.indexOf(id);
    if (index !== -1) {
      choosenRoles.value.splice(index, 1); // Remove the element
    } else {
      choosenRoles.value.push(id);
    }
  }

  return { 
    choosenRoles,
    addRolesToArray
  }
})
