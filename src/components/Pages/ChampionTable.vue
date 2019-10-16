<template lang="pug">
  .champion-table-page
    tft-header
    tft-drawer
    champion-data-table
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "champion-table-page",
  components: {
    "tft-header": () => import("@/components/Organisms/Header.vue"),
    "tft-drawer": () => import("@/components/Organisms/Drawer.vue"),
    "champion-data-table": () =>
      import("@/components/Organisms/ChampionDataTable.vue")
  }
})
export default class ChampionTablePage extends Vue {}
</script>
<style lang="stylus" scoped>
.champion-table-page
  margin 0 auto
  height calc(100vh - 48px)
  overflow-y auto
</style>
