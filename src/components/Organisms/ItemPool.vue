<template lang="pug">
  .item-pool-container
    .basic-item-list.pa-3
      i.icon-item.pointer.overlay.add(v-for="item in basicItemList" :class="`icon-${(item.id).toLowerCase()}`" @click="addItemPool(item)")
    .item-pool.pa-3
      span.item-pool-title アイテムプール
      i.icon-item.pointer.overlay(v-for="item in itemPool" :class="`icon-${(item.id).toLowerCase()}`" @click="removeItemPool(item)")
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
  width 474px
  @media screen and (max-width: 600px)
    width 378px
.item-pool
  display flex
  flex-wrap wrap
  min-height 82px
  border 1px solid #88f
  border-radius 8px
  position relative
  width 474px
  @media screen and (max-width: 600px)
    width 378px
.icon-item
  height 48px
  width 48px
  margin 4px
  @media screen and (max-width: 600px)
    height 36px
    width 36px
.item-pool-title
  font-size .8rem
  position absolute
  top -10px
  left 12px
  background #424242
  width 100px
.icon-item
  position relative
.overlay:hover
  cursor pointer
  filter grayscale(0%)
.overlay::after
  content url('/img/icon/remove_circle.png')
  position absolute
  top 6px
  left 6px
  opacity 0
  transition opacity .25s ease
  filter invert(100%)
  @media screen and (max-width: 600px)
    top 0
    left 0
.overlay.add::after
  content url('/img/icon/add_circle.png')
  filter invert(100%)
.overlay:hover::after
  opacity .8
</style>
