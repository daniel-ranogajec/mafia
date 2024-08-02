<script setup lang="ts">
import roles from "../../assets/roles.json"

</script>
<template>
    <main>
        <div><h1>Roles</h1></div>
        <div v-for="role in roles">
            {{ role }}
        </div>
    </main>
</template>
<style>
</style>