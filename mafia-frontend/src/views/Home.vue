<script setup lang="ts">
import axios from 'axios';

import {useCreateRoom} from '@/stores/createRoom';
import {useRouter} from 'vue-router';
import {useWebsocket} from '@/stores/websocket';

const createRoom = useCreateRoom();
const router = useRouter()
const ws = useWebsocket()

function callCreateRoom() {
  axios.get(`${import.meta.env.VITE_API_BASE_URL}/createRoom`).then(res => {
    if (res.data.roomId !== undefined) {
      createRoom.room = res.data;
      router.push({
            path: `/CreateRoom/${res.data.roomId}`
          }
      )
    }
  }).catch(err => new Error(err))

}

function joinRoom() {
  router.push({path: `/JoinRoom`})
}
</script>

<template>
  <main class="main">
    <h1 class="title mt-5">MAFIA</h1>
    <div class="container">
      <div class="row m-3 mb-3">
        <input type="text" v-model="ws.userName" class="form-control" placeholder="Enter your name"/>
      </div>

      <div class="row m-3 mt-0">
        <button type="button" @click="callCreateRoom" class="btn btn-danger btn-block">Create room</button>
      </div>

      <div class="row m-3 mt-0">
        <button type="button" @click="joinRoom" class="btn btn-danger btn-block">Join room</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-size: 4rem;
  margin: 2rem;
  color: whitesmoke;
}

button {
  width: 100%;
}

input {
  text-align: center;
  width: 100%;
}
</style>