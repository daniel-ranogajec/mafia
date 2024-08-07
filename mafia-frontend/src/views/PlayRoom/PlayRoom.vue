<script setup lang="ts">

import Swal from 'sweetalert2'

const role = localStorage.getItem("role")
fireAlert()
function fireAlert() {
    Swal.fire({
        title: "Psssst... Your role is:",
        text: role,
        confirmButtonText: 'Cool'
    })
}
</script>

<template>
    <main>
        <div class="container">
            <i class="fa fa-info-circle" @click="fireAlert"></i>
        </div>
    </main>
</template>