<template lang="pug">
  .item-pool-container
    .basic-item-list.mt-3.mx-0
      img.item-img.pointer(:src="item.img")(v-for="item in basicItemList" @click="addItemPool(item)")
    .item-pool
      img.item-img.pointer(:src="item.img")(v-for="item in itemPool" @click="removeItemPool(item)")
      // span.hold-item-title 所持アイテム
      // .hold-item(v-for="item in basicItemList")
      //   img.main-img.pointer(:class="{grayscale: !isGrayFilterBasicItemColumn(item.id)}" :src="item.img")(@click="ToggleCheckedItemColumn(item.id)")
      //  span.sub-img-wrapper
      //    img.sub-img.pointer(v-if="HasSameItem(item.id)" :class="{grayscale: !isGrayFilterBasicItemRow(item.id)}" :src="item.img")(@click="ToggleCheckedItemRow(item.id)")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { item } from "@/store/index";
import { BuildItem, BasicItem } from "@/models/item";

@Component({
  name: "item-pool",
  components: {}
})
export default class ItemPool extends Vue {
  basicItemList = item.basicItemList;

  get itemPool(): BasicItem[] {
    return item.itemPool;
  }

  addItemPool(basicItem: BasicItem) {
    item.addItemPool(basicItem);
  }

  removeItemPool(basicItem: BasicItem) {
    item.removeItemPool(basicItem);
  }
}
</script>
<style lang="stylus" scoped>
.item-pool-container
  background red
.basic-item-list
  display flex
.item-img + .item-img
  margin-left  8px
</style>
