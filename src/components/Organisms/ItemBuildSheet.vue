<template lang="pug">
  .item-build-sheet
    .basic-item-container.ma-2.pa-2(v-for="item in buildItemEachBasicItem" :key="item.name")
      img(heght=48 width=48 :src="item.basicItem.img")
      span {{ item.basicItem.name }}
      .item-container.ma-2.ml-4(v-for="item2 in item.buildItem" :key="item2.name")
        img(heght=48 width=48 :src="item2.img")
        span.pa-1 {{ item2.name }}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { BuildItem, BasicItemName, BasicItem, BuildFromBasicItem } from "@/models/item";
import { item } from "@/store/index"

@Component({
  name: "item-build-sheet",
  components: {}
})
export default class ItemBuildSheet extends Vue {
  buildItemEachBasicItem: BuildFromBasicItem[] = [];

  created() {
    this.buildItemEachBasicItem = item.buildItemList.reduce<BuildFromBasicItem[]>((acc, current) => {
      current.recipe.forEach(recipeItemId => {
        const basicItem = acc.find(x => x.basicItem.id === recipeItemId);
        if (basicItem) {
          if (basicItem.buildItem.some(item => item.name === current.name))
            return;
          basicItem.buildItem.push(current);
        } else {
          const basicItem =  item.basicItemList.find(basicItem => basicItem.id === recipeItemId);
          acc.push({ basicItem: basicItem!, buildItem: [current] });
        }
      });
      return acc;
    }, []);
    // eslint-disable-next-line no-console
    console.log(this.buildItemEachBasicItem);
  }
}
</script>
<style lang="stylus" scoped>
.item-build-sheet
  display flex
  flex-wrap wrap
.basic-item-container
  width 300px
  border 1px solid #88ffff
  border-radius 4px
  text-align left
.item-container
  display flex
  align-items center
</style>
