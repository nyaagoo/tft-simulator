<template lang="pug">
  .item-build-sheet
    .basic-item-container.ma-2(v-for="item in buildItemEachBasicItem" :key="item.name")
      .basic-item
        img(heght=48 width=48 :src="item.basicItem.img")
        .item-description.ml-2.my-auto
          p.item-name.ma-0 {{ item.basicItem.name }}
          p.item-description.ma-0 {{item.basicItem.description}}
      v-divider
      li.item-container.pa-1.pl-2(v-for="item2 in item.buildItem" :key="item2.name")
        span.char.mr-2 +
        img(heght=36 width=36 :src="pickAnotherBasicItemSrc(item.basicItem.id, item2.recipe)")
        span.char.mx-2 = 
        img(heght=36 width=36 :src="item2.img")
        .item-description.ml-2.my-auto
          p.item-name.ma-0(v-if="false") {{ item2.name }}
          p.item-description.ma-0 {{ item2.description}}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import {
  BuildItem,
  BasicItemName,
  BasicItem,
  BuildFromBasicItem
} from "@/models/item";
import { item } from "@/store/index";

@Component({
  name: "item-build-sheet",
  components: {}
})
export default class ItemBuildSheet extends Vue {
  buildItemEachBasicItem: BuildFromBasicItem[] = [];

  created() {
    this.buildItemEachBasicItem = item.buildItemList.reduce<
      BuildFromBasicItem[]
    >((acc, current) => {
      current.recipe.forEach(recipeItemId => {
        const basicItem = acc.find(x => x.basicItem.id === recipeItemId);
        if (basicItem) {
          if (basicItem.buildItem.some(item => item.name === current.name))
            return;
          basicItem.buildItem.push(current);
        } else {
          const basicItem = item.basicItemList.find(
            basicItem => basicItem.id === recipeItemId
          );
          acc.push({ basicItem: basicItem!, buildItem: [current] });
        }
      });
      return acc;
    }, []);
    // eslint-disable-next-line no-console
    console.log(this.buildItemEachBasicItem);
  }

  pickAnotherBasicItemSrc(anBasicItemId: number, recipe: number[]): string {
    const anotherBasicItemId =
      recipe[1 - recipe.findIndex(id => id === anBasicItemId)];
    return item.basicItemList.find(item => item.id === anotherBasicItemId)!.img;
  }
}
</script>
<style lang="stylus" scoped>
.item-build-sheet
  display grid
  grid-template-columns repeat(auto-fill,minmax(360px, 1fr));
  max-width 1720px
  margin 0 auto

.basic-item-container
  border 1px solid #88ffff
  border-radius 4px
  text-align left
.basic-item
  display flex
  height 48px
.item-container
  display flex
  align-items center
  .char
    font-size 20px
.item-container:nth-child(2n)
  background #424242
.item-name
  font-size 12px
.item-description
  font-size 12px
</style>
