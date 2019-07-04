<template lang="pug">
  .combine-table.test-delete-plz
    .conbine-table-description
      .first-row-item-check
        span.hold-item-title 所持アイテム
        .hold-item(style="width:150px" v-for="aa in basicItemList")
          img.pointer.ml-2(:class="{grayscale: !isGrayFilterBasicItemColumn(aa.id)}" :src="aa.img" height=48 width=48)(@click="ToggleCheckedItemColumn(aa.id)")
          img.pointer.ml-2(v-if="HasSameItem(aa.id)" :class="{grayscale: !isGrayFilterBasicItemRow(aa.id)}" :src="aa.img" height=36 width=36)(@click="ToggleCheckedItemRow(aa.id)")
          span.fdjasiuo(v-else style="height:36px; width:36px")
    .combine-table-container.ma-4
      .combine-table-row
        .first-row-item
          img.ml-2(v-for="aa in basicItemList")(:class="{grayscale: !isGrayFilterBasicItemColumn(aa.id)}" :src="aa.img" height=48 width=48)
        .row-item.mb-2(v-for="(row, rowIndex) in buildItemEachBasicItem")
          img.mr-2.test-delete-plz(:class="{grayscale: !isGrayFilterBasicItemColumn(row.basicItem.id)}" :src="row.basicItem.img" height=48 width=48)
          .combine-table-column
            .column-item.ml-2(style="height: 48px" v-for="(column, columnIndex) in row.buildItem" v-if="columnIndex <= rowIndex")
              img(:class="{grayscale: !canBuildItem(column.recipe)}" :src="column.img" height=48 width=48)
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
.first-row-item-check
  width 640px
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
  padding 0 0 16px 56px
  display flex
.row-item
  display flex
.combine-table-column
  display flex
.grayscale
  filter: grayscale(100%);
.fdjasiuo
  height 36px
  width 36px
  display inline-block
  margin-left 8px
.hold-item-title
  font-size 0.8rem
  position absolute
  top -12px
  left 12px
  background #424242
  border-top-right-radius 10px
  border-top-left-radius 10px
  width 100px
.conbine-table-description
  width 640px
  margin auto
</style>
