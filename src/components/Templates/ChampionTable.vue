<template lang="pug">
  .champion-table-template
    tft-header
    tft-drawer
    champion-data-table
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import Header from "@/components/Organisms/Header.vue";
import Drawer from "@/components/Organisms/Drawer.vue";
import ChampionDataTable from "@/components/Organisms/ChampionDataTable.vue";
@Component({
  name: "champion-table-template",
  components: {
    "tft-header": Header,
    "tft-drawer": Drawer,
    "champion-data-table": ChampionDataTable
  }
})
export default class ChampionTableTemplate extends Vue {}
</script>
<style lang="stylus" scoped>
.champion-table-template
  margin auto
  height calc(100vh - 48px)
  display flex
  flex-wrap wrap
  align-items flex-start
  overflow-y auto
  overflow-x hidden
</style>
