<script setup lang="ts">
import { usePlayRoom } from '@/stores/playRoom'

const playerRoom = usePlayRoom()
</script>
<template>
  <main>
    <div class="row card mg-y-15">Game ended</div>
    <div class="row card mg-y-15">
      <div class="row">
        <div class="col col-8">Alive players:</div>
        <div class="col" v-for="alive in playerRoom.players" v-bind:key="alive.name">
          {{ alive.name }}
        </div>
      </div>
    </div>
    <div class="row card mg-y-15">
      <div class="row">
        <div class="col col-8">Dead players:</div>
          <div class="col" v-for="dead in playerRoom.players" v-bind:key="dead.name">
            {{ dead.name }}
          </div>
      </div>
    </div>
    <div class="row card mg-y-15">
      <h1>Someone won!</h1>      
    </div>
  </main>
</template>
<style>
.mg-y-15 {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
