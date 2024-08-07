<script setup lang="ts">
import roles from '@/assets/roles.json'
import { useCreateRoom } from '@/stores/createRoom'
import { useWebsocket } from '@/stores/websocket';
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios';

const router = useRouter()
const route = useRoute()
const createRoom = useCreateRoom()
const ws = useWebsocket()

const players = computed<any>(() => {
  if (ws) {
    return ws.messages
  } else {
    return "Nothing"
  }
})

async function startGame(): Promise<void> {
  if (createRoom.choosenRoles.length < 2) {
    alert('Please add more than 1 role')
    return
  } else {
    let roles = createRoom.choosenRoles.reduce((acc, role) => {
      for (let i = 0; i < role.count; i++) {
        acc.push(role.name)
      }
      return acc
    }, [])
    axios.post('http://localhost:8000/startGame', { roomId: route.params.id.toString(), roles: roles }).then(res => { console.log(res) }).catch(err => new Error(err))

    const id = route.params.id.toString()
    ws.roomId = id
    /*router.push({
      path: `/LobbyRoom/${id}`
    })*/
  }
}
</script>

<template>
  <main>
    <div class="borderRole">
      <div class="row">
        <h1 class="col">Room id: {{ route.params.id }}</h1>
      </div>
    </div>
    <hr />
    <div v-for="role in roles" v-bind:key="role.name">
      <div :class="[
          createRoom.choosenRoles.find((val) => val.name === role.name) === undefined
            ? 'borderRole'
            : 'choosenRole',
          createRoom.choosenRoles.find((val) => val.name === role.name)?.count === 0
            ? 'borderRole'
            : 'choosenRole'
        ]" class="card container m-y-15 border">
        <div class="row p-1 center">
          <div class="col-12">{{ role.name }}</div>
        </div>
        <div class="row p-1 center">
          <div class="col">
            <span class="counter m-3" @click="createRoom.addRolesToArray(role.name, true)">+</span>
            <span class="counter m-3">{{
          createRoom.choosenRoles.find((val) => val.name === role.name)?.count
            ? createRoom.choosenRoles.find((val) => val.name === role.name)?.count
            : 0
        }}</span>
            <span class="counter m-3" @click="createRoom.addRolesToArray(role.name, false)">-</span>
          </div>
        </div>
        <div class="row p-1 center">
          <div class="col-12">{{ role.description }}</div>
        </div>
      </div>
    </div>
    <div class="row center">
      <div class="column" v-if="createRoom.allRolesCounted >= 0">
        <button @click="startGame" type="button" class="btn btn-primary">Start game</button>
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
