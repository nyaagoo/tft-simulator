<template lang="pug">
  .champion-table-page
    tft-header
    tft-drawer
    champion-data-table
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Organisms/Header.vue";
import Drawer from "@/components/Organisms/Drawer.vue";
import ChampionDataTable from "@/components/Organisms/ChampionDataTable.vue";

@Component({
  name: "champion-table-page",
  components: {
    "tft-header": Header,
    "tft-drawer": Drawer,
    "champion-data-table": ChampionDataTable
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
