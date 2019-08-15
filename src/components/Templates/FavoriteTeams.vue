<template lang="pug">
  .favorite-teams-template
    tft-header
    tft-drawer
    p hello favorite teams
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Organisms/Header.vue";
import Drawer from "@/components/Organisms/Drawer.vue";

@Component({
  name: "favorite-teams-template",
  components: {
    "tft-header": Header,
    "tft-drawer": Drawer
  }
})
export default class FavoriteTeamsTemplate extends Vue {}
</script>
<style lang="stylus" scoped></style>
