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
      .origin-deck(v-for="origin in championListEachOrigin" :key="origin.origin")
        champion-deck-group(:championList="origin.championList" :name="origin.class" borderColor="#AEEA00")
      .class-deck(v-for="eachClass in championListEachClass" :key="eachClass.class")
        champion-deck-group(:championList="eachClass.championList" :name="eachClass.class" borderColor="#AEEA00")


    

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import ChampionDeck from "@/components/Molecules/ChampionDeck.vue";
import { Origin, Class } from "@/models/champion";
import { imgPathOrigin, imgPathClass } from "@/static/path";
import { champion } from "@/store/index";
import ChampionDeckGroup from "@/components/Molecules/ChampionDeckGroup.vue";

@Component({
  name: "deck-favorite",
  components: {
    "champion-deck-group": ChampionDeckGroup
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
</style>
