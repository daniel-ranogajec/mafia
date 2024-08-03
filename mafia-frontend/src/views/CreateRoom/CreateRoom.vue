<script setup lang="ts">
import roles from '@/assets/roles.json'
import { useCreateRoom } from '@/stores/createRoom'
import { ref } from 'vue'
import { useLobbyRoom } from '@/stores/lobbyRoom'

const lobbyRoom = useLobbyRoom()

const createRoom = useCreateRoom()

const canGoNext = ref<boolean>(false)

async function startGame(): Promise<void> {
  if (createRoom.choosenRoles.length < 3) {
    alert('Please add more than 2 roles')
    canGoNext.value = false
    return
  } else {
    canGoNext.value = true
  }
}
</script>

<template>
  <main>
    <div class="borderRole">
      Players joined: {{ lobbyRoom.players.length }}
    </div>
    <div v-for="role in roles" v-bind:key="role.id">
      <div
        :class="[createRoom.choosenRoles.find(val => val.id === role.id) === undefined ? 'borderRole' : 'choosenRole',
          createRoom.choosenRoles.find(val => val.id === role.id)?.count === 0 ? 'borderRole' : 'choosenRole'
        ]"
        class="card container m-y-15 border"
      >
        <div class="row p-1 center">
          <div class="col-12">{{ role.name }}</div>
        </div>
        <div class="row p-1 center">
          <div class="col">
            <span class="counter m-3" @click="createRoom.addRolesToArray(role.id, true)">+</span>
            <span class="counter m-3">{{ createRoom.choosenRoles.find(val => val.id === role.id)?.count ? createRoom.choosenRoles.find(val => val.id === role.id)?.count : 0  }}</span>
            <span class="counter m-3" @click="createRoom.addRolesToArray(role.id, false)">-</span></div>
        </div>
        <div class="row p-1 center">
          <div class="col-12">{{ role.description }}</div>
        </div>
      </div>
    </div>
    <div class="row center">
      <div class="column" v-if="createRoom.allRolesCounted >= 3">
        <router-link to="/LobbyRoom"
          ><button @click="startGame" type="button" class="btn btn-primary">
            Start game
          </button></router-link
        >
      </div>
    </div>
  </main>
</template>
<style>
.center {
  text-align: center;
}

.counter {
  border: 2px solid rgb(0, 0, 0);
  border-radius: 10%;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 20px;
  width: 20px;
}

.choosenRole {
  border: 1px solid red !important;
  background-color: #fef4f4 !important;
}

.borderRole {
  border: 1px solid grey !important;
  background-color: white !important;
}

.m-y-15 {
  margin-top: 15px;
  margin-bottom: 15px;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
