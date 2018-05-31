<template>

  <article class="message">
    <div class="message-header">
      <p>{{ title }}</p>
    </div>
    <div class="message-body">
      Craft {{ body }}
      <button @click="showInfo = true">Get Info</button>
      <button @click="showEdit = true">Edit</button>
      <button @click="removeSite">Remove</button>

      <site-info v-if="showInfo" @close="showInfo = false">
        <h1>{{ site.site }}</h1>
        <p>
        Craft Version {{ site.version }}
        </p>
      </site-info>

      <div v-if="showEdit" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <!-- Any other Bulma elements you want -->
          <div class="box">
            <input type="text" id="input" v-model="userInput">
            <button @click="updateURL">Update</button>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="showEdit = false"></button>
      </div>

    </div>
  </article>

</template>

<script>
  import SiteInfo from "./SiteInfo.vue"

  export default {
    name: 'site-item',
    props: ['title', 'body', 'site'],

    data() {

      return {
        showInfo: false,
        showEdit: false,
        userInput: this.site.url.url
      }

    },

    components: {
      SiteInfo
    },

    methods: {

      updateURL() {

        this.site.url.url = this.userInput
        this.$db.update({ _id: this.site.url._id }, this.site.url, {}, function(err, numReplaced) {})
        this.showEdit = false

      },

      removeSite() {

        this.$db.remove({ _id: this.site.url._id }, {}, (err, numRemoved) => {
          this.$emit('removeSite')
        })

      }

    }
  }

</script>
