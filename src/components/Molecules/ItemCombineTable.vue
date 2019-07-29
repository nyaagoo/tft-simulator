<template lang="pug">
  .combine-table
    .conbine-table-description
      item-pool
    .combine-table-container.ma-4
      .combine-table-row
        .first-row-item
          img.main-img.pointer(v-for="item in basicItemList")(:class="{grayscale: !isGrayFilterBasicItem(item.id)}" :src="item.img" @click="ToggleCheckedItemColumn(item)")
        .row-item(v-for="(row, rowIndex) in buildItemEachBasicItem")
          img.main-img.pointer(:class="{grayscale: !isGrayFilterBasicItem(row.basicItem.id)}" :src="row.basicItem.img" @click="ToggleCheckedItemColumn(row.basicItem)")
          .combine-table-column
            .column-item(v-for="(column, columnIndex) in row.buildItem" v-if="columnIndex <= rowIndex")
              img.main-img(:class="{grayscale: !canBuildItem(column.recipe)}" :src="column.img")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { item } from "@/store/index";
import { BuildItem, BasicItem, BuildFromBasicItem } from "@/models/item";
import ItemPool from "@/components/Organisms/ItemPool.vue";

@Component({
  name: "combine-table",
  components: {
    "item-pool": ItemPool
  }
})
export default class CombineTable extends Vue {
  basicItemList = item.basicItemList;
  buildItemList = item.buildItemList;

  get buildItemEachBasicItem(): BuildFromBasicItem[] {
    return item.buildItemEachBasicItem;
  }

  get itemPool(): BasicItem[] {
    return item.itemPool;
  }

  ToggleCheckedItemColumn(basicItem: BasicItem) {
    const existList = this.itemPool.some(c => c.id === basicItem.id);
    if (existList) item.removeItemPool(basicItem);
    else item.addItemPool(basicItem);
  }

  canBuildItem(recipe: string[]): boolean {
    if (recipe[0] === recipe[1])
      return this.itemPool.filter(x => x.id === recipe[0]).length >= 2;
    else return recipe.every(x => this.itemPool.some(y => y.id === x));
  }
  isGrayFilterBasicItem(id: string): boolean {
    return this.itemPool.some(x => x.id === id);
  }
}
</script>
<style lang="stylus" scoped>
.combine-table-container
  display flex
  justify-content center
  @media screen and (max-width: 600px)
    overflow-x auto
    justify-content flex-start
.first-row-item-check
  width 560px
  margin auto
  display grid
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  background #424242
  padding 10px
  border 1px solid #88ffff
  box-sizing border-box
  position relative
  border-radius 8px
.first-row-item
  padding 0 0 8px 56px
  display flex
  @media screen and (max-width: 600px)
    padding 0 0 8px 44px
.row-item
  display flex
  margin-bottom 8px
.combine-table-column
  display flex
.grayscale
  filter: grayscale(100%);
.column-item
  height 48px
  @media screen and (max-width: 600px)
    height 36px
.main-img
  height 48px
  width 48px
  margin-left 8px
  @media screen and (max-width: 600px)
    height 36px
    width 36px
.sub-img
  height 36px
  width 36px
  @media screen and (max-width: 600px)
    height 24px
    width 24px
.sub-img-wrapper
  height 36px
  width 36px
  display inline-block
  margin-left 8px
  @media screen and (max-width: 600px)
    height 24px
    margin-left 2px
.hold-item-title
  font-size 0.8rem
  position absolute
  top -10px
  left 12px
  background #424242
  border-top-right-radius 10px
  border-top-left-radius 10px
  width 100px
.conbine-table-description
  display flex
  justify-content center
  margin auto
</style>
