<script setup lang="ts">
import Swal from 'sweetalert2'
import roles from '../../assets/roles.json'

interface Props {
  title: {
    type: String
    Default: 'Nothing provided for the role'
  }
  text: {
    type: String
    Default: 'No text provided for the role'
  }
  buttonText: {
    type: String
    default: 'Ok'
  },
  closeButton : {
    type: String,
    default: 'Close'
  }
}

const props = defineProps<Props>()

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
    <button class="btn btn-danger" @click="fireAlert">{{  props.buttonText }}</button>
  </main>
</template>
<style></style>
