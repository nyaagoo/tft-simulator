<template lang="pug">
  .combine-table.test-delete-plz
    p {{checkedBasicItemIdColumn}}
    p {{checkedBasicItemIdRow}}
    .combine-table-row
      .first-row-item
        img.ml-2(v-for="aa in basicItemList")(:class="{grayscale: !isGrayFilterBasicItemColumn(aa.id)}" :src="aa.img" height=48 width=48)(@click="ToggleCheckedItemColumn(aa.id)")
      .row-item.mb-2(v-for="(row, rowIndex) in buildItemEachBasicItem")
        img.mr-2.test-delete-plz(:class="{grayscale: !isGrayFilterBasicItemRow(row.basicItem.id)}" :src="row.basicItem.img" height=48 width=48)(@click="ToggleCheckedItemRow(row.basicItem.id)")
        .combine-table-column
          .column-item.ml-2(style="height: 48px" v-for="(column, columnIndex) in row.buildItem" v-if="columnIndex <= rowIndex")
            img(:class="{grayscale: !isGrayFilterBuildItem(column.recipe)}" :src="column.img" height=48 width=48)
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

  isGrayFilterBuildItem(recipe: number[]): boolean {
    return (
      this.checkedBasicItemIdColumn.some(x => x === recipe[0]) &&
      this.checkedBasicItemIdRow.some(x => x === recipe[1])
    );
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
.first-row-item
  padding 0 0 16px 72px
  display flex
.row-item
  display flex
.combine-table-column
  display flex
.grayscale
  filter: grayscale(100%);
</style>
