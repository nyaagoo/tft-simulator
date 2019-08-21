<template lang="pug">
  .item-page
    tft-header
    tft-drawer
    item-combine-simulator
    item-build-sheed
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Organisms/Header.vue";
import ItemBuildSheet from "@/components/Organisms/ItemBuildSheet.vue";
import ItemCombineSimulator from "@/components/Organisms/ItemCombineTable.vue";
import Drawer from "@/components/Organisms/Drawer.vue";

@Component({
  name: "item-page",
  components: {
    "tft-header": Header,
    "tft-drawer": Drawer,
    "item-build-sheed": ItemBuildSheet,
    "item-combine-simulator": ItemCombineSimulator
  }
})
export default class ItemPage extends Vue {}
</script>
<style lang="stylus" scoped>
.item-page
  margin 0 auto
  height calc(100vh - 48px)
  overflow-y auto
</style>
