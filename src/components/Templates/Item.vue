<template lang="pug">
  .item-template
    tft-header
    item-build-sheed
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import TFTHeader from "@/components/Organisms/Header.vue";
import ItemBuildSheet from "@/components/Organisms/ItemBuildSheet.vue";

@Component({
  name: "item-template",
  components: {
    "tft-header": TFTHeader,
    "item-build-sheed": ItemBuildSheet
  }
})
export default class ItemTemplate extends Vue {}
</script>
<style lang="stylus" scoped>
.item-template
  margin auto
  height calc(100vh - 64px)
  width 100vw
  overflow-y auto
</style>
