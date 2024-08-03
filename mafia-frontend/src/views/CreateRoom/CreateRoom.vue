<script setup lang="ts">
import roles from '@/assets/roles.json'
import { useCreateRoom } from '@/stores/createRoom'

const createRoom = useCreateRoom()

async function startGame(): Promise<void> {
  if(createRoom.choosenRoles.length < 3) {
    alert("Please add more than 2 roles")
    return;
  }
  console.log("Started the game")
}
</script>

<template>
  <main>
    <div v-for="role in roles" v-bind:key="role.id">
      <div
        :class="[createRoom.choosenRoles.includes(role.id) ? 'choosenRole' : 'borderRole']"
        @click="createRoom.addRolesToArray(role.id)"
        class="card container m-y-15 border"
      >
        <div class="row p-1 center">
          <div class="col-12">{{ role.name }}</div>
        </div>
        <div class="row p-1 center">
          <div class="col-12">{{ role.description }}</div>
        </div>
      </div>
    </div>
    <div class="row center">
      <div class="column"><button @click="startGame" type="button" class="btn btn-primary">Start game</button></div>
    </div>
  </main>
</template>
<style>
.center {
  text-align: center;
}

.choosenRole {
  border: 1px solid red !important;
  background-color: #fef4f4;
}

.borderRole {
  border: 1px solid grey !important;
}

.m-y-15 {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
