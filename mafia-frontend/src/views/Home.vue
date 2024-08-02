<script setup lang="ts">

</script>

<template>
  <main>
    <div class="container">
      <div class="row m-3 mb-3">
        <input type="text" class="form-control" placeholder="Enter your name" />
      </div>

      <div class="row m-3 mt-0">
        <router-link to="/CreateRoom">
          <button type="button" class="btn btn-primary">Create room</button>
        </router-link>
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