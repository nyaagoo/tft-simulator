<template lang="pug">
  .item-build-sheet
    .basic-item-container.ma-2(v-for="item in buildItemEachBasicItem" :key="item.name")
      .basic-item
        i.icon-item(:class="`icon-${(item.basicItem.id).toLowerCase()}`")
        .item-description.ml-2.my-auto
          p.item-name.ma-0 {{ item.basicItem.name }}
          p.item-description.ma-0 {{item.basicItem.description}}
      v-divider
      li.item-container.pa-1.pl-2(v-for="item2 in item.buildItem" :key="item2.name")
        span.char.mr-2 +
        i.icon-item.icon-item-mini(:class="`icon-${pickAnotherBasicItemSrc(item.basicItem.id, item2.recipe, item2).toLowerCase()}`")
        span.char.mx-2 = 
        i.icon-item.icon-item-mini( :class="`icon-${(item2.id).toLowerCase()}`")
        .item-description.ml-2.my-auto
          p.item-name.ma-0(v-if="false") {{ item2.name }}
          p.item-description.ma-0 {{ item2.description}}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import {
  BuildItem,
  BasicItem,
  BuildFromBasicItem,
  BasicItemIdList
} from "@/models/item";
import { item } from "@/store/index";

@Component({
  name: "item-build-sheet",
  components: {}
})
export default class ItemBuildSheet extends Vue {
  created() {
    item.separateBuildItem();
  }

  get buildItemEachBasicItem(): BuildFromBasicItem[] {
    return item.buildItemEachBasicItem;
  }

  pickAnotherBasicItemSrc(
    anBasicItemId: string,
    recipe: string[],
    item2: any
  ): string {
    const i = recipe.findIndex(x => x !== anBasicItemId);
    const anotherBasicId = [...recipe].splice(i, 1)[0];
    return item.basicItemList[anotherBasicId as BasicItemIdList].id;
  }
}
</script>
<style lang="stylus" scoped>
.item-build-sheet
  width 100%
  display grid
  grid-template-columns repeat(auto-fill, minmax(360px, 1fr))
  max-width 1720px
  margin 0 auto
.basic-item-container
  border 1px solid #88ffff
  border-radius 4px
  text-align left
  display flex
  flex-direction column
  justify-content space-between
.basic-item
  display flex
  height 48px
.icon-item
  height 48px
  width 48px
.icon-item-mini
  height 36px
  width 36px
  flex 0 0 36px
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
