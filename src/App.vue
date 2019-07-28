<template lang="pug">
  #app
    v-app(dark)
      v-content
        router-view
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "app-main",
  components: {}
})
export default class TFTHeader extends Vue {
  created() {
    this.$vuetify.theme.dark = true;
  }
}
</script>

<style lang="stylus">

#app {
  font-family sans-serif, 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
}
</style>
