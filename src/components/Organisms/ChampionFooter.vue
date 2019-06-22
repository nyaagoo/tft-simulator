<template lang="pug">
  .champion-footer
    ul
      li (3) Additional ability power
      li (3) Additional ability power
      li (3) Additional ability power
      li (3) Additional ability power
      li (3) Additional ability power
      li (3) Additional ability power
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component({
  name: "champion-footer",
  components: {}
})
export default class ChampionFooter extends Vue {}
</script>
<style lang="stylus" scoped>
.champion-footer
  background red
  height 128px
  width 100vw
</style>
