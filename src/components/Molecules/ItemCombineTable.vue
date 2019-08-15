<template lang="pug">
  .combine-table
    .conbine-table-description
      item-pool
    .combine-table-container.ma-4
      .combine-table-row
        .first-row-item
          i.icon-item.pointer(v-for="item in basicItemList")(:class="[{grayscale: !isGrayFilterBasicItem(item.id)},`icon-${(item.id).toLowerCase()}`]" @click="ToggleCheckedItemColumn(item)")
        .row-item(v-for="(row, rowIndex) in buildItemEachBasicItem")
          i.icon-item.pointer(:class="[{grayscale: !isGrayFilterBasicItem(row.basicItem.id)}, `icon-${(row.basicItem.id).toLowerCase()}`]" @click="ToggleCheckedItemColumn(row.basicItem)")
          .combine-table-column
            .column-item(v-for="(column, columnIndex) in row.buildItem" v-if="columnIndex <= rowIndex")
              i.icon-item(:class="[{grayscale: !canBuildItem(column.recipe)},`icon-${(column.id).toLowerCase()}`]")
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
.icon-item
  height 48px
  width 48px
  margin-left 8px
  @media screen and (max-width: 600px)
    height 36px
    width 36px
.conbine-table-description
  display flex
  justify-content center
  margin auto
</style>
