<template lang="pug">
  .item-pool-container
    .basic-item-list.pa-3
      img.item-img.pointer(v-for="item in basicItemList" :src="item.img" @click="addItemPool(item)")
    .item-pool.pa-3
      span.item-pool-title アイテムプール
      img.item-img.pointer(v-for="item in itemPool" :src="item.img" @click="removeItemPool(item)")
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
  width 496px
  padding 8px
  overflow-x auto
  @media screen and (max-width: 600px)
    width 400px
.basic-item-list
  display flex
.item-pool
  display flex
  flex-wrap wrap
  border 1px solid #88f
  border-radius 8px
  position relative
  width 474px
  @media screen and (max-width: 600px)
    width 378px
.item-img
  height 48px
  width 48px
  margin 4px
  @media screen and (max-width: 600px)
    height 36px
    width 36px
.item-pool-title
  font-size 0.8rem
  position absolute
  top -10px
  left 12px
  background #424242
  width 100px
</style>
