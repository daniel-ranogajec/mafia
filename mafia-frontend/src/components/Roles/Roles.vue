<script setup lang="ts">
import Swal from 'sweetalert2'

const props = withDefaults(defineProps<{
  title: string,
  text: string,
  buttonText: string,
  closeButton: string
}>(), {
  title: 'Nothing provided for the role',
  text: 'No text provided for the role',
  buttonText: 'Ok',
  closeButton: 'Close'
})

function fireAlert() {
  Swal.fire({
    title: props.title,
    text: props.text,
    confirmButtonText: props.closeButton
  })
}
</script>

<template>
  <main>
    <button class="btn btn-danger" @click="fireAlert">{{ props.buttonText }}</button>
  </main>
</template>
<style></style>
