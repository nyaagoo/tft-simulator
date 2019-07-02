<template lang="pug">
  .item-combine-simulator
    span(style="font-size:30px; border-bottom:2px solid red") Item Builder
    combine-table
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import CombineTable from "@/components/Molecules/ItemCombineTable.vue";

@Component({
  name: "item-combine-simulator",
  components: {
    "combine-table": CombineTable
  }
})
export default class ItemCombineSimulator extends Vue {}
</script>
<style lang="stylus" scoped></style>
