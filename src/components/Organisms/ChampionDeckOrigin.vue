<template lang="pug">
  .deck-origin
    h1 origin
    .champion-origin-container
      .champion-origin-wrapper(v-for="origin in championListEachOrigin" :key="origin.origin")
        span.origin-title {{ origin.origin }}
        .champion-wrapper(v-for="champ in origin.championList" :key="champ.name")
          champion-thumbnail(:champ="champ" :originList="splitComma(champ.origin)" :classList="splitComma(champ.class)" )
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { ChampionOrigin, costColor } from "@/models/champion";
import { champion } from "@/store/index";
import ChampionThumbnail from "@/components/Organisms/ChampionThumbnail.vue";

@Component({
  name: "deck-origin",
  components: {
    "champion-thumbnail": ChampionThumbnail
  }
})
export default class DeckOrigin extends Vue {
  championListEachOrigin: ChampionOrigin[] = [];
  costColor: Map<number, string> = costColor;

  mounted() {
    champion.SeparateChampionDeckOrigin();
    this.championListEachOrigin = champion.championDeckOrigin;
  }

  splitComma(str: string): string[] {
    return str.split(",");
  }
}
</script>
<style lang="stylus" scoped>
.deck-origin
  margin auto
  width 100vw
.champion-origin-container
  display flex
  flex-wrap wrap
  padding 8px
  margin 8px
.origin-title
  position absolute
  top -10px
  background #303030
  padding-left 4px
  padding-right  4px
.champion-origin-wrapper
  position relative
  display flex
  flex-wrap wrap
  border 1px solid #88ff88
  border-radius 8px
  padding 8px
  margin 8px
.champion-container
  width 100px
.champion-wrapper
  padding 4px
</style>
