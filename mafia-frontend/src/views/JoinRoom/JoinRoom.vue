<script setup lang="ts">
</script>

<template>
    <div class="container">
        <div class="row m-3 mb-3">
            <input type="text" class="form-control" placeholder="Game PIN" />
        </div>

        <div class="row m-3 mt-0">
            <router-link to="/CreateRoom">
                <button type="button" class="btn btn-primary">Join Game</button>
            </router-link>
        </div>
    </div>
</template>
<style>
button {
    width: inherit
}

input {
    text-align: center;
}
</style>