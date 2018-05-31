<template>

  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <!-- Any other Bulma elements you want -->
      <div class="box">
        <slot></slot>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
  </div>

</template>

<script>

  export default {
    name: 'site-info',
    props: {
      siteData: { required: true }
    }
  }

</script>
