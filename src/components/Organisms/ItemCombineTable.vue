<template lang="pug">
  .item-combine-simulator.card-container
    .card-container-title
      h3 アイテムビルダー
    combine-table
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component({
  name: "item-combine-simulator",
  components: {
    "combine-table": () => import("@/components/Molecules/ItemCombineTable.vue")
  }
})
export default class ItemCombineSimulator extends Vue {}
</script>
<style lang="stylus" scoped></style>
