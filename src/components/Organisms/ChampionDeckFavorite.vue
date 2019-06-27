<template lang="pug">
  .deck-favorite
    h1 Favorite
    .origin-chips
      v-chip(v-for="(item, index) in championOrigin" :key="`favOrigin${index}`")(:outline="!isOriginSelected(item.name)" color="#00B8D4")(@click="toggleSelectOrigin(item.name)")
        img.mr-1(:src="item.img" heigth=16 width=16)
        span {{ item.name }}
    .class-chips
      v-chip(v-for="(item, index) in championClass" :key="`favClass${index}`")(:outline="!isClassSelected(item.name)" color="info")(@click="toggleSelectClass(item.name)")
        img.mr-1(:src="item.img" heigth=16 width=16)
        span {{ item.name }}


    .champion-origin-container
      .champion-origin-wrapper(v-for="origin in championListEachOrigin" :key="origin.origin")
        span.origin-title {{ origin.origin }}
        transition-group.champion-origin-inner(name="flip-list" tag="div")
          .champion-wrapper(v-for="champ in origin.championList" :key="champ.name")
            champion-thumbnail(:champ="champ" :originList="champ.origin" :classList="champ.class" )
      .champion-origin-wrapper(v-for="eachClass in championListEachClass" :key="eachClass.class")
        span.origin-title {{ eachClass.class }}
        transition-group.champion-origin-inner(name="flip-list" tag="div")
          .champion-wrapper(v-for="champ in eachClass.championList" :key="champ.name")
            champion-thumbnail(:champ="champ" :originList="champ.origin" :classList="champ.class")

    

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import ChampionThumbnail from "@/components/Organisms/ChampionThumbnail.vue";
import { Origin, Class } from "@/models/champion";
import { imgPathOrigin, imgPathClass } from "@/static/path";
import { champion } from "@/store/index";

@Component({
  name: "deck-favorite",
  components: {
    "champion-thumbnail": ChampionThumbnail
  }
})
export default class DeckFavorite extends Vue {
  get championListEachOrigin() {
    return champion.deckOrigin.filter(deck =>
      champion.favoriteOriginList.includes(deck.origin)
    );
  }

  get championListEachClass() {
    return champion.deckClass.filter(deck =>
      champion.favoriteClassList.includes(deck.class)
    );
  }

  get championOrigin() {
    return champion.originList;
  }
  get championClass() {
    return champion.classList;
  }
  get favoriteOriginList(): string[] {
    return champion.favoriteOriginList;
  }
  set favoriteOriginList(list: string[]) {
    champion.SET_FAVORITE_ORIGIN_LIST(list);
  }
  get favoriteClassList(): string[] {
    return champion.favoriteClassList;
  }
  set favoriteClassList(list: string[]) {
    champion.SET_FAVORITE_CLASS_LIST(list);
  }
  get originList(): string[] {
    return champion.originList.map(x => x.name);
  }
  get classList(): string[] {
    return champion.classList.map(x => x.name);
  }
  isOriginSelected(item: string): boolean {
    return this.favoriteOriginList.some(o => o === item);
  }
  isClassSelected(item: string): boolean {
    return this.favoriteClassList.some(c => c === item);
  }

  toggleSelectOrigin(checkedOrigin: string) {
    const existList = this.favoriteOriginList.some(o => o === checkedOrigin);
    if (existList)
      this.favoriteOriginList = this.favoriteOriginList.filter(
        x => x !== checkedOrigin
      );
    else this.favoriteOriginList.push(checkedOrigin);
  }

  toggleSelectClass(checkedClass: string) {
    const existList = this.favoriteClassList.some(c => c === checkedClass);
    if (existList)
      this.favoriteClassList = this.favoriteClassList.filter(
        x => x !== checkedClass
      );
    else this.favoriteClassList.push(checkedClass);
  }
}
</script>
<style lang="stylus" scoped>
.deck-favorite
  margin auto
  width 100vw
  .origin-chips
  .class-chips
    display flex
    flex-wrap wrap
    justify-content center
.champion-origin-container
  display flex
  flex-wrap wrap
  padding 8px
  margin 8px
.origin-title
  position absolute
  top -10px
  left 8px
  background #303030
  padding-left 4px
  padding-right  4px
.champion-origin-wrapper
  position relative
  border 1px solid #AEEA00
  border-radius 8px
  padding 8px
  margin 8px
.champion-container
  width 100px
.champion-wrapper
  padding 4px
.champion-origin-inner
  display flex
  flex-wrap wrap
.flip-list-item
  display inline-block
.flip-list-move
  transition transform 0.4s
</style>
