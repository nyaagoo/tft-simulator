<template lang="pug">
  .item-template
    tft-header
    tft-drawer
    item-combine-simulator
    item-build-sheed
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import Header from "@/components/Organisms/Header.vue";
import ItemBuildSheet from "@/components/Organisms/ItemBuildSheet.vue";
import ItemCombineSimulator from "@/components/Organisms/ItemCombineTable.vue";
import Drawer from "@/components/Organisms/Drawer.vue";

@Component({
  name: "item-template",
  components: {
    "tft-header": Header,
    "tft-drawer": Drawer,
    "item-build-sheed": ItemBuildSheet,
    "item-combine-simulator": ItemCombineSimulator
  }
})
export default class ItemTemplate extends Vue {}
</script>
<style lang="stylus" scoped>
.item-template
  margin auto
  height calc(100vh - 48px)
  display flex
  flex-wrap wrap
  align-items flex-start
  overflow-y auto
  overflow-x hidden
</style>
