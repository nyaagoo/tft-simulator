<template lang="pug">
  .item-ItemPage
    item-template
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import ItemTemplate from "@/components/Templates/Item.vue";

@Component({
  name: "item",
  components: {
    "item-template": ItemTemplate
  }
})
export default class ItemPage extends Vue {}
</script>
<style lang="stylus" scoped></style>
