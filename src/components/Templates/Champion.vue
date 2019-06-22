<template lang="pug">
  .champion-template
    champion-deck-origin
    champion-deck-class

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  ChampionOrigin,
  ChampionClass,
  costColor,
  originSynergy,
  classSynergy
} from "@/models/champion";
import router from "@/router";
import { champion } from "@/store/index";
import DeckOrigin from "@/components/Organisms/ChampionDeckOrigin.vue";
import DeckClass from "@/components/Organisms/ChampionDeckClass.vue";

@Component({
  name: "champion-template",
  components: {
    "champion-deck-origin": DeckOrigin,
    "champion-deck-class": DeckClass
  }
})
export default class ChampionTemplate extends Vue {
  championListEachClass: ChampionClass[] = [];
  costColor: Map<number, string> = costColor;

  mounted() {
    champion.SeparateChampionDeckClass();
    this.championListEachClass = champion.championDeckClass;
  }
}
</script>
<style lang="stylus" scoped>
.champion-template
  margin auto
  height calc(100vh - 200px)
  width 100vw
  display flex
  flex-wrap wrap
</style>
