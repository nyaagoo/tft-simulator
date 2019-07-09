<template lang="pug">
  .combine-table
    .conbine-table-description
      .first-row-item-check.mt-3.mx-0
        span.hold-item-title 所持アイテム
        .hold-item(v-for="item in basicItemList")
          img.main-img.pointer(:class="{grayscale: !isGrayFilterBasicItemColumn(item.id)}" :src="item.img")(@click="ToggleCheckedItemColumn(item.id)")
          span.sub-img-wrapper
            img.sub-img.pointer(v-if="HasSameItem(item.id)" :class="{grayscale: !isGrayFilterBasicItemRow(item.id)}" :src="item.img")(@click="ToggleCheckedItemRow(item.id)")
    .combine-table-container.ma-4
      .combine-table-row
        .first-row-item
          img.main-img.pointer(v-for="item in basicItemList")(:class="{grayscale: !isGrayFilterBasicItemColumn(item.id)}" :src="item.img" @click="ToggleCheckedItemColumn(item.id)")
        .row-item(v-for="(row, rowIndex) in buildItemEachBasicItem")
          img.main-img.pointer(:class="{grayscale: !isGrayFilterBasicItemColumn(row.basicItem.id)}" :src="row.basicItem.img" @click="ToggleCheckedItemColumn(row.basicItem.id)")
          .combine-table-column
            .column-item(v-for="(column, columnIndex) in row.buildItem" v-if="columnIndex <= rowIndex")
              img.main-img(:class="{grayscale: !canBuildItem(column.recipe)}" :src="column.img")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { item } from "@/store/index";
import {
  BuildItem,
  BasicItemName,
  BasicItem,
  BuildFromBasicItem
} from "@/models/item";

@Component({
  name: "combine-table",
  components: {}
})
export default class CombineTable extends Vue {
  basicItemList = item.basicItemList;
  buildItemList = item.buildItemList;
  checkedBasicItemIdRow: number[] = [];
  checkedBasicItemIdColumn: number[] = [];

  get buildItemEachBasicItem(): BuildFromBasicItem[] {
    return item.buildItemEachBasicItem;
  }

  buildItem(row: number, column: number): string {
    const item2 = item.buildItemList.find(
      x => JSON.stringify(x.recipe) === JSON.stringify([row, column])
    );
    return item2!.name;
  }

  ToggleCheckedItemRow(id: number) {
    const existList = this.checkedBasicItemIdRow.some(c => c === id);
    if (existList) {
      this.checkedBasicItemIdRow = this.checkedBasicItemIdRow.filter(
        x => x !== id
      );
    } else {
      this.checkedBasicItemIdRow.push(id);
    }
  }

  HasSameItem(id: number) {
    return this.checkedBasicItemIdColumn.some(c => c === id);
  }

  ToggleCheckedItemColumn(id: number) {
    const existList = this.checkedBasicItemIdColumn.some(c => c === id);
    if (existList) {
      this.checkedBasicItemIdColumn = this.checkedBasicItemIdColumn.filter(
        x => x !== id
      );
    } else {
      this.checkedBasicItemIdColumn.push(id);
    }
  }

  canBuildItem(recipe: number[]): boolean {
    if (recipe[0] === recipe[1])
      return (
        this.checkedBasicItemIdColumn.includes(recipe[0]) &&
        this.checkedBasicItemIdRow.includes(recipe[0])
      );
    else return recipe.every(x => this.checkedBasicItemIdColumn.includes(x));
  }
  isGrayFilterBasicItemRow(id: number): boolean {
    return this.checkedBasicItemIdRow.some(x => x === id);
  }
  isGrayFilterBasicItemColumn(id: number): boolean {
    return this.checkedBasicItemIdColumn.some(x => x === id);
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
