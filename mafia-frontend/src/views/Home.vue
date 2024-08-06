<script setup lang="ts">
import axios from 'axios';

import { useCreateRoom } from '@/stores/createRoom';
import { useRouter } from 'vue-router';

const createRoom = useCreateRoom();
const router = useRouter()

function callCreateRoom() {
  axios.get('http://localhost:8000/createRoom').then(res => {
    if (res.data.roomId !== undefined) {
      createRoom.room = res.data;
      router.push({
        path: `/CreateRoom/${res.data.roomId}`}
      )
    }
  }).catch(err => new Error(err))

}

</script>

<template>
  <main>
    <div class="container">
      <div class="row m-3 mb-3">
        <input type="text" class="form-control" placeholder="Enter your name" />
      </div>

      <div class="row m-3 mt-0">
        <button type="button" @click="callCreateRoom" class="btn btn-primary">Create room</button>
      </div>

      <div class="row m-3 mt-0">
        <router-link to="/JoinRoom">
          <button type="button" class="btn btn-primary">Join room</button>
        </router-link>
      </div>
    </div>
  </main>
</template>
<style>
button {
  width: inherit
}

input {
  text-align: center;
}
</style>