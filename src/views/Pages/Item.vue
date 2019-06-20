<template lang="pug">
  .item
    p itemContainer
    .aa(v-for="item in itemBuilt" :key="item.name")
      .item-container {{item.name}}

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { itemBuilt, ItemBasic } from "@/models/item";

@Component({
  name: "item",
  components: {}
})
export default class Item extends Vue {
  itemBuilt: {
    name: string;
    description: string;
    recipe: ItemBasic[];
    img: string;
  }[] = itemBuilt;
}
</script>
<style lang="stylus" scoped></style>
