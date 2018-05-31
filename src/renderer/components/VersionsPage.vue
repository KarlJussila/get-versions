<template>

  <div id="root" class="container">

    <input type="text" id="input" v-model="userInput">
    <button @click="addSite">Add Site</button>
    <button @click="getVersions">Get Versions</button>
    <button @click="removeSites">Remove Sites</button>

    <ul>
      <site-item v-for="(site,index) in sites" :title="site.site" :body="site.version" :site="site" @removeSite="refreshSites"></site-item>
    </ul>

    <error-display v-if="showError" @close="showError = false">{{ errorMessage }}</error-display>

  </div>
</template>

<script>

import SiteItem from "./SiteItem.vue"
import SiteInfo from "./SiteInfo.vue"
import ErrorDisplay from "./ErrorDisplay.vue"

//var urls = ['http://test.test/actions/getVersion/getVersion/getVersion']

export default {
  name: 'landing-page',
  data() {
    return {
      sites: [],
      urls: [],
      userInput: 'URL',
      showInfo: false,
      showError: false,
      errorMessage: 'Error'
    }
  },
  created() {
    this.getSites()
  },
  components: {
    SiteItem,
    SiteInfo,
    ErrorDisplay
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    getSites() {
      this.$db.find({ id: 'site' }, (err, docs) => {
        this.urls = docs
      })
    },
    addSite(event,url) {
      if(!url) {
        url = this.userInput
      }

      //Validating the URL
      let validUrl = true
      if(/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
        fetch(url)
          .then(function(response) {
            return response.json();
          })
          .then((myJson) => {

          }).catch(function(error) {
            validUrl = false
          });
      }
      else {
        validUrl = false
        this.errorMessage = 'Invalid URL'
        this.showError = true
      }

      //Adding the site
      if(validUrl) {
        this.$db.insert({url: url, id: 'site'}, (err, newDocs) => {
          this.getSites()
        })
      }
      else {

      }
    },
    removeSites() {
      this.$db.remove({ id: 'site' }, { multi: true }, (err, numRemoved) => {
        this.refreshSites()
      })
    },
    getVersions() {
      this.sites = []
      for(var i = 0; i < this.urls.length; i++) {
        let url = this.urls[i]
        let x = i
        fetch(url.url)
          .then(function(response) {
            return response.json();
          })
          .then((myJson) => {
            myJson.url = url
            this.sites.push(myJson)
          });
      }
    },
    displaySiteInfo() {

      this.showInfo = true

    },
    refreshSites() {

      this.getSites()

    }
  },
  watch: {

    urls: function() {
      this.getVersions()
    }

  }
}

</script>
<style>

</style>
