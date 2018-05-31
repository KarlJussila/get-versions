<template>

  <div>
    <list-item v-for="item in list">{{ item.site }}</list-item>
  </div>

</template>

<script>
  export default {
    name: 'site-list',

    data() {
      return {

        list: [

          {site: 'Test', version: 1.0},
          {site: 'Test2', version: 1.0}

        ]

      }
    }
  }
</script>
