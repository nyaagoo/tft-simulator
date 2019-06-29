<template lang="pug">
  .deck-class
    h1 Class
    .champion-class-container
      .champion-decks(v-for="eachClass in championListEachClass" :key="eachClass.class")
        champion-deck-group(:championList="eachClass.championList" :groupDescription="eachClass.class", borderColor="#00C853")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { ChampionClass, costColor } from "@/models/champion";
import { champion } from "@/store/index";
import ChampionDeckGroup from "@/components/Molecules/ChampionDeckGroup.vue";

@Component({
  name: "deck-class",
  components: {
    "champion-deck-group": ChampionDeckGroup
  }
})
export default class DeckClass extends Vue {
  costColor: Map<number, string> = costColor;

  mounted() {
    champion.SeparateChampionDeckClass();
  }
  get championListEachClass(): ChampionClass[] {
    return champion.deckClass;
  }
}
</script>
<style lang="stylus" scoped>
.deck-class
  margin auto
  width 100vw
.champion-class-container
  display flex
  flex-wrap wrap
  padding 8px
  margin 8px
</style>
