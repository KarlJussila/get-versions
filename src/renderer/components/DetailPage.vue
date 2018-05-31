<template>
  <div id="root">

    <h2>{{ details.site }}</h2>
    <p>Craft Version: {{ details.version }}</p>

    <router-link to="/versions-page">Versions</router-link>

  </div>
</template>

<script>
const urls = {
  0: 'http://test.test/actions/getVersion/getVersion/getVersion'
}

export default {
  name: 'landing-page',
  data() {
    return {
      details: {
        site: 'Temp',
        version: '1.0'
      }
    }
  },
  created() {
    this.getVersion()
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    getVersion() {
      console.log(urls,this.$route.params.id)
      fetch(urls[this.$route.params.id])
        .then(function(response) {
          return response.json();
        })
        .then((myJson) => {
          this.details = myJson
        });
    }
  }
}

</script>
<style>

</style>
