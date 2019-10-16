<template lang="pug">
  .deck-class.card-container
    .card-container-title
      h3 クラス
    .champion-class-container
      .champion-decks.pa-2(v-for="classItem in championListEachClass" :key="classItem.class.id")
        champion-deck-group(:championList="classItem.championList" :synergy="classItem.class", borderColor="#00C853", synergyType="class")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { ChampionClass, costColor } from "@/models/champion";
import { championDeck } from "@/store/index";

@Component({
  name: "deck-class",
  components: {
    "champion-deck-group": () =>
      import("@/components/Molecules/ChampionDeckGroup.vue")
  }
})
export default class DeckClass extends Vue {
  costColor: Map<number, string> = costColor;

  mounted() {
    championDeck.separateChampionDeckClass();
  }
  get championListEachClass(): ChampionClass[] {
    return championDeck.deckClass;
  }
}
</script>
<style lang="stylus" scoped>
.card-container-title
  background #00C853
.card-container
  border-left 4px solid #00C853
.champion-class-container
  display flex
  flex-wrap wrap
  padding 8px
  margin 8px
</style>
