<template lang="pug">
  .item-page
    tft-header
    tft-drawer
    item-combine-simulator
    item-build-sheed
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "item-page",
  components: {
    "tft-header": () => import("@/components/Organisms/Header.vue"),
    "tft-drawer": () => import("@/components/Organisms/Drawer.vue"),
    "item-build-sheed": () =>
      import("@/components/Organisms/ItemBuildSheet.vue"),
    "item-combine-simulator": () =>
      import("@/components/Organisms/ItemCombineTable.vue")
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
