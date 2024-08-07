import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Role {
  name: string,
  count: number
}

export const useCreateRoom = defineStore('createRoom', () => {
  const room = ref<object>({})

  const choosenRoles = ref<Role[]>([])

  const allRolesCounted = ref<number>(0)

  function addRolesToArray(name: string, add: boolean): void {
    if (choosenRoles.value !== undefined) {
      const foundRole = choosenRoles.value.find(val => val.name === name);
      if (foundRole) {
        if(add === true) {
          foundRole.count++;
          allRolesCounted.value++
        } else {
          if(foundRole.count === 0) {
            foundRole.count = 0;
            allRolesCounted.value = 0;
          } else {
            foundRole.count -= 1;
            allRolesCounted.value--
          }
        }
      } else {
        choosenRoles.value.push({ name, count: add ? 1 : 0 });
      } 
    }
  }

  return { 
    choosenRoles,
    allRolesCounted,
    room,
    addRolesToArray
  }
})
