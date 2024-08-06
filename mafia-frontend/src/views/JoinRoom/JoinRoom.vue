<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios';

const router = useRouter()
const route = useRoute()

const gamePin = ref<string>("")

function joinGame() {
  axios.post('http://localhost:8000/checkRoom', { "roomId": gamePin.value, "username": "1234" }).then(res => {
    console.log(res)
    router.push({
      path: `/JoinRoom/${res.data.roomId}`}
    )
  }).catch(err => new Error(err))

  router.push({
    path: `/LobbyRoom/${gamePin.value}`
  })
}
</script>

<template>
  <div class="container">
    <div class="row m-3 mb-3">
      <input type="text" v-model="gamePin" class="form-control" placeholder="Game PIN" />
    </div>

    <div class="row m-3 mt-0">
      <button type="button" @click="joinGame" class="btn btn-primary">Join Game</button>
    </div>
  </div>
</template>
<style>
button {
  width: inherit;
}

input {
  text-align: center;
}
</style>
