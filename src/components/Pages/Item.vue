<template lang="pug">
  .item-page
    h3 Item Build
    .item-build-container
      .basic-item-container.ma-2.pa-2(v-for="item in buildItemEachBasicItem" :key="item.name")
        span {{ item.basicItem }}
        .item-container.ma-2.ml-4(v-for="item2 in item.buildItem" :key="item2.name")
          img(:src="item2.img")
          span.pa-1 {{ item2.name }}

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BuildItem, BasicItem, buildItem } from "@/models/item";
import router from "@/router";

@Component({
  name: "item",
  components: {}
})
export default class ItemPage extends Vue {
  buildItem: BuildItem[] = buildItem;
  buildItemEachBasicItem: {
    basicItem: BasicItem;
    buildItem: BuildItem[];
  }[] = [];

  created() {
    this.buildItemEachBasicItem = this.buildItem.reduce<
      { basicItem: BasicItem; buildItem: BuildItem[] }[]
    >((acc, current) => {
      current.recipe.forEach(recipeItem => {
        const basicItem = acc.find(x => x.basicItem === recipeItem);
        if (basicItem) {
          if (basicItem.buildItem.some(item => item.name === current.name))
            return;
          basicItem.buildItem.push(current);
        } else acc.push({ basicItem: recipeItem, buildItem: [current] });
      });
      return acc;
    }, []);
    // eslint-disable-next-line no-console
    console.log(this.buildItemEachBasicItem);
  }
}
</script>
<style lang="stylus" scoped>
.item-build-container
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
