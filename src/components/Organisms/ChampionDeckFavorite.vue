<template lang="pug">
  .card-container
    .card-container-title
      h3 ブックマーク
    .deck-favorite.pl-2
      v-chip-group(multiple column)
        v-chip(v-for="(item, index) in championOrigin" :key="`favOrigin${index}`")(:outlined="!isOriginSelected(item.id)" color="#00B8D4")(@click="toggleSelectOrigin(item.id)")
          i.icon-origin.mr-1(:class="`icon-${item.id.toLowerCase()}-s`")
          span {{ item.name }}
      v-chip-group(multiple column)
        v-chip(v-for="(item, index) in championClass" :key="`favClass${index}`")(:outlined="!isClassSelected(item.id)" color="info")(@click="toggleSelectClass(item.id)")
          i.icon-class.mr-1(:class="`icon-${item.id.toLowerCase()}-s`")
          span {{ item.name }}
      .champion-origin-container
        .champion-decks.pa-2(v-for="eachOrigin in championListEachOrigin" :key="eachOrigin.origin")
          champion-deck-group(:championList="eachOrigin.championList" :groupDescription="eachOrigin.origin", borderColor="#AEEA00")
        .champion-decks.pa-2(v-for="eachClass in championListEachClass" :key="eachClass.class")
          champion-deck-group(:championList="eachClass.championList" :groupDescription="eachClass.class", borderColor="#AEEA00")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
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
      champion.favoriteOriginList.includes(deck.origin.id)
    );
  }
  get championListEachClass() {
    return champion.deckClass.filter(deck =>
      champion.favoriteClassList.includes(deck.class.id)
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
    return Object.keys(champion.originList);
  }
  get classList(): string[] {
    return Object.keys(champion.classList);
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
.card-container-title
  background #AEEA00
.card-container
  border-left 4px solid #AEEA00
.deck-favorite
  margin auto
.champion-origin-container
  display flex
  flex-wrap wrap
  padding 8px
  margin 8px
</style>
